import React, { useContext } from 'react';

import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import { CVContext, EmptyCv } from './data';

const Comp1 = () => {
    const [cvData, setCvData] = useContext(CVContext);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCvData({ ...cvData, name: e.target.value });
    };

    return (
        <input
            className="border-2 border-slate-600"
            value={cvData.name}
            onChange={handleChange}
            type="text"
        />
    );
};

const Comp2 = () => {
    const [cvData] = useContext(CVContext);
    return <h1>{cvData.name}</h1>;
};

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv());

    return (
        <CVContext.Provider value={[CvData, setCvData]}>
            <Comp1 />
            <Comp2 />
        </CVContext.Provider>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
