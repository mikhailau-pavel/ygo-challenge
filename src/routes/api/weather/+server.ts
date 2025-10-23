import { error, json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

interface OpenWeatherResponse {
	name: string;
	main: {
		temp: number;
	};
	weather: Array<{
		main: string;
		description: string;
	}>;
}

export const GET: RequestHandler = async ({ url }) => {
	const city = url.searchParams.get('city');

	if (!city) {
		error(400, 'City parameter is required');
	}

	if (!API_KEY) {
		error(500, 'API key not configured');
	}

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
				city
			)}&units=metric&appid=${API_KEY}`
		);

		if (!response.ok) {
			if (response.status === 404) {
				error(404, 'City not found');
			}
			error(response.status, 'Failed to fetch weather data');
		}

		const data: OpenWeatherResponse = await response.json();

		return json({
			city: data.name,
			temperature: Math.round(data.main.temp),
			condition: data.weather[0].main,
			description: data.weather[0].description
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		error(500, 'An error occurred while fetching weather data');
	}
};

