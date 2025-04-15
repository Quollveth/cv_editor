import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import { CVContext, EmptyCv } from './data';
import ContactList from './components/contactList';

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv);

    return (
        <>
            <button
                className="m-4 p-2 cursor-pointer border-2 border-amber-700"
                onClick={() => {
                    console.log(CvData);
                }}
            >
                Click
            </button>
            <CVContext.Provider value={[CvData, setCvData]}>
                <div className="w-max">
                    <ContactList />
                </div>
            </CVContext.Provider>
        </>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
