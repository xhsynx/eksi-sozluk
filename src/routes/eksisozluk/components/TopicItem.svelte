<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Calendar01Icon, MoreVerticalIcon, ThumbsUpIcon } from '@hugeicons/core-free-icons';

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
		<div class="flex-1 min-w-0">
			<h4 class="text-sm font-normal truncate {isActive ? 'text-green-800' : ' '}" title="{title}">{title}</h4>
			{#if lastUpdate}
				<div class="mt-1 flex items-center space-x-1">
					<HugeiconsIcon icon={Calendar01Icon} size={12} color="currentColor" />
					<p class="text-xs font-normal truncate {isActive ? 'text-green-600' : ' '}">Son güncelleme: {lastUpdate}</p>
				</div>
			{/if}
		</div>
		<div class="ml-3">
			<span
				class="text-sm font-normal {isActive ? 'text-green-800' : ' '}"
			>
				{entryCount}
			</span>
		</div>
	</div>
{:else if type === 'detail'}
	<!-- Detail Type - Content Details View -->
	<div
		class="rounded-lg border border-base-300 bg-base-100 p-3 sm:p-4 {isSelected
			? 'rounded-xl ring-1 ring-blue-500 ring-offset-3 ring-inset'
			: ''}"
	>
		<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
			<!-- Left: Content -->
			<div class="flex-1 min-w-0">
				<!-- Content Text -->
				<p class="mb-2 sm:mb-3 text-sm font-normal leading-relaxed break-words overflow-hidden">
					{content}
				</p>

				<!-- Bottom Row: Like (left) + Author/Time/Avatar/Actions (right) -->
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					<!-- Left: Like Count -->
					<div class="flex items-center space-x-1">
						<HugeiconsIcon icon={ThumbsUpIcon} size={14} color="currentColor" class="sm:w-4 sm:h-4" />
						<span class="text-xs sm:text-sm font-normal">{likes}</span>
					</div>

					<!-- Right: Author, Time, Avatar, Actions -->
					<div class="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3 min-w-0">
						<!-- Author and Timestamp -->
						<div class="flex flex-col items-start sm:items-center space-x-2 min-w-0">
							<span class="text-xs sm:text-sm font-normal truncate max-w-20 sm:max-w-16" title="{author}">{author}</span>
							<span class="text-xs font-normal truncate">{lastUpdate}</span>
						</div>

						<!-- Avatar -->
						<div
							class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary flex-shrink-0"
						>
							<span class="text-xs sm:text-sm font-normal text-primary-content">{avatar}</span>
						</div>

						<!-- Checkbox -->
						<input
							type="checkbox"
							checked={isSelected}
							onclick={handleToggleSelection}
							class="checkbox checkbox-primary checkbox-sm sm:checkbox-md flex-shrink-0"
						/>

						<!-- Actions -->
						<button class="btn btn-ghost btn-xs sm:btn-sm flex-shrink-0" aria-label="More actions">
							<HugeiconsIcon icon={MoreVerticalIcon} size={14} color="currentColor" class="sm:w-4 sm:h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
