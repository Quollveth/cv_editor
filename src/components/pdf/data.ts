import { JSX } from 'react';
import { Course, CvInfo, SkillLevel } from '../../data';
import { Locale } from '../../settings';
import { ToCourseDate } from '../../helpers/saveLoad';
import { getSocialLogo, getSocialUrl } from '../logos/social';
import { EditorLocale } from '../../locale';
import { EditorLocaleKeys } from '../../locale/EditorLocale';

export interface ContactPdf {
    url: string;
    logo: (props: any) => JSX.Element; // always an svg
}
export interface CoursePdf {
    name: string;
    start: string;
    end: string;
}
export interface EducationPdf {
    name: string;
    what: CoursePdf[];
}
export interface SkillPdf {
    name: string;
    logo?: string;
    level: string;
}

export interface LanguagePdf {
    name: string;
    level: string;
}
export type CvInfoPdf = {
    name: string;
    about: string;
    age: number;
    keywords: string[];
    languages: LanguagePdf[];
    contact: ContactPdf[];
    eduMain: EducationPdf[];
    eduExtra: EducationPdf[];
    skills: SkillPdf[];
};

const getAge = (birth: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
};

const courseMapper = (c: Course) => {
    return {
        name: c.name,
        start: ToCourseDate(c.start, c.yearOnly ?? false),
        end: ToCourseDate(c.end, c.yearOnly ?? false),
    };
};

const skillLevelToLocale: Record<SkillLevel, EditorLocaleKeys> = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED',
    Proficient: 'PROFICIENT',
    Expert: 'EXPERT',
};
const langLevelToLocale: Record<SkillLevel, EditorLocaleKeys> = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED',
    Proficient: 'FLUENT',
    Expert: 'NATIVE',
};

const getLevelLocale = (
    level: SkillLevel,
    lang: Locale,
    skill: boolean
): string => {
    const loc = skill ? skillLevelToLocale[level] : langLevelToLocale[level];
    return EditorLocale[lang][loc];
};

export const CvToPdf = (cv: CvInfo, lang: Locale): CvInfoPdf => {
    return {
        name: cv.name || '',
        about: cv.about || '',
        keywords: [...(cv.keywords || [])],
        age: cv.birth ? getAge(cv.birth) : 0,
        eduMain: (cv.eduMain || []).map((e) => {
            return {
                name: e?.name || '',
                what: (e?.what || []).map(courseMapper),
            };
        }),
        eduExtra: (cv.eduExtra || []).map((e) => {
            return {
                name: e?.name || '',
                what: (e?.what || []).map(courseMapper),
            };
        }),
        contact: (cv.contact || []).map((c) => {
            return {
                url: c?.which && c?.name ? getSocialUrl(c.which) + c.name : '',
                logo: getSocialLogo(c.which),
            };
        }),
        skills: (cv.skills || []).map((s) => {
            return {
                name: s?.name || '',
                level: s?.level ? getLevelLocale(s.level, lang, true) : '',
            };
        }),
        languages: (cv.languages || []).map((l) => {
            return {
                name: l?.name || '',
                level: l?.level ? getLevelLocale(l.level, lang, false) : '',
            };
        }),
    };
};
