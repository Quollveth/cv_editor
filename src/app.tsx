import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';

import { CVContext, EmptyCv } from './data';
import { AIContext, EmptyAi } from './ai/data';
import Panel from './controlPanel';
import Editor from './cvEditor';

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv());

    const [AiSettings, setAiSettings] = useState(() => {
        const saved = localStorage.getItem('AiSettings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                parsed.id = crypto.randomUUID();
                return parsed;
            } catch (e) {
                console.error(
                    'Failed to parse AiSettings from localStorage:',
                    e
                );
            }
        }
        return EmptyAi();
    });

    return (
        <StrictMode>
            <CVContext.Provider value={[CvData, setCvData]}>
                <AIContext.Provider value={[AiSettings, setAiSettings]}>
                    <div className="border-1 border-gray-500 m-2 shadow-md rounded">
                        <Panel key={AiSettings.id} />
                    </div>
                    <div className="border-1 border-gray-500 m-2 shadow-md rounded">
                        <Editor key={CvData.id} />
                    </div>
                </AIContext.Provider>
            </CVContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
