import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server.js';

global.fetch = vi.fn();

describe('Weather API Endpoint', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return weather data for valid city', async () => {
		const mockWeatherData = {
			name: 'Berlin',
			main: { temp: 15.5 },
			weather: [{ main: 'Clouds', description: 'broken clouds' }]
		};

		(global.fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => mockWeatherData
		});

		const url = new URL('http://localhost/api/weather?city=Berlin');
		const event = {
			url,
			request: new Request(url),
			params: {},
			locals: {},
			platform: undefined,
			route: { id: '/api/weather' }
		} as any;

		const response = await GET(event);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data).toEqual({
			city: 'Berlin',
			temperature: 16,
			condition: 'Clouds',
			description: 'broken clouds'
		});
	});

	it('should return 400 error when city parameter is missing', async () => {
		const url = new URL('http://localhost/api/weather');
		const event = {
			url,
			request: new Request(url),
			params: {},
			locals: {},
			platform: undefined,
			route: { id: '/api/weather' }
		} as any;

		await expect(GET(event)).rejects.toThrow();
	});

	it('should return 404 error for non-existent city', async () => {
		(global.fetch as any).mockResolvedValueOnce({
			ok: false,
			status: 404
		});

		const url = new URL('http://localhost/api/weather?city=InvalidCity123');
		const event = {
			url,
			request: new Request(url),
			params: {},
			locals: {},
			platform: undefined,
			route: { id: '/api/weather' }
		} as any;

		await expect(GET(event)).rejects.toThrow();
	});

	it('should handle network errors gracefully', async () => {
		(global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

		const url = new URL('http://localhost/api/weather?city=Berlin');
		const event = {
			url,
			request: new Request(url),
			params: {},
			locals: {},
			platform: undefined,
			route: { id: '/api/weather' }
		} as any;

		await expect(GET(event)).rejects.toThrow();
	});

	it('should round temperature to nearest integer', async () => {
		const mockWeatherData = {
			name: 'London',
			main: { temp: 22.7 },
			weather: [{ main: 'Clear', description: 'clear sky' }]
		};

		(global.fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => mockWeatherData
		});

		const url = new URL('http://localhost/api/weather?city=London');
		const event = {
			url,
			request: new Request(url),
			params: {},
			locals: {},
			platform: undefined,
			route: { id: '/api/weather' }
		} as any;

		const response = await GET(event);
		const data = await response.json();

		expect(data.temperature).toBe(23);
	});

	it('should URL encode city name in API request', async () => {
		const mockWeatherData = {
			name: 'New York',
			main: { temp: 18 },
			weather: [{ main: 'Rain', description: 'light rain' }]
		};

		(global.fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => mockWeatherData
		});

		const url = new URL('http://localhost/api/weather?city=New York');
		const event = {
			url,
			request: new Request(url),
			params: {},
			locals: {},
			platform: undefined,
			route: { id: '/api/weather' }
		} as any;

		await GET(event);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining('New%20York')
		);
	});
});

