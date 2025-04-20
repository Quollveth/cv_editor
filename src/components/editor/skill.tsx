import DOMPurify from 'dompurify';

import { useEffect, useRef, useState } from 'react';
import { ListRenderProps } from '../list';
import { EmptySkill, Skill, SkillLevel } from '../../data';

const SkillEditor = (props: ListRenderProps<Skill>) => {
    //prettier-ignore
    const [skill, setSkill] = useState<Skill>( () => props.initial ?? EmptySkill());

    const logoRef = useRef<HTMLDivElement>(null);
    const stringRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        props.onChange(skill);
    }, [skill]);

    const editSkill = (data: Partial<Skill>) => {
        setSkill((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const changeLogo = (svgString: string) => {
        if (!logoRef.current) return;

        const sanitized = DOMPurify.sanitize(svgString, {
            USE_PROFILES: { svg: true },
        });

        const doc = new DOMParser().parseFromString(sanitized, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        if (!svg) return;

        svg.setAttribute('width', '2.5em');
        svg.setAttribute('height', '2.5em');

        const updatedSvgString = new XMLSerializer().serializeToString(svg);

        if (logoRef.current) {
            logoRef.current.innerHTML = updatedSvgString;
        }

        editSkill({ logo: btoa(updatedSvgString) });
    };

    useEffect(() => {
        if (props.initial.logo === '') {
            return;
        }

        const decoded = atob(props.initial.logo!);
        changeLogo(decoded);
    }, []);

    return (
        <div className="border-1 border-gray-600 p-2">
            <div className="h-14 border-1 border-gray-500 p-1 flex gap-2">
                <div
                    ref={logoRef}
                    className="border-1 border-gray-500 w-12 h-12 p-1"
                />
                <input
                    className="border-1 border-gray-400 flex-1 p-2 text-lg"
                    value={skill.name}
                    onInput={(e) =>
                        editSkill({
                            name: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <select
                    value={skill.level}
                    onChange={(e) =>
                        editSkill({
                            //prettier-ignore
                            level: (e.target as HTMLSelectElement) .value as SkillLevel,
                        })
                    }
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Proficient">Proficient</option>
                </select>
            </div>
            <div className="my-2 flex gap-2">
                <button
                    className="border-1 border-gray-400 p-2 rounded"
                    //prettier-ignore
                    onClick={()=>changeLogo((stringRef.current as HTMLTextAreaElement).value)}
                >
                    Upload
                </button>
                <textarea
                    ref={stringRef}
                    placeholder="SVG string"
                    className="resize-none border-1 border-gray-600 h-12 w-full text-xs"
                />
            </div>
            {/*prettier-ignore*/}
            <p className="text-xs text-gray-400"> You can get some logos at svgl.app </p>
        </div>
    );
};

export default SkillEditor;
