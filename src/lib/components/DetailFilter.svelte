<script lang="ts">
	import StrokePartialIcon from '$lib/assets/stroke_partial.svg';
	
	// Props
	let { 
		onClick = () => {},
		text = 'Detaylı Ara',
		width = 'w-auto',
		height = 'h-10'
	} = $props();

	// Event handler
	function handleClick(event: MouseEvent) {
		onClick();
	}
</script>

<button
	onclick={handleClick}
	class="btn rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600 {width} {height} flex items-center justify-center"
>
	<div class="mr-2">
		<img src={StrokePartialIcon} alt="Filter" width="16" height="16" />
	</div>
	{text}
</button>
