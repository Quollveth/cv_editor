import Swal from 'sweetalert2';
import { CvInfo, LangLevel } from '../data';
import { AiInfo, CvAiData } from './data';
import { Locale, Settings } from '../settings';
import { AILocale } from '../locale';

type Message = {
    role: 'error' | 'system' | 'user' | 'tool';
    content: string;
};
//prettier-ignore
const ERROR_MESSAGE: Message = {role: 'error', content: ''};
const ERROR_TOAST_TIME = 5000;
export const ShowError = (error: string, text: string) => {
    console.error(`${error}:${text}`);
    Swal.fire({
        title: error,
        text: text,
        icon: 'error',
        toast: true,
        position: 'top-end',
        timer: ERROR_TOAST_TIME,
    });
};

export type AiRequest = 'writeAbout' | 'getKeywords';

const ResponseType: Record<AiRequest, string> = {
    writeAbout: 'plain text',
    getKeywords: 'string array, comma separated',
} as const;

const GetSystemPrompts = (req: AiRequest, lang: Locale): Message[] => {
    //prettier-ignore
    const prompts: Message[] = [{
        role: 'system',
        content: AILocale[lang]['BASE_PROMPT'],
    },
    {
	    role: 'system',
		content: `${AILocale[lang]['RESPONSE_TYPE']}: ${ResponseType[req]}`,
	}];

    switch (req) {
        case 'getKeywords':
        case 'writeAbout':
            return prompts.concat({
                role: 'system',
                //prettier-ignore
                content: AILocale[lang]['GET_KEYWORDS'],
            });

        default:
            const exhaustive: never = req;
            throw new Error(`Invalid AI request: ${exhaustive}`);
    }
};

const EncodeAiCv = (info: CvInfo): CvAiData => {
    return {
        about: info.about,
        keywords: [...info.keywords],
        languages: info.languages.map((l) => {
            return {
                id: l.id,
                name: l.name,
                level: LangLevel[l.level],
            };
        }),
        skills: info.skills.map((s) => {
            return {
                id: s.id,
                name: s.name,
                level: s.level,
            };
        }),
        educationMain: info.eduMain.map((e) => {
            return {
                id: e.id,
                institution: e.name,
                courses: e.what.map((c) => c.name),
            };
        }),
        educationExtra: info.eduExtra.map((e) => {
            return {
                id: e.id,
                institution: e.name,
                courses: e.what.map((c) => c.name),
            };
        }),
    };
};

const ApplyChanges = (
    request: AiRequest,
    response: Message,
    starting: CvInfo
): CvInfo => {
    const ret: CvInfo = { ...starting };

    switch (request) {
        case 'writeAbout':
            return { ...ret, about: response.content };
        case 'getKeywords':
            return { ...ret, keywords: response.content.split(',') };

        default:
            const exhaustive: never = request;
            throw new Error(`Invalid AI request: ${exhaustive}`);
    }
};

export async function PerformRequest(
    agent: AiInfo,
    data: CvInfo,
    settings: Settings,
    action: AiRequest
): Promise<CvInfo> {
    const EncodeCvMessage = (info: CvInfo): Message => {
        const encoded = JSON.stringify(EncodeAiCv(info), null, 2);

        return {
            role: 'system',
            content: `${AILocale[settings.language]['CV_STATE']}:\n${encoded}`,
        };
    };

    const prompts = GetSystemPrompts(action, settings.language);

    let mutableCv = { ...data };
    const initialCvState = EncodeCvMessage(mutableCv);

    const messages = prompts.concat(initialCvState);

    const response = await callLLM(agent, messages);

    return ApplyChanges(action, response, data);
}

export async function callLLM(
    agent: AiInfo,
    messages: Message[]
): Promise<Message> {
    const response = await fetch(agent.endpoint, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${agent.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: agent.model,
            messages: messages,
        }),
    });

    if (response.status !== 200) {
        const error = await response.json();
        ShowError(
            'Error talking to endpoint',
            `Status: ${response.status}\n${error.error.message}`
        );
        return ERROR_MESSAGE;
    }

    let body: any;
    try {
        body = await response.json();
    } catch (e) {
        ShowError('The endpoint produced an invalid response', `${e}`);
        return ERROR_MESSAGE;
    }

    const content = body.choices[0].message;
    if (!content.role || !content.content) {
        ShowError(
            'The endpoint produced an invalid response',
            "Fields 'role' and 'content' not present"
        );
        return ERROR_MESSAGE;
    }
    return content;
}
