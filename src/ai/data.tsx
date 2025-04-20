import React from 'react';
import { LangSkill, SkillLevel } from '../data';

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

//
//
//

type LangsAi = {
    id: string;
    name: string;
    level: LangSkill;
};
type SkillsAi = {
    id: string;
    name: string;
    level: SkillLevel;
};
type EduAi = {
    id: string;
    institution: string;
    courses: string[];
};
export type CvAiData = {
    about: string;
    keywords: string[];
    languages: LangsAi[];
    skills: SkillsAi[];
    educationMain: EduAi[];
    educationExtra: EduAi[];
};
