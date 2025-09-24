<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		RainDropIcon,
		Analytics01Icon,
		DownloadIcon,
		Menu09Icon,
		MoreHorizontalIcon
	} from '@hugeicons/core-free-icons';
</script>

<div class="container mx-auto p-6" style="background-color: #F4F4F5; min-height: 100vh;">
	<!-- Search and Filter Bar -->
	<div class="mb-8 flex items-center gap-4">
		<!-- Search Bar -->
		<div class="w-80">
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
					class="w-full rounded-full border border-gray-200 bg-white px-10 py-2 text-gray-700 placeholder-gray-500 shadow-sm focus:border-gray-300 focus:outline-none"
				/>
				<div class="absolute inset-y-0 right-0 flex items-center pr-3">
					<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</div>
			</div>
		</div>

		<!-- Date Range Selector -->
		<div class="w-48">
			<button
				class="btn w-full justify-start rounded-full border border-blue-300 bg-blue-100 px-4 py-3 text-blue-700 shadow-sm hover:bg-blue-200"
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

	<!-- Tab Navigation -->
	<div class="mb-6">
		<div
			class="flex items-center justify-between rounded-lg border border-base-300 bg-base-100 p-1"
		>
			<!-- Left Half: İçerikler Tab -->
			<div class="flex flex-1 justify-center">
				<div role="tablist" class="tabs-lift tabs">
					<button role="tab" class="tab-active tab flex items-center space-x-2">
						<HugeiconsIcon icon={Menu09Icon} size={30} color="blue" />
						<span>İçerikler</span>
					</button>
				</div>
			</div>

			<!-- Right Half: Analitik Tab -->
			<div class="flex flex-1 justify-center">
				<div role="tablist" class="tabs-lift tabs">
					<button role="tab" class="tab flex items-center space-x-2">
						<HugeiconsIcon icon={Analytics01Icon} size={30} color="blue" />
						<span>Analitik</span>
					</button>
				</div>
			</div>

			<!-- Download Button - Far Right -->
			<button class="btn rounded-md btn-ghost btn-sm" aria-label="Download">
				<HugeiconsIcon icon={DownloadIcon} size={16} color="gray" />
			</button>
		</div>
	</div>

	<!-- Content Area -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- Left Column - Topics List -->
		<div class="space-y-3">
			<div class="card border border-base-300 bg-base-100 shadow-sm ">
				<div class="card-body p-4">
					<!-- Header with Pagination -->
					<div class="mb-3 flex items-center justify-between border-b border-base-300 pb-3">
						<!-- Left: Title and Pagination -->
						<div class="flex items-center space-x-4">
							<h3 class="font-semibold text-base-content">Başlıklar</h3>
							<span class="text-sm text-base-content/70">1 / 47</span>
						</div>

						<!-- Right: Navigation -->
						<div class="flex items-center space-x-1">
							<button
								class="p-1 text-base-content/70 hover:text-base-content"
								aria-label="Previous"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 19l-7-7 7-7"
									></path>
								</svg>
							</button>
							<button class="p-1 text-base-content/70 hover:text-base-content" aria-label="Next">
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									></path>
								</svg>
							</button>
						</div>
					</div>

					<!-- Topics List -->
					<div class="space-y-2">
						<!-- Active Topic -->
						<div
							class="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/10 p-3"
						>
							<div class="flex-1">
								<h4 class="text-sm font-medium text-base-content">
									uğur dündar kemal kılıçdaroğlu kavgası
								</h4>
								<p class="mt-1 text-xs text-base-content/70">Son güncelleme: 22 Tem, 10:30</p>
							</div>
							<div class="ml-3">
								<span
									class="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-content"
								>
									4
								</span>
							</div>
						</div>

						<!-- Other Topics -->
						<div
							class="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-base-200"
						>
							<div class="flex-1">
								<h4 class="text-sm font-medium text-base-content">jahrein</h4>
								<p class="mt-1 text-xs text-base-content/70">Son güncelleme: 21 Tem, 15:45</p>
							</div>
							<div class="ml-3">
								<span
									class="inline-flex items-center rounded-full bg-base-300 px-2 py-1 text-xs font-medium text-base-content"
								>
									49
								</span>
							</div>
						</div>

						<div
							class="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-base-200"
						>
							<div class="flex-1">
								<h4 class="text-sm font-medium text-base-content">muharrem ince</h4>
								<p class="mt-1 text-xs text-base-content/70">Son güncelleme: 21 Tem, 12:20</p>
							</div>
							<div class="ml-3">
								<span
									class="inline-flex items-center rounded-full bg-base-300 px-2 py-1 text-xs font-medium text-base-content"
								>
									251
								</span>
							</div>
						</div>

						<div
							class="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-base-200"
						>
							<div class="flex-1">
								<h4 class="text-sm font-medium text-base-content">özgür özel</h4>
								<p class="mt-1 text-xs text-base-content/70">Son güncelleme: 20 Tem, 18:15</p>
							</div>
							<div class="ml-3">
								<span
									class="inline-flex items-center rounded-full bg-base-300 px-2 py-1 text-xs font-medium text-base-content"
								>
									1.187
								</span>
							</div>
						</div>

						<div
							class="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-base-200"
						>
							<div class="flex-1">
								<h4 class="text-sm font-medium text-base-content">kemal kılıçdaroğlu</h4>
								<p class="mt-1 text-xs text-base-content/70">Son güncelleme: 20 Tem, 14:30</p>
							</div>
							<div class="ml-3">
								<span
									class="inline-flex items-center rounded-full bg-base-300 px-2 py-1 text-xs font-medium text-base-content"
								>
									9.881
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column - Content Details -->
		<div class="space-y-4">
			<div class="card border border-base-300 bg-base-100 shadow-sm ">
				<div class="card-body p-4">
					<!-- Header with Pagination -->
					<div class="mb-4 flex items-center justify-between border-b border-base-300 pb-3">
						<!-- Left: Title -->
						<div>
							<h3 class="text-lg font-semibold text-base-content">
								uğur dündar kemal kılıçdaroğlu kavgası
							</h3>
							<p class="text-sm text-base-content/70">Bu başlık altındaki son içerikler</p>
						</div>

						<!-- Right: Pagination and Navigation -->
						<div class="flex items-center space-x-3">
							<!-- Pagination -->
							<span class="text-sm text-base-content/70">1 / 20</span>

							<!-- Navigation -->
							<div class="flex items-center space-x-1">
								<button
									class="p-1 text-base-content/70 hover:text-base-content"
									aria-label="Previous"
								>
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 19l-7-7 7-7"
										></path>
									</svg>
								</button>
								<button class="p-1 text-base-content/70 hover:text-base-content" aria-label="Next">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5l7 7-7 7"
										></path>
									</svg>
								</button>
							</div>
						</div>
					</div>

					<!-- Content Entries - Scrollable -->
					<div class="max-h-100 space-y-4 overflow-y-auto pr-2">
						{#each Array(5) as _, i}
							<div class="rounded-lg border border-base-300 bg-base-100 p-4">
								<div class="flex items-start justify-between">
									<!-- Left: Content -->
									<div class="flex-1 pr-4">
										<!-- Content Text -->
										<p class="mb-3 text-sm leading-relaxed text-base-content">
											kemal kılıçdaroğlu uğur dündar'a "kepaze" demiş, uğur dündar da ona "haklısın
											senin gibi birisini yıllarca desteklemek kepazalikmiş" şeklinde cevap vermiş.
										</p>

										<!-- Bottom Row: Like (left) + Author/Time/Avatar/Actions (right) -->
										<div class="flex items-center justify-between">
											<!-- Left: Like Count -->
											<div class="flex items-center space-x-1">
												<svg class="h-4 w-4 text-base-content/70" fill="currentColor" viewBox="0 0 20 20">
													<path
														d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.764a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
													></path>
												</svg>
												<span class="text-sm font-medium text-base-content/70">1.2K</span>
											</div>

											<!-- Right: Author, Time, Avatar, Actions -->
											<div class="flex items-center space-x-3">
												<!-- Author and Timestamp -->
												<div class="flex items-center space-x-2">
													<span class="text-sm font-semibold text-base-content">scandsucker</span>
													<span class="text-xs text-base-content/70">22 Tem, 10:00</span>
												</div>

												<!-- Avatar -->
												<div
													class="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
												>
													<span class="text-sm text-primary-content">🌙</span>
												</div>

												<!-- Action Icons -->
												<div class="flex items-center space-x-1">
													<button
														class="p-1 text-base-content/70 hover:text-base-content"
														aria-label="More options"
													>
														<HugeiconsIcon icon={MoreHorizontalIcon} size={16} color="currentColor" />
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
