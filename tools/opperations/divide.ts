import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import { toolHandler } from "../../toolHandler.js";

export const divideTool = (server: McpServer) => {
	server.registerTool(
		'divide',
		{
			title: 'Divide tool',
			description: 'Divides two numbers and returns the result',
			inputSchema: { numOne: z.number().positive(), numTwo: z.number().positive() },
			outputSchema: { result: z.string() }
		},
		toolHandler(async ({ numOne, numTwo }) => {
			const total = numOne / numTwo;
			const output = { result: `${numOne} / ${numTwo} = ${total}`};
			return {
				content: [{ type: "text", text: JSON.stringify(output) }],
				structuredContent: output 
			}
		})
	)
};
