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
			inputSchema: {
				lat: z.number().min(-90).max(90).optional(),
				lng: z.number().min(-180).max(180).optional(),
				locationName: z.string().optional(),
				zipCode: z.string().optional(),
			}
		},
		toolHandler(async ({ lat, lng, locationName, zipCode }) => {
			const hasCoords = lat !== undefined && lng !== undefined;
			const hasLocation = locationName !== undefined;
			const hasZip = zipCode !== undefined;

			if (!hasCoords && !hasLocation && !hasZip) {
				return {
					content: [{ type: "text", text: "Please provide coordinates (lat/lng), a locationName, or a zipCode." }]
				};
			}

			const options: Record<string, unknown> = {
				key: process.env.OPEN_WEATHER_API_KEY,
				units: "metric",
			};

			if (hasCoords) {
				options.coordinates = { lat, lon: lng };
			} else if (hasZip) {
				options.zipCode = zipCode;
			} else if (hasLocation) {
				options.locationName = locationName;
			}

			const weatherApi = new OpenWeatherAPI(options as ConstructorParameters<typeof OpenWeatherAPI>[0]);
			const weather = await weatherApi.getCurrent();

			return {
				content: [{ type: "text", text: JSON.stringify(weather) }]
			}
		})
	)
}
