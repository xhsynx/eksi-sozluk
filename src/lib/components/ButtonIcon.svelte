<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';

	// Props
	let { 
		icon = undefined,
		text = '',
		onClick = () => {},
		class: className = '',
		disabled = false,
		loading = false,
		type = 'button' as 'button' | 'text'
	} = $props();

	// Event handler
	function handleClick(event: MouseEvent) {
		if (!disabled && !loading) {
			onClick();
		}
	}
</script>

<button
	onclick={handleClick}
	disabled={disabled || loading}
	class="{className} {disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} {type === 'text' ? 'btn-ghost' : ''}"
>
	{#if loading}
		<div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
	{:else if icon && type === 'button'}
		<div class="mr-2">
			<HugeiconsIcon icon={icon} size={16} color="currentColor" />
		</div>
	{/if}
	
	{#if text}
		<span>{text}</span>
	{/if}
</button>
