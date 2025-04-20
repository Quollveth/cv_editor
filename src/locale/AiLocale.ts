import { Locale } from '../settings';

type AILocaleKeys =
    | 'BASE_PROMPT'
    | 'RESPONSE_TYPE'
    | 'WRITE_ABOUT'
    | 'GET_KEYWORDS'
    | 'CV_STATE';

//prettier-ignore
const AILocalePT: Record<AILocaleKeys, string> = {
    BASE_PROMPT: 'Você é um assistente para otimizar o currículo do usuário\nVocê deve responder com apenas a informação solicitada para ser analisada automaticamente',
    RESPONSE_TYPE: 'Tipo de responsta esperada: ',
    WRITE_ABOUT: 'Dada a information present no currículo, melhore a sessão "sobre" (about)',
    GET_KEYWORDS: 'Dada a infomação presente no currículo, cria uma lista de keywords que reprensentem o conhecimento e habilidades do usuário',
    CV_STATE: 'Currículo Atual',
};

//prettier-ignore
const AILocaleEN: Record<AILocaleKeys, string> = {
    BASE_PROMPT: "You are an assistant helping optmize the user's CV\nYou must respond to requests with only the requested data and no additional information so it may be parsed",
    RESPONSE_TYPE: 'Expected response type',
	WRITE_ABOUT: 'Given the information currently present on the CV improve the "about" section',
    GET_KEYWORDS: "Given the information currently present on the CV, create a list of keywords that best represent the user's knowledge and skills",
    CV_STATE: 'Current CV State',
};

export const AILocale: Record<Locale, Record<AILocaleKeys, string>> = {
    Portuguese: AILocalePT,
    English: AILocaleEN,
} as const;
