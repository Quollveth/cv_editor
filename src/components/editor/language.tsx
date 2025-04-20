import { useEffect, useState } from 'react';
import { EmptyLanguage, Language, SkillLevel } from '../../data';
import { ListRenderProps } from '../list';

const LanguageEditor = (props: ListRenderProps<Language>) => {
    const [language, setLanguage] = useState<Language>(
        () => props.initial ?? EmptyLanguage()
    );

    const editLanguage = (data: Partial<Language>) => {
        setLanguage((prev) => ({
            ...prev,
            ...data,
        }));
    };

    useEffect(() => {
        props.onChange(language);
    }, [language]);

    return (
        <div className="h-14 border-1 border-gray-500 p-1 flex gap-2">
            <input
                className="border-1 border-gray-400 flex-1 p-2 text-lg"
                value={language.name}
                onInput={(e) =>
                    editLanguage({
                        name: (e.target as HTMLInputElement).value,
                    })
                }
            />
            <select
                value={language.level}
                onChange={(e) =>
                    editLanguage({
                        //prettier-ignore
                        level: (e.target as HTMLSelectElement) .value as SkillLevel,
                    })
                }
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Fluent</option>
                <option value="Expert">Native</option>
            </select>
        </div>
    );
};

export default LanguageEditor;
