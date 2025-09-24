<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		RainDropIcon,
		Analytics01Icon,
		DownloadIcon,
		Menu09Icon,
		MoreHorizontalIcon,
		User02Icon,
		Chart01Icon
	} from '@hugeicons/core-free-icons';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import DateRangeSelector from '$lib/components/DateRangeSelector.svelte';
	import RefreshButton from '$lib/components/RefreshButton.svelte';
	import DetailFilter from '$lib/components/DetailFilter.svelte';
	import SortSelector from '$lib/components/SortSelector.svelte';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	// Search state
	let searchValue = $state('Kemal Kılıçdaroğlu');

	// Date range state
	let selectedDateRange = $state('Son 7 gün');

	// Refresh function
	function handleRefresh() {
		console.log('Refreshing data...');
		// Add your refresh logic here
	}

	// Detail filter function
	function handleDetailFilter() {
		console.log('Opening detail filter...');
		// Add your detail filter logic here
	}

	// Sort state
	let selectedSort = $state('En yeniye göre sırala');

	// Selection state
	let selectedItems = $state(new Set<number>());

	function toggleSelection(index: number) {
		selectedItems = new Set(selectedItems);
		if (selectedItems.has(index)) {
			selectedItems.delete(index);
		} else {
			selectedItems.add(index);
		}
	}

	// Tab state
	let activeTab = $state('contents');

	// Chart refs
	let chartCanvas = $state<HTMLCanvasElement | undefined>(undefined);
	let chartInstance: Chart | null = null;

	// Initialize Chart.js
	onMount(() => {
		Chart.register(...registerables);
	});

	// Chart data
	const chartData = {
		labels: ['19 Tem', '24 Tem', '29 Tem', '03 Ağu', '08 Ağu'],
		datasets: [
			{
				label: 'Entry',
				data: [20, 35, 45, 60, 55],
				borderColor: '#10b981',
				backgroundColor: '#10b981',
				tension: 0.4
			},
			{
				label: 'Yazar',
				data: [50, 35, 40, 35, 40],
				borderColor: '#3b82f6',
				backgroundColor: '#3b82f6',
				tension: 0.4
			}
		]
	};

	// Popular authors data
	const popularAuthors = [
		{ name: 'Paula Mora', entries: 1317 },
		{ name: 'Eddie Lake', entries: 743 },
		{ name: 'Chris Glasser', entries: 720 },
		{ name: 'Autumn Phillips', entries: 708 },
		{ name: 'John Dukes', entries: 695 },
		{ name: 'Frances Swann', entries: 596 },
		{ name: 'Lorri Warf', entries: 576 }
	];

	// KPI data
	const kpiData = [
		{ label: 'Yazar', value: '31.2K', icon: User02Icon, color: 'bg-blue-100' },
		{ label: 'Entry', value: '35.8K', icon: Analytics01Icon, color: 'bg-yellow-100' },
		{ label: 'Favori', value: '52.6K', icon: Analytics01Icon, color: 'bg-green-100' },
		{ label: 'Başlık', value: '8.2K', icon: Analytics01Icon, color: 'bg-pink-100' }
	];

	// Create chart when tab changes to analytics
	$effect(() => {
		if (activeTab === 'analytics' && chartCanvas) {
			// Destroy existing chart
			if (chartInstance) {
				chartInstance.destroy();
			}

			// Create new chart
			chartInstance = new Chart(chartCanvas, {
				type: 'line',
				data: chartData,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							position: 'top',
							labels: {
								usePointStyle: true,
								padding: 20
							}
						}
					},
					scales: {
						y: {
							beginAtZero: true,
							max: 80,
							ticks: {
								stepSize: 20
							}
						}
					}
				}
			});
		}
	});
</script>

