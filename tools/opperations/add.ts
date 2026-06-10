import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import { toolHandler } from "../../toolHandler.js";

export const addTool = (server: McpServer) => {
	server.registerTool(
		'add',
		{
			title: 'Add tool',
			description: 'Adds two numbers together and returns the result',
			inputSchema: { numOne: z.number(), numTwo: z.number() },
			outputSchema: { result: z.string() }
		},
		toolHandler(async ({ numOne, numTwo }) => {
			const total = numOne + numTwo;
			const output = { result: `${numOne} + ${numTwo} = ${total}`};
			return {
				content: [{ type: "text", text: JSON.stringify(output) }],
				structuredContent: output 
			}
		})
	)
};
