<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageLoad } from './$types';

	// Server-side redirect - better for SEO and avoids SSR issues
	export const load: PageLoad = () => {
		throw redirect(302, '/eksisozluk');
	};
</script>

