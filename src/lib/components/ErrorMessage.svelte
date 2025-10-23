<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<div
	in:fade={{ duration: 300 }}
	class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg transition-colors"
>
	<p class="text-red-700 dark:text-red-400 text-center">⚠️ {message}</p>
</div>

