<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { RefreshIcon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		onClick = () => {},
		text = 'Yenile',
		width = 'lg:w-auto',
		height = 'py-3'
	} = $props();

	// Event handler
	function handleClick(event: MouseEvent) {
		onClick();
	}
</script>

<div class="{width}">
	<button
		onclick={handleClick}
		class="btn rounded-full border-gray-300 bg-gray-200 px-6 text-gray-700 hover:border-gray-400 hover:bg-gray-300 {height}"
	>
		<div class="mr-2">
			<HugeiconsIcon icon={RefreshIcon} size={20} color="currentColor" />
		</div>
		{text}
		<div class="ml-2 border-l border-gray-400 pl-2">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</div>
	</button>
</div>
