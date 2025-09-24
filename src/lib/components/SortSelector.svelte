<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Sorting01Icon } from '@hugeicons/core-free-icons';

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
		class="hover:bg-primary-focus btn rounded-full bg-primary px-6 text-primary-content {height}"
	>
		<div class="mr-2">
			<HugeiconsIcon icon={Sorting01Icon} size={16} color="currentColor" />
		</div>
		{selectedSort}
		<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
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
