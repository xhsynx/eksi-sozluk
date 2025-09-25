<script lang="ts">
	import { page } from '$app/stores';
	
	// Get the route name from the URL
	let routeName = $derived($page.params.slug);
	
	// Convert route to a readable name
	function getRouteName(slug: string): string {
		if (typeof slug === 'string') {
			return slug.split('/').pop() || slug;
		}
		return 'Unknown';
	}
</script>

<div class="p-8">
	<div class="text-center">
		<div class="text-6xl mb-4">🚧</div>
		<h1 class="text-3xl font-bold text-base-content mb-4">{getRouteName(routeName)}</h1>
		<p class="text-lg text-base-content/70">This page is under development</p>
	</div>
</div>
