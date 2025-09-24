<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// Redirect to the eksisozluk route
		goto('/eksisozluk');
	});
</script>


	<div class="min-h-screen bg-base-100 flex items-center justify-center">
		<div class="loading loading-spinner loading-lg"></div>
	</div>

