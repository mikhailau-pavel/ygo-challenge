<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div in:fade={{ duration: 200 }} class="flex justify-center items-center mt-6">
	<div
		class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"
	></div>
</div>

