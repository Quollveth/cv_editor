import React, { useContext } from 'react';

import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import { CVContext, EmptyCv } from './data';
import { ReactSortable } from 'react-sortablejs';

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
    return <h1 className="border-2 border-slate-600">{cvData.name}</h1>;
};

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv());

    const words = ['Hello', 'Hi', 'How are you', 'Cool'];
    const [wordList, setWordList] = useState<{ word: string; id: string }[]>(
        words.map((w) => ({
            word: w,
            id: crypto.randomUUID(),
        }))
    );

    return (
        <CVContext.Provider value={[CvData, setCvData]}>
            <ReactSortable list={wordList} setList={setWordList}>
                {wordList.map((w) => (
                    <h1 key={w.id}>{w.word}</h1>
                ))}
            </ReactSortable>
        </CVContext.Provider>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
