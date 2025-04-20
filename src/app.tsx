import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';

import { CVContext, EmptyCv } from './data';
import Panel from './components/controlPanel';
import Editor from './components/cvEditor';
import { DefaultSettings, SettingsContext } from './settings';

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv());

    const [settings, setSettings] = useState(() => {
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
    });

    return (
        <StrictMode>
            <SettingsContext.Provider value={[settings, setSettings]}>
                <CVContext.Provider value={[CvData, setCvData]}>
                    <div className="border-1 border-gray-500 m-2 shadow-md rounded">
                        <Panel key={settings.id} />
                    </div>
                    <div className="border-1 border-gray-500 m-2 shadow-md rounded">
                        <Editor key={CvData.id} />
                    </div>
                </CVContext.Provider>
            </SettingsContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
