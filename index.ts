import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'crypto';
import 'dotenv/config';
import express from 'express';
import { addTool } from "./tools/opperations/add.js";
import { divideTool } from "./tools/opperations/divide.js";
import { weatherTool } from "./tools/weather/weather.js";

const server = new McpServer({
	name: 'node-mcp-server',
	version: '1.0.0'
});

addTool(server);
divideTool(server);
weatherTool(server);

if(process.env.TRANSPORT === 'stdio') {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

if(process.env.TRANSPORT === 'http') {
	const transport = new StreamableHTTPServerTransport({
		sessionIdGenerator: randomUUID
	});
	const app = express();
	
	app.use(express.json())

	app.all('/mcp', (req, res) => {
		transport.handleRequest(req, res, req.body)
	});

	const PORT = process.env.MCP_PORT ? Number.parseInt(process.env.MCP_PORT, 10) : 3000;

	console.log(`Starting Express MCP server on port ${PORT}`);
	console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`)
	})

	await server.connect(transport);
}
