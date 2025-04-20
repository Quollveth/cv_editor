import React from 'react';
import { JSX } from 'react';
import * as Logo from './components/logos/social';

export type Social =
    | 'bluesky'
    | 'email'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'whatsapp';
export interface ContactInfo {
    name: string;
    url: string;
    prefix: string;
    which: Social;
    logo: (props: any) => JSX.Element;
}
export interface Course {
    id: string;
    name: string;
    start: Date;
    end: Date;
    yearOnly?: boolean;
}
export interface EducationInfo {
    id: string;
    name: string;
    what: Course[];
}
export type SkillLevel =
    | 'Beginner'
    | 'Intermediate'
    | 'Advanced'
    | 'Expert'
    | 'Proficient';
export interface Skill {
    id: string;
    name: string;
    logo?: string;
    level: SkillLevel;
}

export type LangSkill = SkillLevel | 'Fluent' | 'Native';
export const LangLevel: Record<SkillLevel, LangSkill> = {
    Beginner: 'Beginner',
    Intermediate: 'Intermediate',
    Advanced: 'Advanced',
    Proficient: 'Fluent',
    Expert: 'Native',
};
export interface Language {
    id: string;
    name: string;
    level: SkillLevel;
}
export type CvInfo = {
    id: string;
    name: string;
    about: string;
    birth: Date;
    languages: Language[];
    keywords: string[];
    contact: ContactInfo[];
    eduMain: EducationInfo[];
    eduExtra: EducationInfo[];
    skills: Skill[];
};

export const EmptyContact = (): ContactInfo => {
    return {
        name: '',
        url: '',
        prefix: '',
        which: 'email',
        logo: Logo.Email,
    };
};
export const EmptyCourse = (): Course => {
    return {
        id: crypto.randomUUID(),
        name: '',
        start: new Date(),
        end: new Date(),
    };
};
export const EmptyEducation = (): EducationInfo => {
    return {
        id: crypto.randomUUID(),
        name: '',
        what: [],
    };
};
export const EmptySkill = (): Skill => {
    return {
        id: crypto.randomUUID(),
        name: '',
        level: 'Beginner',
    };
};
export const EmptyLanguage = (): Language => {
    return {
        id: crypto.randomUUID(),
        name: '',
        level: 'Beginner',
    };
};
export const EmptyCv = (): CvInfo => {
    return {
        id: crypto.randomUUID(),
        name: '',
        about: '',
        languages: [],
        keywords: [],
        birth: new Date(),
        contact: [],
        eduMain: [],
        eduExtra: [],
        skills: [],
    };
};

export type CvContextType = [
    CvInfo,
    React.Dispatch<React.SetStateAction<CvInfo>>,
];

// in an alternate reality where i care this is a reducer
export const CVContext = React.createContext<CvContextType>([
    EmptyCv(),
    () => {
        alert('some dumbass consumed the context without a provider');
    },
]);
