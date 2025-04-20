import React from 'react';

export type Locale = 'Portuguese' | 'English';
export type Settings = {
    language: Locale;
};

export const DefaultSettings = (): Settings => {
    return {
        language: 'Portuguese',
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
