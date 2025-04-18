import { StrictMode, useCallback, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import { ContactInfo, CVContext, EmptyContact, EmptyCv } from './data';
import ContactEdit, { ContactEditProps } from './components/contact';
import DynamicList from './components/list';

const Editor = () => {
    const [_, setCvData] = useContext(CVContext);

    const ContactChanger = useCallback(
        (data: ContactInfo[]) => {
            setCvData((prev) => {
                return { ...prev, contact: data };
            });
        },
        [setCvData]
    );

    return (
        <>
            <div className="w-max p-4">
                <DynamicList<ContactInfo>
                    title="Contact Info"
                    emptyFactory={EmptyContact}
                    onChange={ContactChanger}
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
            <button
                className="m-4 p-2 cursor-pointer border-2 border-amber-700"
                onClick={() => {
                    console.log(CvData);
                }}
            >
                Click
            </button>
            <CVContext.Provider value={[CvData, setCvData]}>
                <Editor />
            </CVContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
