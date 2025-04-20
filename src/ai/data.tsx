import React from 'react';
import { SkillLevel } from '../data';

export type AiInfo = {
    id: string;
    endpoint: string;
    model: string;
    token: string;
};
export const EmptyAi = (): AiInfo => {
    return {
        id: crypto.randomUUID(),
        endpoint: '',
        model: '',
        token: '',
    };
};
export const DefaultAi = (): AiInfo => {
    return {
        id: crypto.randomUUID(),
        endpoint: 'https://openrouter.ai/api/v1/chat/completions',
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        token: 'YOUR API KEY HERE',
    };
};

export type AiContextType = [
    AiInfo,
    React.Dispatch<React.SetStateAction<AiInfo>>,
];

// in an alternate reality where i care this is a reducer
export const AIContext = React.createContext<AiContextType>([
    EmptyAi(),
    () => {
        alert('some dumbass consumed the context without a provider');
    },
]);

export type CvAiData = {
    skills: {
        name: string;
        level: SkillLevel;
    }[];
    eduMain: {
        intitution: string;
        courses: [];
    }[];
    eduExtra: {
        institution: string;
        courses: [];
    }[];
    about: string;
    keywords: string[];
};
