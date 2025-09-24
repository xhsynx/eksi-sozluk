<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Sorting01Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		selectedSort = $bindable('En yeniye göre sırala'),
		width = 'w-auto',
		height = 'py-3'
	} = $props();

	// Internal state
	let isOpen = $state(false);

	// Sort options
	const sortOptions = [
		{ label: 'En yeniye göre sırala', value: 'newest' },
		{ label: 'En eskiye göre sırala', value: 'oldest' },
		{ label: 'En popüler', value: 'popular' },
		{ label: 'En az popüler', value: 'least_popular' },
		{ label: 'Alfabetik A-Z', value: 'alphabetical_asc' },
		{ label: 'Alfabetik Z-A', value: 'alphabetical_desc' }
	];

	function selectSort(option: string) {
		selectedSort = option;
		isOpen = false;
	}
</script>

<div class="relative {width}">
	<button
		onclick={() => (isOpen = !isOpen)}
		class="flex items-center gap-2 rounded-full border border-blue-300 bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200 transition-colors {height}"
	>
		<HugeiconsIcon icon={Sorting01Icon} size={16} color="currentColor" />
		<span class="text-sm font-medium">{selectedSort}</span>
		<HugeiconsIcon icon={ArrowDown01Icon} size={16} color="currentColor" />
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute top-full right-0 left-0 z-50 mt-1 rounded-lg border border-base-300 bg-base-100 shadow-lg"
		>
			{#each sortOptions as option}
				<button
					onclick={() => selectSort(option.label)}
					class="w-full px-4 py-2 text-left text-base-content first:rounded-t-lg last:rounded-b-lg hover:bg-base-200 {option.label ===
					selectedSort
						? 'bg-primary text-primary-content font-semibold'
						: ''}"
				>
					{option.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
