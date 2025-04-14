import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import { CVContext, EmptyCv } from './data';
import ContactEdit from './components/contact';

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv());

    return (
        <CVContext.Provider value={[CvData, setCvData]}>
            <div className="p-10 w-max">
                <ContactEdit />
                <ContactEdit />
                <ContactEdit />
            </div>
        </CVContext.Provider>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
