<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Search01Icon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		value = $bindable(''),
		placeholder = 'Ara...',
		width = 'w-80',
		height = 'py-2'
	} = $props();
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
			class="w-full rounded-full border border-gray-200 bg-white px-10 {height} text-gray-700 placeholder-gray-500 shadow-sm focus:border-gray-300 focus:outline-none"
		/>
		<div class="absolute inset-y-0 right-0 flex items-center pr-3">
			<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</div>
	</div>
</div>
