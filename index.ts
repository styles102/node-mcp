import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import 'dotenv/config';
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

const transport = new StdioServerTransport();
await server.connect(transport);
