<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Delete02Icon, UnavailableIcon } from '@hugeicons/core-free-icons';
	import ThumbsUpIcon from '$lib/assets/thumb_up.svg';
	import PaperIcon from '$lib/assets/newspaper.svg';
	import PersonEditIcon from '$lib/assets/person_edit.svg';
	import HumidityIcon from '$lib/assets/humidity_low.svg';
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
	import { topicService } from '$lib/services/topicService';
	import type { Topic } from '$lib/types/topic';
	import { isDark } from '$lib/stores/theme';

	// SVG Imports
	import BarChartIcon from '$lib/assets/bar_chart.svg';
	import ViewAgendaIcon from '$lib/assets/view_agenda.svg';
	import DownloadIcon from '$lib/assets/download.svg';
	import ListsIcon from '$lib/assets/lists.svg';
	import StackedBarIcon from '$lib/assets/stacked_bar_chart.svg';
	// Get theme state from store
	let isDarkTheme = $derived($isDark);

	// Search state
	let searchValue = $state('Kemal Kılıçdaroğlu');

	// Date range state
	let selectedDateRange = $state('Son 7 gün');

	// Refresh state
	let isRefreshing = $state(false);

	// Refresh function
	async function handleRefresh() {
		console.log('Refreshing data...');
		isRefreshing = true;
		try {
			// Reload topics from API
			await loadTopics(currentPage);
		} finally {
			isRefreshing = false;
		}
	}

	// Detail filter function
	function handleDetailFilter() {
		console.log('Opening detail filter...');
		// Add your detail filter logic here
	}

	// Sort state
	let selectedSort = $state('En yeniye göre sırala');

	// Topic data
	let topics = $state<Topic[]>([]);
	let topicsLoading = $state(false);
	let selectedTopic = $state<Topic | null>(null);
	let currentPage = $state(1);
	let totalPages = $state(1);

	// Entries data
	let entries = $state<any[]>([]);
	let entriesLoading = $state(false);
	let currentEntryPage = $state(1);
	let totalEntryPages = $state(1);

	// Load topics function
	async function loadTopics(page: number = 1) {
		topicsLoading = true;
		try {
			const response = await topicService.getTopics(page, 10);
			topics = response.topics;
			currentPage = response.page;
			totalPages = Math.ceil(response.total / response.pageSize);
		} catch (error) {
			console.error('Error loading topics:', error);
		} finally {
			topicsLoading = false;
		}
	}

	// Load entries function
	async function loadEntries(topicId: number, page: number = 1) {
		entriesLoading = true;
		try {
			const topic = await topicService.getTopicById(topicId);
			if (topic) {
				const allEntries = topic.entries;
				const pageSize = 10;
				const startIndex = (page - 1) * pageSize;
				const endIndex = startIndex + pageSize;
				entries = allEntries.slice(startIndex, endIndex);
				currentEntryPage = page;
				totalEntryPages = Math.ceil(allEntries.length / pageSize);
			}
		} catch (error) {
			console.error('Error loading entries:', error);
		} finally {
			entriesLoading = false;
		}
	}

	// Topic navigation functions
	async function handleTopicPrevious() {
		if (currentPage > 1) {
			await loadTopics(currentPage - 1);
		}
	}

	async function handleTopicNext() {
		if (currentPage < totalPages) {
			await loadTopics(currentPage + 1);
		}
	}

	// Entry navigation functions
	async function handleEntryPrevious() {
		if (currentEntryPage > 1 && selectedTopic) {
			await loadEntries(selectedTopic.id, currentEntryPage - 1);
		}
	}

	async function handleEntryNext() {
		if (currentEntryPage < totalEntryPages && selectedTopic) {
			await loadEntries(selectedTopic.id, currentEntryPage + 1);
		}
	}

	async function handleTopicClick(topicId: number) {
		try {
			const topic = await topicService.getTopicById(topicId);
			selectedTopic = topic;
			// Load entries for the selected topic
			if (topic) {
				await loadEntries(topicId, 1);
			}
		} catch (error) {
			console.error('Error loading topic:', error);
		}
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

	// Format date for display
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleDateString('tr-TR', { month: 'short' });
		const hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${day} ${month}, ${hours}:${minutes}`;
	}

	// Tab state
	let activeTab = $state('contents');

	// Chart refs
	let chartCanvas = $state<HTMLCanvasElement | undefined>(undefined);
	let chartInstance: Chart | null = null;

	// Initialize Chart.js and load topics
	onMount(() => {
		Chart.register(...registerables);
		loadTopics();
	});

	// Chart data with theme-aware colors
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
		{ label: 'Yazar', value: '31.2K', icon: PersonEditIcon, color: 'bg-[#E8FCFD]' },
		{ label: 'Entry', value: '35.8K', icon: PaperIcon, color: 'bg-[#FFEDD4]' },
		{ label: 'Favori', value: '52.6K', icon: ThumbsUpIcon, color: 'bg-[#E3FDF3]' },
		{ label: 'Başlık', value: '8.2K', icon: ListsIcon, color: 'bg-[#FDF3E9]' }
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
						x: {
							ticks: {
								color: 'currentColor'
							}
						},
						y: {
							beginAtZero: true,
							max: 80,
							ticks: {
								stepSize: 20,
								color: 'currentColor'
							}
						}
					}
				}
			});
		}
	});
</script>

<div class="p-2">
	<!-- Search and Filter Bar -->
	<div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center">
		<!-- Search Bar -->
		<div class="w-full sm:w-auto">
			<SearchBar bind:value={searchValue} width="w-full sm:w-80" />
		</div>

		<!-- Date Range Selector -->
		<div class="w-full sm:w-auto">
			<DateRangeSelector bind:selectedRange={selectedDateRange} width="w-full sm:w-48" />
		</div>

		<!-- Spacer -->
		<div class="hidden flex-1 sm:block"></div>

		<!-- Refresh Button -->
		<div class="w-full sm:w-auto">
			<RefreshButton onClick={handleRefresh} loading={isRefreshing} />
		</div>
	</div>

	<!-- Ekşi Sözlük Header Card -->
	<div class="mb-6 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
		<!-- Title Section -->
		<div class="mb-4 flex items-center gap-3">
			<img src={HumidityIcon} alt="Rain Drop" width="30" height="30" />

			<h1 class="text-2xl font-bold text-base-content">Ekşi Sözlük</h1>
		</div>

		<!-- Selection Info (only show when items are selected) -->
		{#if selectedItems.size > 0}
			<div class="mb-4 flex items-center gap-4">
				<!-- Selection Info -->
				<div class="flex items-center gap-3">
					<span class="text-sm">
						<span class="font-semibold">{selectedItems.size}</span> entry seçildi
					</span>
					<!-- Clear Selection Link -->
					<button
						onclick={() => (selectedItems = new Set())}
						class="text-sm text-blue-600 hover:text-blue-800"
					>
						Seçimi Temizle
					</button>
				</div>

				<!-- Action Buttons for Selected Items - All aligned to left -->
				<div class="flex flex-col gap-2 sm:flex-row sm:items-center">
					<!-- Block Button -->
					<ButtonIcon
						icon={UnavailableIcon}
						text="Engelle"
						class="flex w-full items-center justify-center rounded-lg bg-gray-200 px-4 py-2 text-red-600 hover:bg-gray-300 sm:w-auto"
						type="button"
						onClick={() => console.log('Engelle clicked')}
					/>

					<!-- Delete Button -->
					<ButtonIcon
						icon={Delete02Icon}
						text="Sil"
						class="flex w-full items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 sm:w-auto"
						type="button"
						onClick={() => console.log('Sil clicked')}
					/>
				</div>
			</div>
		{:else}
			<!-- Action Buttons Section (only show when no items selected) -->
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<!-- Left side: Action buttons -->
				<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
					<!-- Detaylı Ara Button -->
					<div class="w-full sm:w-auto">
						<DetailFilter onClick={handleDetailFilter} />
					</div>

					<!-- Sort Dropdown -->
					<div class="w-full sm:w-auto">
						<SortSelector bind:selectedSort width="w-full sm:w-auto" />
					</div>
				</div>

				<!-- Right side: Temizle button -->
				<button
					class="w-full text-left font-medium text-base-content/70 hover:text-base-content sm:w-auto sm:text-right"
				>
					Temizle
				</button>
			</div>
		{/if}
	</div>

	<!-- Tabs Section -->
	<div class="rounded-3xl border border-base-300 bg-base-100 p-2">
		<!-- Tab Navigation -->
		<div class="flex flex-col items-center justify-between rounded-full bg-base-100 sm:flex-row">
			<!-- Left Half: İçerikler Tab -->
			<div class="flex w-full flex-1 justify-center p-2 sm:w-auto sm:p-4">
				<div role="tablist" class="tabs-lift tabs w-full">
					<button
						role="tab"
						class="tab flex w-full items-center justify-center space-x-2 px-4 py-3 text-base sm:space-x-3 sm:px-8 sm:py-4 sm:text-lg {activeTab ===
						'contents'
							? 'tab-active'
							: ''}"
						onclick={() => (activeTab = 'contents')}
					>
						<img src={ViewAgendaIcon} alt="Contents" width="20" height="20" />
						<span class="truncate font-medium">İçerikler</span>
					</button>
				</div>
			</div>

			<!-- Right Half: Analitik Tab -->
			<div class="flex w-full flex-1 justify-center sm:w-auto">
				<div role="tablist" class="tabs-lift tabs w-full">
					<button
						role="tab"
						class="tab flex w-full items-center justify-center space-x-2 px-4 py-3 text-base sm:space-x-3 sm:px-8 sm:py-4 sm:text-lg {activeTab ===
						'analytics'
							? 'tab-active'
							: ''}"
						onclick={() => (activeTab = 'analytics')}
					>
						<img src={BarChartIcon} alt="Analytics" width="20" height="20" />
						<span class="truncate font-medium">Analitik</span>
					</button>
				</div>
			</div>

			<!-- Download Button - Far Right -->
			<button class="btn rounded-md bg-zinc-100 btn-ghost" aria-label="Download">
				<img src={DownloadIcon} alt="Download" width="20" height="20" />
			</button>
		</div>

		<!-- Content Area -->
		{#if activeTab === 'contents'}
			<div
				class="m-2 grid grid-cols-1 gap-3 rounded-2xl border border-base-300 bg-base-200 p-2 lg:grid-cols-3"
			>
				<!-- Left Column - Topics List -->
				<div class="space-y-1 lg:col-span-1">
					<TopicCard
						title="Başlıklar"
						{currentPage}
						{totalPages}
						totalEntries={topics.length}
						onPrevious={handleTopicPrevious}
						onNext={handleTopicNext}
						class="w-full rounded-2xl"
					>
						{#if topicsLoading}
							<div class="flex items-center justify-center py-8">
								<div class="loading loading-md loading-spinner"></div>
							</div>
						{:else}
							{#each topics as topic}
								<TopicItem
									title={topic.title}
									entryCount={topic.entries.length}
									isActive={selectedTopic?.id === topic.id}
									onClick={() => handleTopicClick(topic.id)}
								/>
							{/each}
						{/if}
					</TopicCard>
				</div>

				<!-- Right Column - Content Details -->
				<div class="space-y-1 lg:col-span-2">
					<TopicCard
						title={selectedTopic?.title || 'Başlık seçin'}
						currentPage={currentEntryPage}
						totalPages={totalEntryPages}
						totalEntries={selectedTopic?.entries.length || 0}
						showEntryFormat={true}
						onPrevious={handleEntryPrevious}
						onNext={handleEntryNext}
						class="w-full rounded-2xl"
					>
						{#if selectedTopic}
							{#if entriesLoading}
								<div class="flex items-center justify-center py-8">
									<div class="loading loading-md loading-spinner"></div>
								</div>
							{:else}
								{#each entries as entry, i}
									<TopicItem
										type="detail"
										content={entry.content}
										author={entry.user.name}
										lastUpdate={formatDate(entry.date)}
										likes={entry.likes}
										avatar={entry.user.avatar}
										isSelected={selectedItems.has(i)}
										onToggleSelection={() => toggleSelection(i)}
									/>
								{/each}
							{/if}
						{:else}
							<div class="flex items-center justify-center py-12">
								<div class="text-center">
									<p class="text-base-content/70">Sol taraftan bir başlık seçin</p>
								</div>
							</div>
						{/if}
					</TopicCard>
				</div>
			</div>
		{:else if activeTab === 'analytics'}
			<!-- Analytics Content -->
			<div class="m-2 space-y-6 rounded-2xl border border-base-300 bg-base-200 p-2">
				<!-- KPI Cards -->
				<div
					class="grid grid-cols-1 gap-4 rounded-2xl border border-base-300 bg-base-100 p-2 md:grid-cols-2 lg:grid-cols-4"
				>
					{#each kpiData as kpi}
						<div class="card {isDarkTheme ? 'bg-base-100' : kpi.color}">
							<div class="card-body p-4">
								<div class="flex items-center">
									<div class="p-3">
										<img src={kpi.icon} alt="KPI" width="24" height="24" />
									</div>
									<div class="px-4">
										<p class="text-sm font-medium">{kpi.label}</p>
										<p class="text-2xl font-medium">{kpi.value}</p>
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
						<div class="m-4 flex items-center gap-4">
							<h3 class="text-lg font-semibold text-base-content/70">Genel</h3>
							<div class="h-px flex-1 bg-base-300"></div>
						</div>

						<!-- Statistics Chart Card -->
						<div class="card border border-base-300 bg-base-100 shadow-sm">
							<div class="card-body p-6">
								<div class="mb-4 flex items-center justify-between">
									<div>
										<h4 class="text-base font-medium text-base-content/70">
											Ekşi Sözlük İstatistikleri
										</h4>
										<p class="text-sm text-base-content/70">
											Tarihe göre entry ve yazar dağılımları
										</p>
									</div>

									<!-- Button Groups -->
									<div class="flex items-center gap-2">
										<!-- Chart Type Buttons -->
										<div
											class="flex items-center rounded-lg border border-base-300 bg-base-100 p-1"
										>
											<button class="btn rounded-md btn-ghost btn-sm">
												<img src={BarChartIcon} alt="Chart" width="16" height="16" />
											</button>
											<button class="btn rounded-md btn-sm btn-primary">
												<img src={StackedBarIcon} alt="Chart" width="16" height="16" />
											</button>
										</div>

										<!-- Download Button -->
										<button class="btn rounded-md btn-ghost btn-sm" aria-label="Download">
											<img src={DownloadIcon} alt="Download" width="16" height="16" />
										</button>
									</div>
								</div>
								<div class="h-80">
									<canvas bind:this={chartCanvas} class="text-base-content"></canvas>
								</div>
							</div>
						</div>
					</div>

					<!-- Yazarlar Section -->
					<div class="space-y-4">
						<div class="flex items-center gap-4">
							<h3 class="text-lg font-semibold text-base-content/70">Yazarlar</h3>
							<div class="h-px flex-1 bg-base-300"></div>
						</div>

						<!-- Popular Authors Card -->
						<div class="card border border-base-300 bg-base-100 shadow-sm">
							<div class="card-body p-6">
								<div class="mb-4">
									<h4 class="text-lg font-medium text-base-content">En Popüler Yazarlar</h4>
								</div>
								<div class="space-y-3">
									{#each popularAuthors as author, index}
										<div class="flex items-center justify-between rounded-lg p-3 hover:bg-base-200">
											<div class="flex items-center space-x-3">
												<div
													class="flex h-8 w-8 items-center justify-center rounded-full bg-base-200 text-sm font-medium text-base-content"
												>
													{index + 1}
												</div>
												<span class="font-medium text-base-content">{author.name}</span>
											</div>
											<div
												class="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
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
</div>
