import { Locale } from '../settings';

type PanelLocaleKeys =
    | 'SAVE'
    | 'LOAD'
    | 'ACTIONS'
    | 'KEYWORDS'
    | 'ABOUT'
    | 'DEFAULT'
    | 'ENDPOINT'
    | 'MODEL'
    | 'TOKEN'
    | 'EXPAND';

const PanelLocaleEN: Record<PanelLocaleKeys, string> = {
    SAVE: 'Save',
    LOAD: 'Load',
    ACTIONS: 'AI Actions',
    KEYWORDS: 'Get Keywords',
    ABOUT: 'Write "About" Section',
    DEFAULT: 'Use Default',
    ENDPOINT: 'Endpoint',
    MODEL: 'Model Name',
    TOKEN: 'API Key',
    EXPAND: 'Show AI Settings',
};
const PanelLocalePT: Record<PanelLocaleKeys, string> = {
    SAVE: 'Salvar',
    LOAD: 'Carregar',
    ACTIONS: 'Ações de IA',
    KEYWORDS: 'Gerar Keywords',
    ABOUT: 'Gerar Seção "Sobre"',
    DEFAULT: 'Usar Padrão',
    ENDPOINT: 'Endpoint',
    MODEL: 'Modelo',
    TOKEN: 'Chave API',
    EXPAND: 'Configurações de IA',
};

export const PanelLocale: Record<Locale, Record<PanelLocaleKeys, string>> = {
    Portuguese: PanelLocalePT,
    English: PanelLocaleEN,
} as const;
