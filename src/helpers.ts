import Swal from 'sweetalert2';

//prettier-ignore
import {ContactInfo, Course, CvInfo, EducationInfo, EmptyContact, EmptyCourse, EmptyCv, EmptyEducation, EmptySkill, Skill, SkillLevel, Social,} from './data';
import { getSocialLogo, getSocialPrefix } from './components/logos/social';
import { ValidateCv } from './zod';

const GetAge = (birthday: Date): number => {
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();

    const happened =
        today.getMonth() > birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
            today.getDate() >= birthday.getDate());

    if (!happened) {
        age--;
    }

    return age;
};

const ToCourseDate = (date: Date, yearOnly: boolean): string => {
    return `${yearOnly ? '' : date.getMonth()}/${date.getFullYear()}`;
};

type ContactSave = {
    name: string;
    url: string;
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

export type CvInfoSave = {
    name: string;
    birth: Date;
    about: string;
    contact: ContactSave[];
    eduMain: EducationSave[];
    eduExtra: EducationSave[];
    skills: SkillSave[];
};

function EncodeCv(info: CvInfo): CvInfoSave {
    return {
        name: info.name,
        about: info.about,
        birth: info.birth,
        skills: [...info.skills],
        contact: info.contact.map((c) => {
            return {
                name: c.name,
                url: c.url,
                which: c.which,
            } as ContactSave;
        }),
        eduMain: info.eduMain.map((e) => {
            return {
                name: e.name,
                what: e.what.map((c) => {
                    return {
                        name: c.name,
                        start: ToCourseDate(c.start, c.yearOnly ?? false),
                        end: ToCourseDate(c.end, c.yearOnly ?? false),
                    } as CourseSave;
                }),
            } as EducationSave;
        }),
        eduExtra: info.eduExtra.map((e) => {
            return {
                name: e.name,
                what: e.what.map((c) => {
                    return {
                        name: c.name,
                        start: ToCourseDate(c.start, c.yearOnly ?? false),
                        end: ToCourseDate(c.end, c.yearOnly ?? false),
                    } as CourseSave;
                }),
            } as EducationSave;
        }),
    };
}

function DecodeCv(info: CvInfoSave): CvInfo {
    const parseCourseDate = (str: string): Date => {
        const [monthStr, yearStr] = str.includes('/')
            ? str.split('/')
            : ['0', str];
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);
        return new Date(year, month || 0);
    };

    return {
        name: info.name ?? EmptyCv().name,
        birth: info.birth ?? EmptyCv().birth,
        about: info.about ?? EmptyCv().about,
        contact:
            info.contact?.map(
                (c): ContactInfo => ({
                    ...EmptyContact(),
                    name: c.name ?? EmptyContact().name,
                    url: c.url ?? EmptyContact().url,
                    which: c.which ?? 'email',
                    prefix: getSocialPrefix(c.which),
                    logo: getSocialLogo(c.which),
                })
            ) ?? [],
        eduMain:
            info.eduMain?.map(
                (e): EducationInfo => ({
                    ...EmptyEducation(),
                    name: e.name ?? EmptyEducation().name,
                    what:
                        e.what?.map(
                            (c): Course => ({
                                ...EmptyCourse(),
                                name: c.name ?? EmptyCourse().name,
                                start: parseCourseDate(c.start),
                                end: parseCourseDate(c.end),
                            })
                        ) ?? [],
                })
            ) ?? [],
        eduExtra:
            info.eduExtra?.map(
                (e): EducationInfo => ({
                    ...EmptyEducation(),
                    name: e.name ?? EmptyEducation().name,
                    what:
                        e.what?.map(
                            (c): Course => ({
                                ...EmptyCourse(),
                                name: c.name ?? EmptyCourse().name,
                                start: parseCourseDate(c.start),
                                end: parseCourseDate(c.end),
                            })
                        ) ?? [],
                })
            ) ?? [],
        skills:
            info.skills?.map(
                (s): Skill => ({
                    ...EmptySkill(),
                    name: s.name ?? EmptySkill().name,
                    level: s.level ?? EmptySkill().level,
                    logo: s.logo,
                })
            ) ?? [],
    };
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
    const showError = () => {
        Swal.fire({
            title: 'Invalid JSON',
            text: 'Your file sucks ass, use a good one next time dumbass.',
            icon: 'error',
            theme: 'dark',
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
                        showError();
                        reject();
                        return;
                    }

                    resolve(DecodeCv(jason)); // <---------------------------- return is here
                } catch (e) {
                    showError();
                }
            };

            reader.readAsText(file);
        });

        fileIn.click();
    });
};
