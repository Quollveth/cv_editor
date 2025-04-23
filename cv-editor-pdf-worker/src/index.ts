export interface Env {
	ORIGIN: string;
}

export default {
	async fetch(request, env: Env): Promise<Response> {
		const allowedOrigin = env.ORIGIN;

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': allowedOrigin,
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		if (request.method !== 'POST') {
			return new Response('This endpoint only accepts POST requests', { status: 405 });
		}

		const response = await handlePostRequest(request, env);

		response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
		return response;
	},
} satisfies ExportedHandler<Env>;

async function handlePostRequest(request: Request, env: Env): Promise<Response> {
	return createTextFile();
}

function createTextFile() {
	const filename = 'output.txt';
	const content = 'this file came from a cloudflare worker';

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain',
			'Content-Disposition': `attachment; filename="${filename}"`,
		},
	});
}
