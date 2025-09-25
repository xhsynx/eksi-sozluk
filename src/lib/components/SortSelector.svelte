<script lang="ts">
	import SwapVertIcon from '$lib/assets/swap_vert.svg';
	
	// Props
	let { 
		selectedSort = $bindable('En yeniye göre sırala'),
		width = 'w-auto',
		height = 'h-10'
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
		class="flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-4 text-primary hover:bg-primary/20 transition-colors {height} justify-center min-w-0"
	>
	<img src={SwapVertIcon} alt="Sort" width="16" height="16" />
		<span class="text-sm font-medium truncate max-w-32 sm:max-w-none" title="{selectedSort}">{selectedSort}</span>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div class="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-base-300 bg-base-100 shadow-lg">
			<div class="p-2">
				{#each sortOptions as option}
					<button
						onclick={() => selectSort(option.label)}
						class="w-full rounded-md px-2 py-2 text-left text-sm text-base-content hover:bg-base-200 truncate {option.label ===
						selectedSort
							? 'bg-base-200 font-medium'
							: ''}"
						title="{option.label}"
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
