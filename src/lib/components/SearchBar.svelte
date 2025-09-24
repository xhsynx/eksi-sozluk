<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Search01Icon, Clock01Icon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		value = $bindable(''),
		placeholder = 'Ara...',
		width = 'w-80',
		height = 'py-2'
	} = $props();

	// Internal state
	let isOpen = $state(false);

	// Recent searches (mock data)
	const recentSearches = [
		'Kemal Kılıçdaroğlu',
		'Ekonomi',
		'Teknoloji',
		'Spor',
		'Eğitim'
	];

	// Handle search selection
	function selectSearch(searchTerm: string) {
		value = searchTerm;
		isOpen = false;
	}

	// Handle input click
	function handleInputClick() {
		isOpen = true;
	}

	// Handle input blur with delay to allow clicking on dropdown
	function handleInputBlur() {
		setTimeout(() => {
			isOpen = false;
		}, 200);
	}
</script>

<div class="{width}">
	<div class="relative">
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<HugeiconsIcon icon={Search01Icon} size={20} color="gray" />
		</div>
		<input
			type="text"
			bind:value
			{placeholder}
			onclick={handleInputClick}
			onblur={handleInputBlur}
			class="w-full rounded-full border border-gray-200 bg-white px-10 {height} text-base-400 placeholder-gray-500 shadow-sm focus:border-gray-300 focus:outline-none"
		/>
		<div class="absolute inset-y-0 right-0 flex items-center pr-3">
			<svg class="h-4 w-4 text-base-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</div>

		<!-- Dropdown Menu -->
		{#if isOpen}
			<div class="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
				<div class="p-2">
					<div class="mb-2 flex items-center gap-2 px-2 py-1 text-xs font-medium text-base-400">
						<HugeiconsIcon icon={Clock01Icon} size={14} color="currentColor" />
						<span>Son Aramalar</span>
					</div>
					{#each recentSearches as search}
						<button
							onclick={() => selectSearch(search)}
							class="w-full rounded-md px-2 py-2 text-left text-sm text-base-400 hover:bg-base-200"
						>
							{search}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
