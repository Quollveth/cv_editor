import { StrictMode, useCallback, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/main.css';
import {
    ContactInfo,
    CVContext,
    EducationInfo,
    EmptyContact,
    EmptyCv,
    EmptyEducation,
    EmptySkill,
    Skill,
} from './data';
import ContactEdit from './components/contact';
import DynamicList, { ListRenderProps } from './components/list';
import EducationEdit from './components/education';
import SkillEditor from './components/skill';

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

    const MainEducationChanger = useCallback(
        (data: EducationInfo[]) => {
            setCvData((prev) => {
                return { ...prev, eduMain: data };
            });
        },
        [setCvData]
    );

    const ExtraEducationChanger = useCallback(
        (data: EducationInfo[]) => {
            setCvData((prev) => {
                return { ...prev, eduMain: data };
            });
        },
        [setCvData]
    );

    const SkillChanger = useCallback(
        (data: Skill[]) => {
            setCvData((prev) => {
                return { ...prev, skills: data };
            });
        },
        [setCvData]
    );

    return (
        <DynamicList<Skill>
            title={() => <p>Skills</p>}
            emptyFactory={EmptySkill}
            onChange={SkillChanger}
            render={(config: ListRenderProps<Skill>) => (
                <SkillEditor
                    initial={config.initial}
                    onChange={config.onChange}
                />
            )}
        />
    );

    return (
        <>
            <div className="m-4">
                <DynamicList<ContactInfo>
                    title={() => <p>Contact Info</p>}
                    emptyFactory={EmptyContact}
                    onChange={ContactChanger}
                    render={(config: ListRenderProps<ContactInfo>) => (
                        <ContactEdit
                            initial={config.initial}
                            onChange={config.onChange}
                        />
                    )}
                />
                <DynamicList<EducationInfo>
                    title={() => <p>Main Education Info</p>}
                    emptyFactory={EmptyEducation}
                    onChange={MainEducationChanger}
                    render={(config: ListRenderProps<EducationInfo>) => (
                        <EducationEdit
                            initial={config.initial}
                            onChange={config.onChange}
                        />
                    )}
                />
                <DynamicList<EducationInfo>
                    title={() => <p>Extra Education Info</p>}
                    emptyFactory={EmptyEducation}
                    onChange={ExtraEducationChanger}
                    render={(config: ListRenderProps<EducationInfo>) => (
                        <EducationEdit
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
