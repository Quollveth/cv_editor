import React from 'react';
import { JSX } from 'react';

export interface ContactInfo {
    name: string;
    url: string;
    prefix: string;
    logo: (props: any) => JSX.Element;
}

interface Course {
    name: string;
    start: Date;
    end: Date;
    yearOnly?: boolean;
}
export interface EducationInfo {
    name: string;
    what: Course[];
}

export type CvInfo = {
    name: string;
    about: string;
    contact: ContactInfo[];
    eduMain: EducationInfo[];
    eduExtra: EducationInfo[];
};

export const EmptyCv = (): CvInfo => {
    return {
        name: '',
        about: '',
        contact: [],
        eduMain: [],
        eduExtra: [],
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
