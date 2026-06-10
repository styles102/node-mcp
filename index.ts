import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
	name: 'node-mcp-server',
	version: '1.0.0'
});

server.registerTool(
	'add',
	{
		title: 'Add tool',
		description: 'Adds two number together and returns the result',
		inputSchema: { numOne: z.number(), numTwo: z.number() },
		outputSchema: { result: z.string() }
	},
	async({ numOne, numTwo }) => {
		const total = numOne + numTwo;
		const output = { result: `${numOne} + ${numTwo} = ${total}`};
		return {
			content: [{ type: "text", text: JSON.stringify(output) }],
			structuredContent: output 
		}
	}
)

const transport = new StdioServerTransport();
await server.connect(transport);
