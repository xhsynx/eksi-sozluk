<script lang="ts">
	import type { PageData } from './$types';
	
	// Use page data from load function instead of $page store to avoid SSR issues
	export let data: PageData;
	
	// Convert route to a readable name
	function getRouteName(slug: string | string[] | undefined): string {
		if (!slug) return 'Unknown';
		if (typeof slug === 'string') {
			return slug.split('/').pop() || slug;
		}
		if (Array.isArray(slug)) {
			return slug[slug.length - 1] || 'Unknown';
		}
		return 'Unknown';
	}
</script>

<div class="p-8">
	<div class="text-center">
		<div class="text-6xl mb-4">🚧</div>
		<h1 class="text-3xl font-bold text-base-content mb-4">{getRouteName(data?.slug)}</h1>
		<p class="text-lg text-base-content/70">This page is under development</p>
	</div>
</div>
