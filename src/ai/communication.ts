import Swal from 'sweetalert2';
import { AiInfo, CvAiData } from './data';
import { z } from 'zod';

const ErrorToastTime = 3000;

const ModelResponseSchema = z.object({
    choices: z.array(
        z.object({
            message: z.object({
                content: z.string(),
            }),
        })
    ),
});

export type Message = { role: 'system' | 'user'; content: string };

export type AiRequests =
    | { type: 'About'; data: CvAiData }
    | { type: 'GetKeywords'; data: CvAiData };

const SystemPrompts: Message[] = [
    {
        role: 'system',
        content: '',
    },
] as const;

export async function AskAi(agent: AiInfo) {
    const message = 'Model connection test';

    const response = await fetch(agent.endpoint, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${agent.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: agent.model,
            messages: SystemPrompts.concat({ role: 'user', content: message }),
        }),
    });

    if (response.status !== 200) {
        const error = await response.json();
        Swal.fire({
            title: 'Error talking to model',
            text: `Status: ${response.status}\n${error.error.message}`,
            icon: 'error',
            toast: true,
            position: 'top-end',
            timer: ErrorToastTime,
        });
        return;
    }

    const body = await response.json();
    const parseResult = ModelResponseSchema.safeParse(body);

    if (!parseResult.success) {
        console.error('Invalid response structure:', parseResult.error);
        Swal.fire({
            title: 'Invalid response',
            text: 'The endpoint provided a response in a unrecognized format',
            icon: 'error',
            toast: true,
            position: 'top-end',
            timer: ErrorToastTime,
        });
        return;
    }

    const content = parseResult.data.choices[0].message.content;
    console.log(content);
}
