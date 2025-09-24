<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Calendar01Icon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		selectedRange = $bindable('Son 7 gün'),
		width = 'w-48',
		height = 'py-3'
	} = $props();

	// Internal state
	let isOpen = $state(false);

	// Date ranges
	const dateRanges = [
		{ label: 'Son 1 gün', value: '1' },
		{ label: 'Son 7 gün', value: '7' },
		{ label: 'Son 30 gün', value: '30' },
		{ label: 'Son 90 gün', value: '90' },
		{ label: 'Son 1 yıl', value: '365' }
	];

	function selectRange(range: string) {
		selectedRange = range;
		isOpen = false;
	}
</script>

<div class="relative {width}">
	<button
		onclick={() => (isOpen = !isOpen)}
		class="btn w-full justify-start rounded-full border border-blue-300 bg-blue-100 px-4 {height} text-blue-700 shadow-sm hover:bg-blue-200"
	>
		<div class="mr-2">
			<HugeiconsIcon icon={Calendar01Icon} size={20} color="currentColor" />
		</div>
		{selectedRange}
		<svg class="ml-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute top-full right-0 left-0 z-50 mt-1 rounded-lg border border-blue-200 bg-white shadow-lg"
		>
			{#each dateRanges as range}
				<button
					onclick={() => selectRange(range.label)}
					class="w-full px-4 py-2 text-left text-blue-700 first:rounded-t-lg last:rounded-b-lg hover:bg-blue-50 {range.label ===
					selectedRange
						? 'bg-blue-100 font-semibold'
						: ''}"
				>
					{range.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
