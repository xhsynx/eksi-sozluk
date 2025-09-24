<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { ArrowUpDownIcon, ArrowDown01Icon } from '@hugeicons/core-free-icons';

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
		<HugeiconsIcon icon={ArrowUpDownIcon} size={16} color="currentColor" />
		<span class="text-sm font-medium">{selectedSort}</span>
		<HugeiconsIcon icon={ArrowDown01Icon} size={16} color="currentColor" />
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div class="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
			<div class="p-2">
				{#each sortOptions as option}
					<button
						onclick={() => selectSort(option.label)}
						class="w-full rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 {option.label ===
						selectedSort
							? 'bg-gray-100 font-medium'
							: ''}"
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
