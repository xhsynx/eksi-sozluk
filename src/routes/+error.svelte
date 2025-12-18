<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	// Set error message based on the error
	let errorMessage = $derived(() => {
		if ($page.error) {
			return 'This page is under development';
		}
		return 'This page is under development';
	});

	function goBack() {
		if (browser) {
			window.history.back();
		}
	}

	function goHome() {
		if (browser) {
			window.location.href = '/';
		}
	}
</script>

<div class="min-h-screen bg-base-100 flex items-center justify-center">
	<div class="text-center">
		<div class="mb-8">
			<div class="text-6xl mb-4">🚧</div>
			<h1 class="text-4xl font-bold text-base-content mb-4">Under Development</h1>
			<p class="text-lg text-base-content/70 mb-8">{errorMessage}</p>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<button 
				class="btn btn-primary"
				onclick={goBack}
			>
				Go Back
			</button>
			<button 
				class="btn btn-outline"
				onclick={goHome}
			>
				Go Home
			</button>
		</div>
	</div>
</div>
