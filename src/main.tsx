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
import { LoadCv, SaveCv } from './helpers/saveLoad';

const Editor = () => {
    const [cvData, setCvData] = useContext(CVContext);

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
                            value={cvData.name}
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
                            //prettier-ignore
                            value={
						        cvData.birth ? new Date(cvData.birth).toISOString().split("T")[0] : ""
						    }
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
                        value={cvData.about}
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
                    starting={cvData.contact}
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
                    starting={cvData.skills}
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
                    starting={cvData.eduMain}
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
                    starting={cvData.eduExtra}
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

const Panel = () => {
    const [CvData, setCvData] = useContext(CVContext);

    return (
        <div>
            <button
                className="m-4 p-2 cursor-pointer border-2 border-amber-700"
                onClick={() => {
                    SaveCv(CvData);
                }}
            >
                Save
            </button>
            <button
                className="m-4 p-2 cursor-pointer border-2 border-amber-700"
                onClick={async () => {
                    const cv = await LoadCv();
                    setCvData(cv);
                }}
            >
                Load
            </button>
            <button
                className="m-4 p-2 cursor-pointer border-2 border-amber-700"
                onClick={() => {
                    console.log(CvData);
                }}
            >
                Print
            </button>
        </div>
    );
};

const App = () => {
    const [CvData, setCvData] = useState(EmptyCv());

    return (
        <StrictMode>
            <CVContext.Provider value={[CvData, setCvData]}>
                <Panel />
                <Editor key={CvData.id} />
            </CVContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
