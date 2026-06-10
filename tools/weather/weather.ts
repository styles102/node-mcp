import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { OpenWeatherAPI } from "openweather-api-node";
import { z } from "zod";
import { toolHandler } from "../../toolHandler.js";

export const weatherTool = (server: McpServer) => {
	server.registerTool(
		'weather',
		{
			title: 'Weather tool',
			description: 'Access current weather data for any location on Earth!',
			inputSchema: { lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }
		},
		toolHandler(async ({ lat, lng }) => {
			let weatherApi = new OpenWeatherAPI({
				key: process.env.OPEN_WEATHER_API_KEY,
				coordinates: {
					lat,
					lon: lng
				},
				units: "metric"
			})

			const weather = await weatherApi.getCurrent();

			return {
				content: [{ type: "text", text: JSON.stringify(weather) }]
			}
		})
	)
}
