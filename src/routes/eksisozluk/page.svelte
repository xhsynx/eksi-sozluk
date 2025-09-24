<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		RainDropIcon,
		Analytics01Icon,
		DownloadIcon,
		Menu09Icon,
		MoreHorizontalIcon,
		User02Icon,
		Chart01Icon,
		LockIcon,
		Delete01Icon
	} from '@hugeicons/core-free-icons';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import DateRangeSelector from '$lib/components/DateRangeSelector.svelte';
	import RefreshButton from '$lib/components/RefreshButton.svelte';
	import DetailFilter from '$lib/components/DetailFilter.svelte';
	import SortSelector from '$lib/components/SortSelector.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import TopicCard from './components/TopicCard.svelte';
	import TopicItem from './components/TopicItem.svelte';
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

	// Topic data
	const topics = [
		{
			id: 1,
			title: 'uğur dündar kemal kılıçdaroğlu kavgası',
			lastUpdate: '22 Tem, 10:30',
			entryCount: 4,
			isActive: true
		},
		{ id: 2, title: 'jahrein', lastUpdate: '21 Tem, 15:45', entryCount: 49, isActive: false },
		{
			id: 3,
			title: 'muharrem ince',
			lastUpdate: '21 Tem, 12:20',
			entryCount: 251,
			isActive: false
		},
		{ id: 4, title: 'özgür özel', lastUpdate: '20 Tem, 18:15', entryCount: 1187, isActive: false },
		{
			id: 5,
			title: 'kemal kılıçdaroğlu',
			lastUpdate: '20 Tem, 14:30',
			entryCount: 9881,
			isActive: false
		}
	];

	// Topic navigation functions
	function handleTopicPrevious() {
		console.log('Previous topic page');
	}

	function handleTopicNext() {
		console.log('Next topic page');
	}

	function handleTopicClick(topicId: number) {
		console.log('Topic clicked:', topicId);
	}

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
					<!-- Delete Button -->
					<ButtonIcon
						text="Seçimi Temizle"
						variant="default"
						type="text"
						size="sm"
						onClick={() => (selectedItems = new Set())}
					/>
				</div>

				<!-- Action Buttons for Selected Items - All aligned to left -->
				<div class="flex items-center gap-3">
					<!-- Block Button -->
					<ButtonIcon
						icon={LockIcon}
						text="Engelle"
						variant="warning"
						size="sm"
						onClick={() => console.log('Engelle clicked')}
					/>

					<!-- Delete Button -->
					<ButtonIcon
						icon={Delete01Icon}
						text="Sil"
						variant="danger"
						size="sm"
						onClick={() => console.log('Sil clicked')}
					/>
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
					<SortSelector bind:selectedSort />
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
				<TopicCard
					title="Başlıklar"
					currentPage={1}
					totalPages={47}
					onPrevious={handleTopicPrevious}
					onNext={handleTopicNext}
				>
					{#each topics as topic}
						<TopicItem
							title={topic.title}
							lastUpdate={topic.lastUpdate}
							entryCount={topic.entryCount}
							isActive={topic.isActive}
							onClick={() => handleTopicClick(topic.id)}
						/>
					{/each}
				</TopicCard>
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
									<h4 class="text-base font-medium text-base-content">
										Ekşi Sözlük İstatistikleri
									</h4>
									<p class="text-sm text-base-content/70">Tarihe göre entry ve yazar dağılımları</p>
								</div>

								<!-- Button Groups -->
								<div class="flex items-center gap-2">
									<!-- Chart Type Buttons -->
									<div class="flex items-center rounded-lg border border-base-300 bg-white p-1">
										<button class="btn rounded-md btn-ghost btn-sm">
											<HugeiconsIcon icon={Chart01Icon} size={16} color="gray" />
										</button>
										<button class="btn rounded-md btn-sm btn-primary">
											<HugeiconsIcon icon={Chart01Icon} size={16} color="white" />
										</button>
									</div>

									<!-- Download Button -->
									<button class="btn rounded-md btn-ghost btn-sm" aria-label="Download">
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
