import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const toolHandler = <T>(fn: (inputs: T) => Promise<CallToolResult>) => {
	return async (inputs: T) => {
		try {
			return await fn(inputs);
		} catch(err) {
			return {
				isError: true,
				content: [{ 
					type: 'text' as const,
					text: err instanceof Error ? 
						process.env.NODE_ENV === 'development' ? err.stack ?? err.message : err.message :
						'Something went wrong...'
					}]
			}
		}
	}
}
