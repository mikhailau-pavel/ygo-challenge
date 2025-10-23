<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	interface WeatherData {
		city: string;
		temperature: number;
		condition: string;
		description: string;
	}

	interface Props {
		weather: WeatherData | null;
	}

	let { weather }: Props = $props();

	function getWeatherEmoji(condition: string): string {
		const emojiMap: Record<string, string> = {
			Clear: '☀️',
			Clouds: '☁️',
			Rain: '🌧️',
			Drizzle: '🌦️',
			Thunderstorm: '⛈️',
			Snow: '❄️',
			Mist: '🌫️',
			Smoke: '💨',
			Haze: '🌫️',
			Dust: '💨',
			Fog: '🌫️',
			Sand: '💨',
			Ash: '🌋',
			Squall: '💨',
			Tornado: '🌪️'
		};
		return emojiMap[condition] || '🌍';
	}
</script>

{#if weather}
	<div
		in:slide={{ duration: 300 }}
		out:fade={{ duration: 200 }}
		class="mt-6 text-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow transition-colors"
	>
		<p class="text-lg font-medium text-gray-700 dark:text-gray-200">
			{getWeatherEmoji(weather.condition)} City: <span class="font-semibold"
				>{weather.city}</span
			>
		</p>
		<p
			class="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2 transition-colors"
		>
			{weather.temperature}°C
		</p>
		<p class="text-md text-gray-600 dark:text-gray-300 mt-1 capitalize transition-colors">
			{weather.condition}
		</p>
	</div>
{/if}

