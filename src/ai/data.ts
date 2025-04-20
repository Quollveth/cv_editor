import { LangSkill, SkillLevel } from '../data';

export type AiInfo = {
    endpoint: string;
    model: string;
    token: string;
};
export const EmptyAi = (): AiInfo => {
    return {
        endpoint: '',
        model: '',
        token: '',
    };
};
export const DefaultAi = (): AiInfo => {
    return {
        endpoint: 'https://openrouter.ai/api/v1/chat/completions',
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        token: 'YOUR API KEY HERE',
    };
};

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
