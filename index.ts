import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { addTool } from "./tools/opperations/add.js";
import { divideTool } from "./tools/opperations/divide.js";

const server = new McpServer({
	name: 'node-mcp-server',
	version: '1.0.0'
});

addTool(server);
divideTool(server);

const transport = new StdioServerTransport();
await server.connect(transport);
