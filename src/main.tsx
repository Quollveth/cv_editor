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
        <>
            <div className="m-4 flex flex-col gap-2">
                <div className="flex gap-2">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="input input-sm border border-gray-600 rounded px-2 py-1"
                            onChange={(e) => {
                                const data = (e.target as HTMLInputElement)
                                    .value;
                                setCvData((prev) => {
                                    return { ...prev, name: data };
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="birth">Birthday</label>
                        <input
                            id="birth"
                            type="date"
                            className="input input-sm border border-gray-600 rounded px-2 py-1"
                            onChange={(e) => {
                                const data = (e.target as HTMLInputElement)
                                    .value;
                                setCvData((prev) => {
                                    //prettier-ignore
                                    return { ...prev, birth: new Date(data as string)};
                                });
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <label htmlFor="about">About</label>
                    <textarea
                        id="about"
                        className="input input-sm border border-gray-600 rounded px-2 py-1 h-32 resize-none"
                        onChange={(e) => {
                            const data = (e.target as HTMLTextAreaElement)
                                .value;
                            setCvData((prev) => {
                                return { ...prev, about: data };
                            });
                        }}
                    />
                </div>
            </div>

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
