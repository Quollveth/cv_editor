import { Locale } from '../settings';

//prettier-ignore
type LanguagesLocale = | 'BEGINNER' | 'ADVANCED' | 'INTERMEDIATE' | 'ADVANCED' | 'FLUENT' | 'NATIVE';
type SkillsLocale = 'PROFICIENT' | 'EXPERT' | 'LOGOS' | 'UPLOAD';
//prettier-ignore
type EducationLocale = 'SCHOOL' | 'COURSE' | 'START' | 'END'|'YEARONLY';
type ListsLocale = 'CONTACT' | 'LANGUAGES' | 'SKILLS' | 'EDUMAIN' | 'EDUEXTRA';
type BasicLocale = 'NAME' | 'ABOUT' | 'KEYWORDS' | 'BIRTHDAY' | 'ADD';

type EditorLocaleKeys =
    | BasicLocale
    | EducationLocale
    | LanguagesLocale
    | SkillsLocale
    | ListsLocale;

const EditorLocaleEN: Record<EditorLocaleKeys, string> = {
    BEGINNER: 'Beginner',
    ADVANCED: 'Advanced',
    INTERMEDIATE: 'Intermediate',
    PROFICIENT: 'Proficient',
    EXPERT: 'Expert',
    FLUENT: 'Fluent',
    NATIVE: 'Native',
    SCHOOL: 'Insititution',
    COURSE: 'Course',
    START: 'Start',
    END: 'End',
    NAME: 'Name',
    ABOUT: 'About',
    KEYWORDS: 'Keywords',
    BIRTHDAY: 'Birthday',
    ADD: 'Add Item',
    CONTACT: 'Contact Info',
    SKILLS: 'Skills',
    LANGUAGES: 'Languages',
    EDUMAIN: 'Main Education',
    EDUEXTRA: 'Extra Education',
    YEARONLY: 'Year Only',
    LOGOS: 'You can get some logos at svgl.app',
    UPLOAD: 'Upload',
};
const EditorLocalePT: Record<EditorLocaleKeys, string> = {
    BEGINNER: 'Iniciante',
    ADVANCED: 'Avançado',
    INTERMEDIATE: 'Intermediário',
    PROFICIENT: 'Proficiente',
    EXPERT: 'Expert',
    FLUENT: 'Fluente',
    NATIVE: 'Nativo',
    SCHOOL: 'Insitituição',
    COURSE: 'Curso',
    START: 'Início',
    END: 'Fim',
    NAME: 'Nome',
    ABOUT: 'Sobre',
    KEYWORDS: 'Keywords',
    BIRTHDAY: 'Aniversário',
    ADD: 'Adicionar',
    CONTACT: 'Informação de Contato',
    SKILLS: 'Habilidades',
    LANGUAGES: 'Idiomas',
    EDUMAIN: 'Formação Principal',
    EDUEXTRA: 'Formação Adicional',
    YEARONLY: 'Apenas Ano',
    LOGOS: 'Vá para svgl.app para pegar logos em svg',
    UPLOAD: 'Upload',
};

export const EditorLocale: Record<Locale, Record<EditorLocaleKeys, string>> = {
    Portuguese: EditorLocalePT,
    English: EditorLocaleEN,
} as const;
