<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { MoreVerticalIcon } from '@hugeicons/core-free-icons';
	import ThumbsUpIcon from '$lib/assets/thumb_up.svg';
	import CalendarViewDayIcon from '$lib/assets/calendar_view_day.svg';

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
		<div class="min-w-0 flex-1">
			<h4 class="truncate text-sm font-normal {isActive ? 'text-green-800' : ' '}" {title}>
				{title}
			</h4>
			{#if lastUpdate}
				<div class="mt-1 flex items-center space-x-1">
					<img src={CalendarViewDayIcon} alt="Calendar" width="12" height="12" />
					<p class="truncate text-xs font-normal {isActive ? 'text-green-600' : ' '}">
						Son güncelleme: {lastUpdate}
					</p>
				</div>
			{/if}
		</div>
		<div class="ml-3">
			<span class="text-sm font-normal {isActive ? 'text-green-800' : ' '}">
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
		<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
			<!-- Left: Content -->
			<div class="min-w-0 flex-1">
				<!-- Content Text -->
				<p class="mb-2 overflow-hidden text-sm leading-relaxed font-normal break-words sm:mb-3">
					{content}
				</p>

				<!-- Bottom Row: Like (left) + Author/Time/Avatar/Actions (right) -->
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<!-- Left: Like Count -->
					<div class="flex items-center space-x-1">
						<img src={ThumbsUpIcon} alt="Like" width="14" height="14" />
						<span class="text-xs font-normal sm:text-sm">{likes}</span>
					</div>

					<!-- Right: Author, Time, Avatar, Actions -->
					<div
						class="flex min-w-0 items-center justify-between space-x-2 sm:justify-end sm:space-x-3"
					>
						<!-- Author and Timestamp -->
						<div class="flex min-w-0 flex-col items-start space-x-2 sm:items-center">
							<span
								class="max-w-40 truncate text-xs font-normal sm:max-w-40 sm:text-sm"
								title={author}>{author}</span
							>
							<span class="truncate text-xs font-normal">{lastUpdate}</span>
						</div>

						<!-- Avatar -->
						<div
							class="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-base-200 sm:h-10 sm:w-10"
						>
							{#if avatar && avatar.startsWith('http')}
								<img
									src={avatar}
									alt="{author} avatar"
									class="h-full w-full rounded-full object-cover"
									loading="lazy"
								/>
							{:else}
								<span class="text-xs font-normal text-base-content sm:text-sm">{avatar}</span>
							{/if}
						</div>

						<!-- Checkbox -->
						<input
							type="checkbox"
							checked={isSelected}
							onclick={handleToggleSelection}
							class="checkbox flex-shrink-0 checkbox-sm checkbox-primary sm:checkbox-md"
						/>

						<!-- Actions -->
						<button class="btn flex-shrink-0 btn-ghost btn-xs sm:btn-sm" aria-label="More actions">
							<HugeiconsIcon icon={MoreVerticalIcon} size={14} color="currentColor" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
