import { StrictMode, useContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import { ContactInfo, CVContext, EmptyContact, EmptyCv } from './data';
import DynamicList from './components/list';
import ContactEdit, { ContactEditProps } from './components/contact';

const Editor = () => {
    const [CvData, setCvData] = useContext(CVContext);

    useEffect(() => {
        console.log('CvData Changed');
        console.log(CvData);
    }, [CvData]);

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
            <div className="w-max p-4">
                <DynamicList
                    title="Contact Info"
                    emptyFactory={EmptyContact}
                    onChange={(data: ContactInfo, idx) => {
                        const newData = { ...CvData };
                        newData.contact[idx] = data;
                        setCvData(newData);
                    }}
                    render={(config: ContactEditProps) => (
                        <ContactEdit
                            initial={config.initial}
                            onChange={config.onChange}
                        />
                    )}
                />
            </div>
        </>
    );
};

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv());

    return (
        <StrictMode>
            <CVContext.Provider value={[CvData, setCvData]}>
                <Editor />
            </CVContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
