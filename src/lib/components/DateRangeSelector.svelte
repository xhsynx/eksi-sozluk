<script lang="ts">
	import CalendarTodayIcon from '$lib/assets/calendar_today.svg';
	
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
		class="btn w-full justify-start rounded-full border border-primary bg-primary/10 px-4 {height} text-primary shadow-sm hover:bg-primary/20 min-w-0"
	>
	<div class="mr-2 flex-shrink-0">
		<img src={CalendarTodayIcon} alt="Calendar" width="20" height="20" />
	</div>
		<span class="truncate" title="{selectedRange}">{selectedRange}</span>
		<svg class="ml-auto h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div class="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-base-300 bg-base-100 shadow-lg">
			<div class="p-2">
				{#each dateRanges as range}
					<button
						onclick={() => selectRange(range.label)}
						class="w-full rounded-md px-2 py-2 text-left text-sm text-base-content hover:bg-base-200 {range.label ===
						selectedRange
							? 'bg-base-200 font-medium'
							: ''}"
					>
						{range.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
