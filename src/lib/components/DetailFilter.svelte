<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { FilterIcon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		onClick = () => {},
		text = 'Detaylı Ara',
		width = 'w-auto',
		height = 'py-3'
	} = $props();

	// Event handler
	function handleClick(event: MouseEvent) {
		onClick();
	}
</script>

<button
	onclick={handleClick}
	class="btn rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600 {width} {height}"
>
	<div class="mr-2">
		<HugeiconsIcon icon={FilterIcon} size={16} color="white" />
	</div>
	{text}
</button>
