import React from 'react';
import { AiInfo, DefaultAi } from './ai/data';

export type Locale = 'Portuguese' | 'English';
export type Settings = {
    language: Locale;
    agent: AiInfo;
};

export const DefaultSettings = (): Settings => {
    return {
        language: 'Portuguese',
        agent: DefaultAi(),
    };
};

export type SettingsContextType = [
    Settings,
    React.Dispatch<React.SetStateAction<Settings>>,
];

export const SettingsContext = React.createContext<SettingsContextType>([
    DefaultSettings(),
    () => {
        alert('some dumbass consumed the context without a provider');
    },
]);
