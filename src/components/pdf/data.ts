import { JSX } from 'react';
export interface ContactPdf {
    name: string;
    url: string;
    logo: (props: any) => JSX.Element;
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
export type CvInfo = {
    name: string;
    about: string;
    age: number;
    languages: LanguagePdf[];
    keywords: string[];
    contact: ContactPdf[];
    eduMain: EducationPdf[];
    eduExtra: EducationPdf[];
    skills: SkillPdf[];
};
