import { useCallback, useContext } from 'react';

import {
    ContactInfo,
    CVContext,
    EducationInfo,
    EmptyContact,
    EmptyEducation,
    EmptySkill,
    Skill,
} from '../data';

import DynamicList, { ListRenderProps } from './list';
import ContactEdit from './editor/contact';
import SkillEditor from './editor/skill';
import EducationEdit from './editor/education';

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
                return { ...prev, eduExtra: data };
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

export default Editor;
