import Swal from 'sweetalert2';

//prettier-ignore
import {ContactInfo, Course, CvInfo, EducationInfo, EmptyCv, Language, Skill, SkillLevel, Social,} from '../data';
import {
    getSocialLogo,
    getSocialPrefix,
    getSocialUrl,
} from '../components/logos/social';
import { ValidateCv } from '../zod';

export const ToCourseDate = (date: Date, yearOnly: boolean): string => {
    if (yearOnly) {
        return `${date.getFullYear()}`;
    } else {
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    }
};
const FromCourseDate = (dateStr: string): Date => {
    const parts = dateStr.split('/');
    if (parts.length === 2) {
        const month = parseInt(parts[0], 10) - 1;
        const year = parseInt(parts[1], 10);
        return new Date(year, month);
    }
    const year = parseInt(parts[0], 10);
    return new Date(year, 0);
};

type ContactSave = {
    name: string;
    which: Social;
};
type CourseSave = {
    name: string;
    start: string;
    end: string;
};
type EducationSave = {
    name: string;
    what: CourseSave[];
};
type SkillSave = {
    name: string;
    logo?: string;
    level: SkillLevel;
};
type LangSave = {
    name: string;
    level: SkillLevel;
};

export type CvInfoSave = {
    name: string;
    birth: Date;
    about: string;
    keywords: string[];
    languages: LangSave[];
    contact: ContactSave[];
    eduMain: EducationSave[];
    eduExtra: EducationSave[];
    skills: SkillSave[];
};

function EncodeCv(info: CvInfo): CvInfoSave {
    const courseMapper = (c: Course) => {
        return {
            name: c.name,
            start: ToCourseDate(c.start, c.yearOnly ?? false),
            end: ToCourseDate(c.end, c.yearOnly ?? false),
        } as CourseSave;
    };

    return {
        name: info.name,
        about: info.about,
        birth: info.birth,
        keywords: [...info.keywords],
        languages: info.languages.map((l) => {
            return {
                name: l.name,
                level: l.level,
            } as LangSave;
        }),
        skills: info.skills.map((s) => {
            return {
                name: s.name,
                level: s.level,
                logo: s.logo ? btoa(s.logo) : '',
            } as SkillSave;
        }),
        contact: info.contact.map((c) => {
            return {
                name: c.name,
                which: c.which,
            } as ContactSave;
        }),
        eduMain: info.eduMain.map((e) => {
            return {
                name: e.name,
                what: e.what.map(courseMapper),
            } as EducationSave;
        }),
        eduExtra: info.eduExtra.map((e) => {
            return {
                name: e.name,
                what: e.what.map(courseMapper),
            } as EducationSave;
        }),
    };
}

function DecodeCv(info: CvInfoSave): CvInfo {
    const cv = EmptyCv();

    const courseMapper = (c: CourseSave): Course => {
        return {
            id: crypto.randomUUID(),
            name: c.name,
            start: FromCourseDate(c.start),
            end: FromCourseDate(c.end),
            yearOnly: c.start.split('/').length === 1,
        };
    };

    cv.id = crypto.randomUUID();

    cv.name = info.name;
    cv.about = info.about;
    cv.birth = new Date(info.birth);
    cv.keywords = [...info.keywords];

    if (info.languages.length !== 0) {
        cv.languages = info.languages.map((l) => {
            return {
                ...l,
                id: crypto.randomUUID(),
            } as Language;
        });
    }
    if (info.skills.length !== 0) {
        cv.skills = info.skills.map((s) => {
            return {
                name: s.name,
                level: s.level,
                logo: s.logo ? atob(s.logo) : '',
                id: crypto.randomUUID(),
            } as Skill;
        });
    }
    if (info.contact.length !== 0) {
        cv.contact = info.contact.map((c) => {
            return {
                name: c.name,
                which: c.which,
                url: getSocialUrl(c.which),
                prefix: getSocialPrefix(c.which),
                logo: getSocialLogo(c.which),
            } as ContactInfo;
        });
    }
    if (info.eduMain.length !== 0) {
        cv.eduMain = info.eduMain.map((e) => {
            return {
                id: crypto.randomUUID(),
                name: e.name,
                what: e.what.map(courseMapper),
            } as EducationInfo;
        });
    }
    if (info.eduExtra.length !== 0) {
        cv.eduExtra = info.eduExtra.map((e) => {
            return {
                id: crypto.randomUUID(),
                name: e.name,
                what: e.what.map(courseMapper),
            } as EducationInfo;
        });
    }

    return cv;
}

export const SaveCv = async (data: CvInfo) => {
    const { value: fileName } = await Swal.fire({
        title: 'Downloading...',
        inputLabel: 'Filename',
        input: 'text',
        showCancelButton: true,
    });

    if (!fileName) {
        return;
    }

    const jason = JSON.stringify(EncodeCv(data), null, 2);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jason);
    const dlAnchor = document.createElement('a') as HTMLAnchorElement;

    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', fileName + '.json');

    dlAnchor.click();
};

export const LoadCv = async (): Promise<CvInfo> => {
    const showError = (e: any) => {
        console.error(e);
        Swal.fire({
            title: 'Invalid JSON',
            text: 'Your file sucks ass, use a good one next time dumbass.',
            icon: 'error',
        });
    };

    return new Promise((resolve, reject) => {
        const fileIn = document.createElement('input') as HTMLInputElement;
        fileIn.setAttribute('type', 'file');

        fileIn.addEventListener('change', (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (!input.files || input.files.length === 0) return;

            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = async () => {
                try {
                    const jason = JSON.parse(reader.result as string);

                    if (!ValidateCv(jason)) {
                        showError('zod validator failed');
                        reject();
                        return;
                    }
                    const decoded = DecodeCv(jason);
                    resolve(decoded); // <---------------------------- return is here
                } catch (e: any) {
                    showError(e);
                    reject();
                    return;
                }
            };

            reader.readAsText(file);
        });

        fileIn.click();
    });
};
