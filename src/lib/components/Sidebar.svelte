<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import ButtonIcon from './ButtonIcon.svelte';
	import { page } from '$app/stores';
	import { isDark, toggleTheme } from '$lib/stores/theme';
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

	// Toggle sidebar collapse
	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}

	// Menu items data
	const menuItems = [
		{ name: 'Akış', icon: FlowIcon, route: '/akış' },
		{ name: 'Genel Bakış', icon: Grid02Icon, route: '/genel-bakış' },
		{ name: 'Twitter', icon: TwitterIcon, route: '/twitter' },
		{ name: 'YouTube', icon: YoutubeIcon, route: '/youtube' },
		{ name: 'Ekşi Sözlük', icon: FlowIcon, route: '/eksisozluk' },
		{ name: 'TikTok', icon: TiktokIcon, route: '/tiktok' },
		{ name: 'Haberler', icon: News01Icon, route: '/haberler' },
		{ name: 'Canlı Yayın', icon: LiveStreaming01Icon, route: '/canlı-yayın' },
		{ name: 'Şikayetvar', icon: CheckmarkCircle01Icon, route: '/şikayetvar' },
		{ name: 'Instagram', icon: InstagramIcon, route: '/instagram' },
		{ name: 'Facebook', icon: FacebookIcon, route: '/facebook' },
		{ name: 'Uygulamalar', icon: Briefcase01Icon, route: '/uygulamalar' },
		{ name: 'Pazaryeri', icon: Store01Icon, route: '/pazaryeri' },
		{ name: 'Google Haritalar', icon: Location01Icon, route: '/google-haritalar' },
		{ name: 'Radyo Yayını', icon: Radio01Icon, route: '/radyo-yayını' },
		{ name: 'Rakip Analizi', icon: FlowIcon, route: '/rakip-analizi' },
		{ name: 'Raporlar', icon: FlowIcon, route: '/raporlar' },
		{ name: 'Trendler', icon: FlowIcon, route: '/trendler' },
		{ name: 'Alarmlar', icon: FlowIcon, route: '/alarmlar' }
	];

	// Function to check if a menu item is active
	function isActive(route: string): boolean {
		return $page.url.pathname === route;
	}

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
		{ icon: PuzzleIcon, class: 'text-base-content centered', onClick: () => console.log('Cloud clicked') },
		{ icon: SidebarLeftIcon, class: 'text-base-content centered', onClick: toggleSidebar },
		{
			icon: Notification01Icon,
			class: 'text-base-content centered',
			onClick: () => console.log('Notifications clicked')
		},
		{ icon: Moon02Icon, class: 'text-base-content centered', onClick: toggleTheme }
	];
</script>

<div class="drawer lg:drawer-open bg-base-300">
	<input type="checkbox" id="my-drawer" class="drawer-toggle" />

	<!-- Page content here -->
	<div class="drawer-content flex flex-col {isCollapsed ? 'ml-16' : 'ml-80'} transition-all duration-300">
		<!-- Mobile header with hamburger menu -->
		<div class="lg:hidden navbar bg-base-100 border-b border-base-300">
			<div class="flex-none">
				<label for="my-drawer" class="btn btn-square btn-ghost">
					<HugeiconsIcon icon={SidebarLeftIcon} size={20} color="currentColor" />
				</label>
			</div>
			<div class="flex-1">
				<h1 class="text-lg font-semibold">Ekşi Sözlük</h1>
			</div>
		</div>
		
		<!-- Page content -->
		<div class="flex-1 p-2">
			{@render children?.()}
		</div>
	</div>

	<!-- Sidebar -->
	<div class="drawer-side bg-base-300">
		<label for="my-drawer" class="drawer-overlay bg-base-300/50 backdrop-blur-sm"></label>
		<aside class="flex min-h-full {isCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 bg-base-300 fixed left-0 top-0 z-40">
			<!-- Left Vertical Button Structure -->
			<div class="flex w-16 flex-col items-center gap-4 bg-base-300 py-4 px-4">
				<!-- Top 3 Buttons -->
				{#each leftButtons.slice(0, 3) as button, index}
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full {index === 0
							? 'bg-black'
							: index === 1
								? 'bg-blue-500'
								: 'border-2 border-base-300 bg-base-100'}"
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
					class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-base-300 bg-base-100 hover:bg-base-200"
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
						class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-base-300 bg-base-100 hover:bg-base-200"
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
			<div class="flex flex-1 flex-col bg-base-300">
				<!-- User Profile Section -->
				<div class="p-4 bg-base-300">
					<div class="flex items-center gap-3">
						<!-- User Info -->
						<div class="flex flex-1 items-center gap-2">
							<div class="avatar">
								<HugeiconsIcon icon={UserCircleIcon} size={20} color="currentColor" />
							</div>
							{#if !isCollapsed}
							<div class="flex-1">
								<div class="text-sm font-medium">Mete Ülkü</div>
							</div>
							{/if}
						</div>

						<!-- Window Icon -->
						<button class="btn btn-ghost btn-sm" aria-label="Window options" onclick={toggleSidebar}>
							<HugeiconsIcon icon={SidebarLeftIcon} size={16} color="currentColor" />
						</button>
					</div>
				</div>

				<!-- Menu Items -->
				<div class="flex-1 overflow-y-auto bg-base-300">
					<ul class="menu w-full p-2 bg-base-300">
						{#each menuItems as item}
							<li>
								<div
									class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left {isActive(item.route)
										? 'bg-base-300'
										: 'hover:bg-base-300'}"
								>
									<ButtonIcon
										icon={item.icon}
										text={isCollapsed ? undefined : item.name}
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
