<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { RainDropIcon } from '@hugeicons/core-free-icons';
</script>

<div class="container mx-auto p-6">
	<!-- Search and Filter Bar -->
	<div class="mb-8 flex flex-col gap-4 lg:flex-row">
		<!-- Search Bar -->
		<div class="lg:w-80">
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					type="text"
					value="Kemal Kılıçdaroğlu"
					class="input w-full rounded-lg border border-gray-300 bg-white pr-10 pl-10 text-gray-700 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
				/>
				<div class="absolute inset-y-0 right-0 flex items-center pr-3">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</div>
			</div>
		</div>

		<!-- Date Range Selector -->
		<div class="lg:w-48">
			<button
				class="btn w-full justify-start border-purple-500 bg-purple-600 text-white hover:border-purple-600 hover:bg-purple-700"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					></path>
				</svg>
				Son 7 gün
				<svg class="ml-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</button>
		</div>

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Refresh Button -->
		<div class="lg:w-auto">
			<button
				class="btn rounded-full border-gray-300 bg-gray-200 px-6 text-gray-700 hover:border-gray-400 hover:bg-gray-300"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					></path>
				</svg>
				Yenile
				<div class="ml-2 border-l border-gray-400 pl-2">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</div>
			</button>
		</div>
	</div>

	<!-- Ekşi Sözlük Header Card -->
	<div class="mb-6 rounded-lg border border-base-300 bg-base-200 p-6 shadow-sm">
		<!-- Title Section -->
		<div class="mb-4 flex items-center gap-3">
			<HugeiconsIcon icon={RainDropIcon} size={30} color="gray" />

			<h1 class="text-2xl font-bold text-base-content">Ekşi Sözlük</h1>
		</div>

		<!-- Action Buttons Section -->
		<div class="flex items-center justify-between">
			<!-- Left side: Action buttons -->
			<div class="flex items-center gap-4">
				<!-- Detaylı Ara Button -->
				<button class="btn rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600">
					<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
						></path>
					</svg>
					Detaylı Ara
				</button>

				<!-- Sort Dropdown -->
				<button
					class="hover:bg-primary-focus btn rounded-full bg-primary px-6 text-primary-content"
				>
					<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
						></path>
					</svg>
					En yeniye göre sırala
					<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
			</div>

			<!-- Right side: Temizle button -->
			<button class="font-medium text-base-content/70 hover:text-base-content"> Temizle </button>
		</div>
	</div>

	<!-- Content Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Başlık 1</h2>
				<p>Bu bir örnek içerik kartıdır.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Detay</button>
				</div>
			</div>
		</div>
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Başlık 2</h2>
				<p>Bu da başka bir örnek içerik kartıdır.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Detay</button>
				</div>
			</div>
		</div>
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Başlık 3</h2>
				<p>Üçüncü örnek içerik kartı.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Detay</button>
				</div>
			</div>
		</div>
	</div>
</div>
