import DOMPurify from 'dompurify';

import { useEffect, useRef, useState } from 'react';
import { ListRenderProps } from './list';
import { Skill } from '../data';

const SkillEditor = (props: ListRenderProps<Skill>) => {
    const [svgLogo, setSvgLogo] = useState('');

    const [svgString, setSvgString] = useState('');
    const logoRef = useRef<HTMLDivElement>(null);

    const changeLogo = () => {
        const clean = DOMPurify.sanitize(svgString, {
            USE_PROFILES: { svg: true },
        });

        setSvgLogo(clean);
    };

    useEffect(() => {
        const parent = logoRef.current;

        if (!parent) {
            return;
        }

        parent.innerHTML = svgLogo;

        const svg = parent.firstChild as SVGElement;

        if (!svg) {
            return;
        }

        svg.setAttribute('width', '1em');
        svg.setAttribute('height', '1em');

        svg.style.width = 'calc(var(--spacing) * 9)';
        svg.style.height = 'calc(var(--spacing) * 9)';
    }, [svgLogo]);

    return (
        <div className="border-1 border-gray-600 p-2">
            <div className="h-14 border-1 border-gray-500 p-1 flex gap-2">
                <div
                    ref={logoRef}
                    className="border-1 border-gray-500 w-12 h-12 p-1"
                />
                <input className="border-1 border-gray-400 flex-1 p-2 text-lg" />
                <select>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Proficient">Proficient</option>
                </select>
            </div>
            <div className="my-2 flex gap-2">
                <button
                    className="border-1 border-gray-400 p-2 rounded"
                    onClick={changeLogo}
                >
                    Upload
                </button>
                <textarea
                    onInput={(e) => {
                        setSvgString((e.target as HTMLTextAreaElement).value);
                    }}
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
