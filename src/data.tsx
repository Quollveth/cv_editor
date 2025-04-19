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
    name: string;
    start: Date;
    end: Date;
    yearOnly?: boolean;
}
export interface EducationInfo {
    name: string;
    what: Course[];
}
export type SkillLevel =
    | 'Beginner'
    | 'Intermediate'
    | 'Advanced'
    | 'Proficient';
export interface Skill {
    name: string;
    logo?: string;
    level: SkillLevel;
}
export type CvInfo = {
    name: string;
    birth: Date;
    about: string;
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
        name: '',
        start: new Date(),
        end: new Date(),
    };
};
export const EmptyEducation = (): EducationInfo => {
    return {
        name: '',
        what: [],
    };
};
export const EmptySkill = (): Skill => {
    return {
        name: '',
        level: 'Beginner',
    };
};
export const EmptyCv = (): CvInfo => {
    return {
        name: '',
        birth: new Date(),
        about: '',
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
