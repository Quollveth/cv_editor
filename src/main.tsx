import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import { CVContext, EmptyCv } from './data';

const CV = () => {
    return <h1>hello</h1>;
};

const [CvData, setCvData] = useState(EmptyCv());

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CVContext.Provider value={[CvData, setCvData]}>
            <CV />
        </CVContext.Provider>
    </StrictMode>
);
