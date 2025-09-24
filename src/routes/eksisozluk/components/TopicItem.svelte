<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Calendar01Icon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		title = '',
		lastUpdate = '',
		entryCount = 0,
		isActive = false,
		onClick = () => {}
	} = $props();

	// Event handler
	function handleClick(event: MouseEvent | KeyboardEvent) {
		onClick();
	}
</script>

<div
	onclick={handleClick}
	onkeydown={(e) => e.key === 'Enter' && handleClick(e)}
	role="button"
	tabindex="0"
	class="flex cursor-pointer items-center justify-between rounded-lg p-3 {isActive 
		? 'border border-primary/20 bg-primary/10' 
		: 'hover:bg-base-200'}"
>
	<div class="flex-1">
		<h4 class="text-sm font-medium text-base-content">{title}</h4>
		<div class="mt-1 flex items-center space-x-1">
			<HugeiconsIcon icon={Calendar01Icon} size={12} color="currentColor" />
			<p class="text-xs text-base-content/70">Son güncelleme: {lastUpdate}</p>
		</div>
	</div>
	<div class="ml-3">
		<span
			class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium {isActive 
				? 'bg-primary text-primary-content' 
				: 'bg-base-300 text-base-content'}"
		>
			{entryCount}
		</span>
	</div>
</div>
