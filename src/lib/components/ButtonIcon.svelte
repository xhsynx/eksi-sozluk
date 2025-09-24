<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';

	// Props
	let { 
		icon = undefined,
		text = '',
		onClick = () => {},
		variant = 'default' as 'default' | 'danger' | 'warning' | 'success',
		size = 'sm' as 'xs' | 'sm' | 'md' | 'lg',
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

	// Variant styles
	const variantStyles = {
		default: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
		danger: 'bg-red-500 text-white hover:bg-red-600',
		warning: 'bg-orange-500 text-white hover:bg-orange-600',
		success: 'bg-green-500 text-white hover:bg-green-600'
	};

	// Size styles
	const sizeStyles = {
		xs: 'px-2 py-1 text-xs',
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};

	// Icon sizes
	const iconSizes = {
		xs: 12,
		sm: 16,
		md: 20,
		lg: 24
	};
</script>

<button
	onclick={handleClick}
	disabled={disabled || loading}
	class="btn rounded-full {variantStyles[variant]} {sizeStyles[size]} {disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} {type === 'text' ? 'btn-ghost' : ''}"
>
	{#if loading}
		<div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
	{:else if icon && type === 'button'}
		<div class="mr-2">
			<HugeiconsIcon icon={icon} size={iconSizes[size]} color="currentColor" />
		</div>
	{/if}
	
	{#if text}
		<span>{text}</span>
	{/if}
</button>