<div class="container mx-auto p-6">
	<!-- Search and Filter Bar -->
	<div class="mb-8 flex items-center gap-4">
		<!-- Search Bar -->
		<SearchBar bind:value={searchValue} />

		<!-- Date Range Selector -->
		<DateRangeSelector bind:selectedRange={selectedDateRange} />

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Refresh Button -->
		<RefreshButton onClick={handleRefresh} />
	</div>

	<!-- Ekşi Sözlük Header Card -->
	<div class="mb-6 rounded-lg border border-base-300 bg-base-200 p-6 shadow-sm">
		<!-- Title Section -->
		<div class="mb-4 flex items-center gap-3">
			<HugeiconsIcon icon={RainDropIcon} size={30} color="gray" />

			<h1 class="text-2xl font-bold text-base-content">Ekşi Sözlük</h1>
		</div>

		<!-- Selection Info (only show when items are selected) -->
		{#if selectedItems.size > 0}
			<div class="mb-4 flex items-center gap-4">
				<!-- Selection Info -->
				<div class="flex items-center gap-3">
					<span class="text-sm text-base-content/70">{selectedItems.size} entry seçildi</span>
					<button
						onclick={() => (selectedItems = new Set())}
						class="text-sm text-blue-600 underline hover:text-blue-800"
					>
						Seçimi Temizle
					</button>
				</div>

				<!-- Action Buttons for Selected Items - All aligned to left -->
				<div class="flex items-center gap-3">
					<!-- Engelle Button -->
					<button class="btn rounded-full bg-gray-200 px-4 text-gray-700 btn-sm hover:bg-gray-300">
						<svg
							class="mr-2 h-4 w-4 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
						<span class="text-red-600">Engelle</span>
					</button>

					<!-- Sil Button -->
					<button class="btn rounded-full bg-red-500 px-4 text-white btn-sm hover:bg-red-600">
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							></path>
						</svg>
						Sil
					</button>
				</div>
			</div>
		{:else}
			<!-- Action Buttons Section (only show when no items selected) -->
			<div class="flex items-center justify-between">
				<!-- Left side: Action buttons -->
				<div class="flex items-center gap-4">
					<!-- Detaylı Ara Button -->
					<DetailFilter onClick={handleDetailFilter} />

					<!-- Sort Dropdown -->
					<SortSelector bind:selectedSort={selectedSort} />
				</div>

				<!-- Right side: Temizle button -->
				<button class="font-medium text-base-content/70 hover:text-base-content"> Temizle </button>
			</div>
		{/if}
	</div>

	<!-- Tab Navigation -->
	<div class="mb-6">
		<div
			class="flex items-center justify-between rounded-lg border border-base-300 bg-base-100 p-2"
		>
			<!-- Left Half: İçerikler Tab -->
			<div class="flex flex-1 justify-center">
				<div role="tablist" class="tabs-lift tabs w-full">
					<button
						role="tab"
						class="tab flex w-full items-center justify-center space-x-3 px-8 py-4 text-lg {activeTab ===
						'contents'
							? 'tab-active'
							: ''}"
						onclick={() => (activeTab = 'contents')}
					>
						<HugeiconsIcon
							icon={Menu09Icon}
							size={24}
							color={activeTab === 'contents' ? 'blue' : 'gray'}
						/>
						<span class="font-medium">İçerikler</span>
					</button>
				</div>
			</div>

			<!-- Right Half: Analitik Tab -->
			<div class="flex flex-1 justify-center">
				<div role="tablist" class="tabs-lift tabs w-full">
					<button
						role="tab"
						class="tab flex w-full items-center justify-center space-x-3 px-8 py-4 text-lg {activeTab ===
						'analytics'
							? 'tab-active'
							: ''}"
						onclick={() => (activeTab = 'analytics')}
					>
						<HugeiconsIcon
							icon={Analytics01Icon}
							size={24}
							color={activeTab === 'analytics' ? 'blue' : 'gray'}
						/>
						<span class="font-medium">Analitik</span>
					</button>
				</div>
			</div>

			<!-- Download Button - Far Right -->
			<button class="btn rounded-md btn-ghost btn-lg" aria-label="Download">
				<HugeiconsIcon icon={DownloadIcon} size={20} color="gray" />
			</button>
		</div>
	</div>

	<!-- Content Area -->
	{#if activeTab === 'contents'}
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<!-- Left Column - Topics List -->
			<div class="space-y-3">
				<div class="card border border-base-300 bg-base-100 shadow-sm">
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
				<div class="card border border-base-300 bg-base-100 shadow-sm">
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
									<button
										class="p-1 text-base-content/70 hover:text-base-content"
										aria-label="Next"
									>
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
								<div
									class="rounded-lg border border-base-300 bg-base-100 p-4 {selectedItems.has(i)
										? 'rounded-xl ring-1 ring-blue-500 ring-offset-3 ring-inset'
										: ''}"
								>
									<div class="flex items-start justify-between">
										<!-- Left: Content -->
										<div class="flex-1 pr-4">
											<!-- Content Text -->
											<p class="mb-3 text-sm leading-relaxed text-base-content">
												kemal kılıçdaroğlu uğur dündar'a "kepaze" demiş, uğur dündar da ona
												"haklısın senin gibi birisini yıllarca desteklemek kepazalikmiş" şeklinde
												cevap vermiş.
											</p>

											<!-- Bottom Row: Like (left) + Author/Time/Avatar/Actions (right) -->
											<div class="flex items-center justify-between">
												<!-- Left: Like Count -->
												<div class="flex items-center space-x-1">
													<svg
														class="h-4 w-4 text-base-content/70"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.764a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
														></path>
													</svg>
													<span class="text-sm font-medium text-base-content/70">1.2K</span>
												</div>

												<!-- Right: Author, Time, Avatar, Actions -->
												<div class="flex items-center space-x-3">
													<!-- Author and Timestamp -->
													<div class="flex flex-col items-center space-x-2">
														<span class="text-sm font-semibold text-base-content">scandsucker</span>
														<span class="text-xs text-base-content/70">22 Tem, 10:00</span>
													</div>

													<!-- Avatar -->
													<div
														class="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
													>
														<span class="text-sm text-primary-content">🌙</span>
													</div>

													<!-- Checkbox -->
													<input
														type="checkbox"
														checked={selectedItems.has(i)}
														onclick={() => toggleSelection(i)}
														class="checkbox checkbox-primary"
													/>

													<!-- Action Icons -->
													<div class="flex items-center space-x-1">
														<button
															class="p-1 text-base-content/70 hover:text-base-content"
															aria-label="More options"
														>
															<HugeiconsIcon
																icon={MoreHorizontalIcon}
																size={16}
																color="currentColor"
															/>
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
	{:else if activeTab === 'analytics'}
		<!-- Analytics Content -->
		<div class="space-y-6">
			<!-- KPI Cards -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{#each kpiData as kpi}
					<div class="card border border-base-300 bg-white shadow-sm">
						<div class="card-body p-4">
							<div class="flex items-center">
								<div class="rounded-lg p-3 {kpi.color}">
									<HugeiconsIcon icon={kpi.icon} size={24} color="currentColor" />
								</div>
								<div class="px-4">
									<p class="text-sm font-medium text-base-content/70">{kpi.label}</p>
									<p class="text-2xl font-bold text-base-content">{kpi.value}</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Main Content - Single Column -->
			<div class="space-y-6">
				<!-- Genel Section -->
				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<h3 class="text-lg font-semibold text-base-content">Genel</h3>
						<div class="h-px flex-1 bg-base-300"></div>
					</div>

					<!-- Statistics Chart Card -->
					<div class="card border border-base-300 bg-white shadow-sm">
						<div class="card-body p-6">
							<div class="mb-4 flex items-center justify-between">
								<div>
									<h4 class="text-base font-medium text-base-content">Ekşi Sözlük İstatistikleri</h4>
									<p class="text-sm text-base-content/70">Tarihe göre entry ve yazar dağılımları</p>
								</div>
								
								<!-- Button Groups -->
								<div class="flex items-center gap-2">
									<!-- Chart Type Buttons -->
									<div class="flex items-center rounded-lg border border-base-300 bg-white p-1">
										<button class="btn btn-sm btn-ghost rounded-md">
											<HugeiconsIcon icon={Chart01Icon} size={16} color="gray" />
										</button>
										<button class="btn btn-sm btn-primary rounded-md">
											<HugeiconsIcon icon={Chart01Icon} size={16} color="white" />
										</button>
									</div>
									
									<!-- Download Button -->
									<button class="btn btn-sm btn-ghost rounded-md" aria-label="Download">
										<HugeiconsIcon icon={DownloadIcon} size={16} color="gray" />
									</button>
								</div>
							</div>
							<div class="h-80">
								<canvas bind:this={chartCanvas}></canvas>
							</div>
						</div>
					</div>
				</div>

				<!-- Yazarlar Section -->
				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<h3 class="text-lg font-semibold text-base-content">Yazarlar</h3>
						<div class="h-px flex-1 bg-base-300"></div>
					</div>

					<!-- Popular Authors Card -->
					<div class="card border border-base-300 bg-white shadow-sm">
						<div class="card-body p-6">
							<div class="mb-4">
								<h4 class="text-base font-medium text-base-content">En Popüler Yazarlar</h4>
							</div>
							<div class="space-y-3">
								{#each popularAuthors as author, index}
									<div class="flex items-center justify-between rounded-lg p-3 hover:bg-base-100">
										<div class="flex items-center space-x-3">
											<div
												class="flex h-8 w-8 items-center justify-center rounded-full bg-base-200 text-sm font-medium text-base-content"
											>
												{index + 1}
											</div>
											<span class="font-medium text-base-content">{author.name}</span>
										</div>
										<div
											class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
										>
											{author.entries} entry
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
