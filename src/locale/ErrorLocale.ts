import { Locale } from '../settings';

type ErrorLocaleKeys = 'STATUS' | 'INVALID_RESP' | 'INVALID_MESSAGE';

const ErrorLocalePT: Record<ErrorLocaleKeys, string> = {
    STATUS: 'Erro ao comunicar com API',
    INVALID_RESP: 'O endpoint produziu responsta inválida',
    INVALID_MESSAGE: "Campos 'role' e 'content' não estão presentes",
};
const ErrorLocaleEN: Record<ErrorLocaleKeys, string> = {
    STATUS: 'Error talking to endpoint',
    INVALID_RESP: 'The endpoint produced an invalid response',
    INVALID_MESSAGE: "Fields 'role' and 'content' not present",
};

export const ErrorLocale: Record<Locale, Record<ErrorLocaleKeys, string>> = {
    Portuguese: ErrorLocalePT,
    English: ErrorLocaleEN,
} as const;
