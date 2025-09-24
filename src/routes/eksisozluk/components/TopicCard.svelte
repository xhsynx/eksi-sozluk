<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

	// Props
	let { 
		title = 'Başlıklar',
		currentPage = 1,
		totalPages = 47,
		onPrevious = () => {},
		onNext = () => {},
		children
	} = $props();

	// Event handlers
	function handlePrevious(event: MouseEvent) {
		onPrevious();
	}

	function handleNext(event: MouseEvent) {
		onNext();
	}
</script>

<div class="card border border-base-300 bg-base-100 shadow-sm">
	<div class="card-body p-4">
		<!-- Header with Pagination -->
		<div class="mb-3 flex items-center justify-between border-b border-base-300 pb-3">
			<!-- Left: Title and Pagination -->
			<div class="flex items-center space-x-4">
				<h3 class="font-semibold text-base-content">{title}</h3>
				<span class="text-sm text-base-content/70">{currentPage} / {totalPages}</span>
			</div>

			<!-- Right: Navigation -->
			<div class="flex items-center space-x-1">
				<button
					onclick={handlePrevious}
					class="p-1 text-base-content/70 hover:text-base-content"
					aria-label="Previous"
				>
					<HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" />
				</button>
				<button 
					onclick={handleNext}
					class="p-1 text-base-content/70 hover:text-base-content" 
					aria-label="Next"
				>
					<HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" />
				</button>
			</div>
		</div>

		<!-- Topics List - Scrollable -->
		<div class="h-96 space-y-2 overflow-y-auto pr-2">
			{@render children?.()}
		</div>
	</div>
</div>
