import { useContext, useEffect, useState } from 'react';
import { EmptyLanguage, Language, SkillLevel } from '../../data';
import { ListRenderProps } from '../list';
import { SettingsContext } from '../../settings';
import { EditorLocale } from '../../locale';

const LanguageEditor = (props: ListRenderProps<Language>) => {
    const [settings] = useContext(SettingsContext);

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
                {/*prettier-ignore*/}
                <option value="Beginner">{EditorLocale[settings.language]['BEGINNER']}</option>
                {/*prettier-ignore*/}
                <option value="Intermediate">{EditorLocale[settings.language]['INTERMEDIATE']}</option>
                {/*prettier-ignore*/}
                <option value="Advanced">{EditorLocale[settings.language]['ADVANCED']}</option>
                {/*prettier-ignore*/}
                <option value="Proficient">{EditorLocale[settings.language]['FLUENT']}</option>
                {/*prettier-ignore*/}
                <option value="Expert">{EditorLocale[settings.language]['NATIVE']}</option>
            </select>
        </div>
    );
};

export default LanguageEditor;
