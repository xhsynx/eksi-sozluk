<script lang="ts">
	import SearchIcon from '$lib/assets/search.svg';
	
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
		<img src={SearchIcon} alt="Search" width="20" height="20" />
	</div>
		<input
			type="text"
			bind:value
			{placeholder}
			onclick={handleInputClick}
			onblur={handleInputBlur}
			class="w-full rounded-full border border-base-300 bg-base-100 px-10 {height} text-base-content placeholder-base-content/50 shadow-sm focus:border-base-300 focus:outline-none truncate"
		/>
		<div class="absolute inset-y-0 right-0 flex items-center pr-3">
			<svg class="h-4 w-4 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</div>

		<!-- Dropdown Menu -->
		{#if isOpen}
			<div class="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-base-300 bg-base-100 shadow-lg">
				<div class="p-2">
					<div class="mb-2 flex items-center gap-2 px-2 py-1 text-xs font-medium text-base-content/70">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
							<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="currentColor"/>
						</svg>
						<span>Son Aramalar</span>
					</div>
					{#each recentSearches as search}
						<button
							onclick={() => selectSearch(search)}
							class="w-full rounded-md px-2 py-2 text-left text-sm text-base-content hover:bg-base-200 truncate"
							title="{search}"
						>
							{search}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
