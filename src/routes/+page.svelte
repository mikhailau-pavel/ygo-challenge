<script lang="ts">
	import { debounce } from '$lib/utils/debounce';
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	interface WeatherData {
		city: string;
		temperature: number;
		condition: string;
		description: string;
	}

	let cityInput = $state('Berlin');
	let weather = $state<WeatherData | null>(null);
	let isLoading = $state(false);
	let error = $state<string | null>(null);
	let hasSearched = $state(false);

	async function fetchWeather(city: string) {
		if (!city.trim()) {
			error = 'Please enter a city name';
			return;
		}

		isLoading = true;
		error = null;
		hasSearched = true;

		try {
			const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({
					message: 'Failed to fetch weather data'
				}));
				throw new Error(errorData.message || 'Failed to fetch weather data');
			}

			const data = await response.json();
			weather = data;
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unexpected error occurred';
			}
			weather = null;
		} finally {
			isLoading = false;
		}
	}

	async function handleSearch() {
		await fetchWeather(cityInput);
	}

	const debouncedFetch = debounce((city: string) => {
		if (hasSearched && city.trim()) {
			fetchWeather(city);
		}
	}, 500);

	$effect(() => {
		debouncedFetch(cityInput);
	});

	$effect(() => {
		fetchWeather('Berlin');
	});
</script>

<ThemeToggle />

<div
	class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300"
>
	<div
		class="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300"
	>
		<h1
			class="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4 transition-colors"
		>
			Weather Dashboard
		</h1>

		<div class="flex items-center space-x-2">
			<input
				type="text"
				bind:value={cityInput}
				placeholder="Enter city name..."
				class="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						handleSearch();
					}
				}}
			/>
			<button
				onclick={handleSearch}
				disabled={isLoading}
				class="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Search
			</button>
		</div>

		{#if isLoading}
			<LoadingSpinner />
		{:else if error}
			<ErrorMessage message={error} />
		{:else}
			<WeatherCard {weather} />
		{/if}
	</div>
</div>
