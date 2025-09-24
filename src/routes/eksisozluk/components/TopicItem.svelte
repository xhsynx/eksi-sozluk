<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Calendar01Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		title = '',
		lastUpdate = '',
		entryCount = 0,
		isActive = false,
		onClick = () => {},
		type = 'list' as 'list' | 'detail',
		// Detail type specific props
		content = '',
		author = '',
		likes = 0,
		avatar = '',
		isSelected = false,
		onToggleSelection = () => {}
	} = $props();

	// Event handler
	function handleClick(event: MouseEvent | KeyboardEvent) {
		onClick();
	}

	// Toggle selection for detail type
	function handleToggleSelection(event: MouseEvent) {
		event.stopPropagation();
		onToggleSelection();
	}
</script>

{#if type === 'list'}
	<!-- List Type - Current Topic List View -->
	<div
		onclick={handleClick}
		onkeydown={(e) => e.key === 'Enter' && handleClick(e)}
		role="button"
		tabindex="0"
		class="flex cursor-pointer items-center justify-between rounded-lg p-3 {isActive 
			? 'bg-green-100' 
			: 'hover:bg-base-200'}"
	>
		<div class="flex-1">
			<h4 class="text-sm font-medium {isActive ? 'text-green-800' : 'text-base-content'}">{title}</h4>
			{#if lastUpdate}
				<div class="mt-1 flex items-center space-x-1">
					<HugeiconsIcon icon={Calendar01Icon} size={12} color="currentColor" />
					<p class="text-xs {isActive ? 'text-green-600' : 'text-base-content/70'}">Son güncelleme: {lastUpdate}</p>
				</div>
			{/if}
		</div>
		<div class="ml-3">
			<span
				class="text-sm font-medium {isActive ? 'text-green-800' : 'text-base-content/70'}"
			>
				{entryCount}
			</span>
		</div>
	</div>
{:else if type === 'detail'}
	<!-- Detail Type - Content Details View -->
	<div
		class="rounded-lg border border-base-300 bg-base-100 p-4 {isSelected
			? 'rounded-xl ring-1 ring-blue-500 ring-offset-3 ring-inset'
			: ''}"
	>
		<div class="flex items-start justify-between">
			<!-- Left: Content -->
			<div class="flex-1 pr-4">
				<!-- Content Text -->
				<p class="mb-3 text-sm leading-relaxed text-base-content">
					{content}
				</p>

				<!-- Bottom Row: Like (left) + Author/Time/Avatar/Actions (right) -->
				<div class="flex items-center justify-between">
					<!-- Left: Like Count -->
					<div class="flex items-center space-x-1">
						<svg
							class="h-4 w-4 text-base-content/70"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.764a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
							></path>
						</svg>
						<span class="text-sm font-medium text-base-content/70">{likes}</span>
					</div>

					<!-- Right: Author, Time, Avatar, Actions -->
					<div class="flex items-center space-x-3">
						<!-- Author and Timestamp -->
						<div class="flex flex-col items-center space-x-2">
							<span class="text-sm font-semibold text-base-content">{author}</span>
							<span class="text-xs text-base-content/70">{lastUpdate}</span>
						</div>

						<!-- Avatar -->
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
						>
							<span class="text-sm text-primary-content">{avatar}</span>
						</div>

						<!-- Checkbox -->
						<input
							type="checkbox"
							checked={isSelected}
							onclick={handleToggleSelection}
							class="checkbox checkbox-primary"
						/>

						<!-- Actions -->
						<button class="btn btn-ghost btn-sm" aria-label="More actions">
							<HugeiconsIcon icon={MoreHorizontalIcon} size={16} color="currentColor" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
