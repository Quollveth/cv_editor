import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '../assets/main.css';

import { CVContext, EmptyCv } from './data';
import Panel from './components/controlPanel';
import Editor from './components/cvEditor';
import { DefaultSettings, SettingsContext } from './settings';

const LoadSettings = () => {
    const saved = localStorage.getItem('settings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            parsed.id = crypto.randomUUID();
            return parsed;
        } catch (e) {
            console.error('Failed to parse settings from localStorage:', e);
        }
    }
    return DefaultSettings();
};

const App = () => {
    // contexts
    const [CvData, setCvData] = useState(EmptyCv());
    const [settings, setSettings] = useState(LoadSettings());

    return (
        <StrictMode>
            <SettingsContext.Provider value={[settings, setSettings]}>
                <CVContext.Provider value={[CvData, setCvData]}>
                    <div
                        className={
                            'z-1 border-1 border-gray-500 m-2 shadow-lg rounded bg-white sticky'
                        }
                    >
                        <Panel key={settings.id} />
                    </div>
                    <div className="w-full flex">
                        <div className={'flex-1'}>
                            <Editor key={CvData.id} />
                        </div>
                    </div>
                </CVContext.Provider>
            </SettingsContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
