<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import ButtonIcon from './ButtonIcon.svelte';
	import {
		Analytics01Icon,
		Notification01Icon,
		UserCircleIcon,
		FlowIcon,
		Grid02Icon,
		TwitterIcon,
		YoutubeIcon,
		TiktokIcon,
		News01Icon,
		LiveStreaming01Icon,
		CheckmarkCircle01Icon,
		InstagramIcon,
		FacebookIcon,
		Briefcase01Icon,
		Store01Icon,
		Location01Icon,
		Radio01Icon,
		Moon02Icon,
		PuzzleIcon,
		Attachment01Icon,
		SidebarLeftIcon
	} from '@hugeicons/core-free-icons';

	let { children } = $props();

	// Sidebar collapse state
	let isCollapsed = $state(false);

	// Theme state
	let isDark = $state(false);

	// Toggle sidebar collapse
	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}

	// Toggle theme
	function toggleTheme() {
		isDark = !isDark;
		// Update document class for DaisyUI theme
		if (isDark) {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
		}
	}

	// Initialize theme on mount
	$effect(() => {
		// Set initial theme
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	});

	// Menu items data
	const menuItems = [
		{ name: 'Akış', icon: FlowIcon, active: false },
		{ name: 'Genel Bakış', icon: Grid02Icon, active: false },
		{ name: 'Twitter', icon: TwitterIcon, active: false },
		{ name: 'YouTube', icon: YoutubeIcon, active: false },
		{ name: 'Ekşi Sözlük', icon: FlowIcon, active: true },
		{ name: 'TikTok', icon: TiktokIcon, active: false },
		{ name: 'Haberler', icon: News01Icon, active: false },
		{ name: 'Canlı Yayın', icon: LiveStreaming01Icon, active: false },
		{ name: 'Şikayetvar', icon: CheckmarkCircle01Icon, active: false },
		{ name: 'Instagram', icon: InstagramIcon, active: false },
		{ name: 'Facebook', icon: FacebookIcon, active: false },
		{ name: 'Uygulamalar', icon: Briefcase01Icon, active: false },
		{ name: 'Pazaryeri', icon: Store01Icon, active: false },
		{ name: 'Google Haritalar', icon: Location01Icon, active: false },
		{ name: 'Radyo Yayını', icon: Radio01Icon, active: false },
		{ name: 'Rakip Analizi', icon: FlowIcon, active: false },
		{ name: 'Raporlar', icon: FlowIcon, active: false },
		{ name: 'Trendler', icon: FlowIcon, active: false },
		{ name: 'Alarmlar', icon: FlowIcon, active: false }
	];

	// Left vertical buttons data
	const leftButtons = [
		{
			icon: Attachment01Icon,
			class: 'text-white centered',
			onClick: () => console.log('Logo clicked')
		},
		{
			icon: Analytics01Icon,
			class: 'text-white centered',
			onClick: () => console.log('Analytics clicked')
		},
		{ icon: PuzzleIcon, class: 'text-gray-600 centered', onClick: () => console.log('Cloud clicked') },
		{ icon: SidebarLeftIcon, class: 'text-gray-600 centered', onClick: toggleSidebar },
		{
			icon: Notification01Icon,
			class: 'text-gray-600 centered',
			onClick: () => console.log('Notifications clicked')
		},
		{ icon: Moon02Icon, class: 'text-gray-600 centered', onClick: toggleTheme }
	];
</script>

<div class="drawer lg:drawer-open">
	<input type="checkbox" id="my-drawer" class="drawer-toggle" />

	<!-- Page content here -->
	<div class="drawer-content flex flex-col">
		<!-- Page content -->
		<div class="flex-1 p-4">
			{@render children?.()}
		</div>
	</div>

	<!-- Sidebar -->
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay"></label>
		<aside class="flex min-h-full {isCollapsed ? 'w-16' : 'w-80'} transition-all duration-300">
			<!-- Left Vertical Button Structure -->
			<div class="flex w-16 flex-col items-center gap-4 dark:bg-base-500 py-4">
				<!-- Top 3 Buttons -->
				{#each leftButtons.slice(0, 3) as button, index}
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full {index === 0
							? 'bg-black'
							: index === 1
								? 'bg-blue-500'
								: 'border-2 border-gray-300 bg-white dark:bg-base-500'}"
					>
						<ButtonIcon
							icon={button.icon}
							class={button.class}
							onClick={button.onClick}
						/>
					</div>
				{/each}

				<!-- Sidebar Toggle Button -->
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-100"
				>
					<ButtonIcon
						icon={leftButtons[3].icon}
						class={leftButtons[3].class}
						onClick={leftButtons[3].onClick}
					/>
				</div>

				<!-- Spacer -->
				<div class="flex-1"></div>

				<!-- Bottom 2 Buttons -->
				{#each leftButtons.slice(4) as button}
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-100"
					>
						<ButtonIcon
							icon={button.icon}
							class={button.class}
							onClick={button.onClick}
						/>
					</div>
				{/each}
			</div>

			<!-- Main Content Area -->
			<div class="flex flex-1 flex-col {isCollapsed ? 'hidden' : 'block'}">
				<!-- User Profile Section -->
				<div class="border-b border-base-300 p-4">
					<div class="flex items-center gap-3">
						<!-- User Info -->
						<div class="flex flex-1 items-center gap-2">
							<div class="avatar">
								<HugeiconsIcon icon={UserCircleIcon} size={20} color="currentColor" />
							</div>
							<div class="flex-1">
								<div class="text-sm font-medium">Mete Ülkü</div>
							</div>
						</div>

						<!-- Window Icon -->
						<button class="btn btn-ghost btn-sm" aria-label="Window options">
							<HugeiconsIcon icon={SidebarLeftIcon} size={16} color="currentColor" />
						</button>
					</div>
				</div>

				<!-- Menu Items -->
				<div class="flex-1 overflow-y-auto">
					<ul class="menu w-full p-4">
						{#each menuItems as item}
							<li>
								<div
									class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left {item.active
										? 'bg-base-300'
										: 'hover:bg-base-300'}"
								>
									<ButtonIcon
										icon={item.icon}
										text={item.name}
										class="flex text-left justify-start w-full"
										onClick={() => console.log(`${item.name} clicked`)}
									/>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</aside>
	</div>
</div>
