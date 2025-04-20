import Swal from 'sweetalert2';
import { CvInfo, LangLevel, SkillLevel } from '../data';
import { AiInfo, CvAiData } from './data';

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
    writeAbout: 'plaint text',
    getKeywords: 'string array',
} as const;

const GetSystemPrompts = (req: AiRequest): Message[] => {
    //prettier-ignore
    const prompts: Message[] = [{
        role: 'system',
        content: "You are an assistant helping optmize the user's CV\nYou must respond to requests with only the requested data and no additional information so it may be parsed",
    },
    {
	    role: 'system',
		content: `Expected response type: ${ResponseType[req]}`,
	}];

    switch (req) {
        case 'getKeywords':
            return prompts.concat({
                role: 'system',
                //prettier-ignore
                content: "Given the information currently present on the CV, create a list of keywords that best represent the user's knowledge and skills",
            });
        case 'writeAbout':
            return prompts.concat({
                role: 'system',
                //prettier-ignore
                content: 'Given the information currently present on the CV, improve the "about" section',
            });

        default:
            const exhaustive: never = req;
            throw new Error(`Invalid AI request: ${exhaustive}`);
    }
};

export const EncodeAiCv = (info: CvInfo): CvAiData => {
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

export const EncodeCvMessage = (info: CvInfo, tool?: boolean): Message => {
    const encoded = JSON.stringify(EncodeAiCv(info), null, 2);

    return {
        role: tool ? 'tool' : 'system',
        content: `Current CV state:\n${encoded}`,
    };
};

export async function PerformRequest(
    agent: AiInfo,
    data: CvInfo,
    action: AiRequest
): Promise<CvInfo> {
    const prompts = GetSystemPrompts(action);

    let mutableCv = { ...data };
    const initialCvState = EncodeCvMessage(mutableCv);

    const messages = prompts.concat(initialCvState);

    const response = await callLLM(agent, messages);

    console.log(response);
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
