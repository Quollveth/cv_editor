import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';

import { CVContext, EmptyCv } from './data';
import Panel from './components/controlPanel';
import Editor from './components/cvEditor';
import { DefaultSettings, SettingsContext } from './settings';
import { DocumentIcon } from './components/svg';
import PdfViewer from './components/pdf/viewer';

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

    // regular state
    const [showPdf, setShowPdf] = useState(true);

    return (
        <StrictMode>
            <SettingsContext.Provider value={[settings, setSettings]}>
                <CVContext.Provider value={[CvData, setCvData]}>
                    <div
                        className={`z-1 border-1 border-gray-500 m-2 shadow-lg rounded bg-white sticky ${showPdf ? 'max-w-2/3' : ''}`}
                    >
                        <Panel key={settings.id} />
                    </div>
                    <div className="w-full flex">
                        <div className={`flex-1 ${showPdf ? 'max-w-2/3' : ''}`}>
                            <Editor key={CvData.id} />
                        </div>
                        {showPdf && (
                            <div className="z-2 p-4 max-w-1/3 h-full aspect-[1/1.4142] fixed bottom-0 end-0 ">
                                <div className="border-2 border-gray-500 rounded-lg shadow-lg h-full w-full">
                                    <PdfViewer />
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setShowPdf(!showPdf)}
                        className="z-3 fixed bottom-3 right-14 bg-blue-800 rounded-full p-4 text-white shadow-lg cursor-pointer hover:bg-blue-900"
                    >
                        <DocumentIcon />
                    </button>
                </CVContext.Provider>
            </SettingsContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
