<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import ButtonIcon from './ButtonIcon.svelte';
	import { page } from '$app/stores';
	import { isDark, toggleTheme } from '$lib/stores/theme';
	import NotificationsIcon from '$lib/assets/notifications.svg';
	import LeftPanelCloseIcon from '$lib/assets/left_panel_close.svg';
	import ExtensionIcon from '$lib/assets/extension.svg';
	import UnionIcon from '$lib/assets/Union.svg';
	import AnalyticsIcon from '$lib/assets/analytics.svg';
	import DarkModeIcon from '$lib/assets/dark_mode.svg';
	import CalendarDayIcon from '$lib/assets/calendar_today.svg';
	import DashboardIcon from '$lib/assets/dashboard.svg';
	import XIcon from '$lib/assets/x.svg';
	import YoutubeIcon from '$lib/assets/youtube.svg';
	import ListsIcon from '$lib/assets/lists.svg';
	import TiktokIcon from '$lib/assets/tiktok.svg';
	import NewsPaperIcon from '$lib/assets/newspaper.svg';
	import CellTowerIcon from '$lib/assets/cell_tower.svg';
	import SikayetvarIcon from '$lib/assets/sikayetvar.svg';
	import InstagramIcon from '$lib/assets/instagram.svg';
	import FacebookIcon from '$lib/assets/facebook.svg';
	import ShopIcon from '$lib/assets/shop.svg';
	import StoreFrontIcon from '$lib/assets/storefront.svg';
	import LocationIcon from '$lib/assets/location_on.svg';
	import RadioIcon from '$lib/assets/radio.svg';
	import CompareArrowsIcon from '$lib/assets/compare_arrows.svg';
	import KeyboardArrowDownIcon from '$lib/assets/keyboard_arrow_down.svg';
	import NoteStackIcon from '$lib/assets/note_stack.svg';
	import TrendingUpIcon from '$lib/assets/trending_up.svg';
	import AlarmIcon from '$lib/assets/alarm.svg';
	import UserIcon from '$lib/assets/account_circle.svg';
	import SidebarLeftIcon from '$lib/assets/left_panel_close.svg';


	let { children } = $props();

	// Sidebar collapse state
	let isCollapsed = $state(false);

	// Toggle sidebar collapse
	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}

	// Menu items data
	const menuItems = [
		{ name: 'Akış', icon: CalendarDayIcon, route: '/akış' },
		{ name: 'Genel Bakış', icon: DashboardIcon, route: '/genel-bakış' },
		{ name: 'X', icon: XIcon, route: '/x' },
		{ name: 'YouTube', icon: YoutubeIcon, route: '/youtube' },
		{ name: 'Ekşi Sözlük', icon: ListsIcon, route: '/eksisozluk' },
		{ name: 'TikTok', icon: TiktokIcon, route: '/tiktok' },
		{ name: 'Haberler', icon: NewsPaperIcon, route: '/haberler' },
		{ name: 'Canlı Yayın', icon: CellTowerIcon, route: '/canlı-yayın' },
		{ name: 'Şikayetvar', icon: SikayetvarIcon, route: '/şikayetvar' },
		{ name: 'Instagram', icon: InstagramIcon, route: '/instagram' },
		{ name: 'Facebook', icon: FacebookIcon, route: '/facebook' },
		{ name: 'Uygulamalar', icon: ShopIcon, route: '/uygulamalar' },
		{ name: 'Pazaryeri', icon: StoreFrontIcon, route: '/pazaryeri' },
		{ name: 'Google Haritalar', icon: LocationIcon, route: '/google-haritalar' },
		{ name: 'Radyo Yayını', icon: RadioIcon, route: '/radyo-yayını' },
		{ name: 'Rakip Analizi', icon: CompareArrowsIcon, route: '/rakip-analizi' },
		{ name: 'Raporlar', icon: NoteStackIcon, route: '/raporlar' },
		{ name: 'Trendler', icon: TrendingUpIcon, route: '/trendler' },
		{ name: 'Alarmlar', icon: AlarmIcon, route: '/alarmlar' }
	];

	// Function to check if a menu item is active
	function isActive(route: string): boolean {
		return $page.url.pathname === route;
	}

	// Left vertical buttons data
	const leftButtons = [
		{
			icon: UnionIcon,
			class: 'text-white centered',
			onClick: () => console.log('Logo clicked')
		},
		{
			icon: AnalyticsIcon,
			class: 'text-white centered',
			onClick: () => console.log('Analytics clicked')
		},
		{ icon: ExtensionIcon, class: 'text-base-content centered', onClick: () => console.log('Cloud clicked') },
		{ icon: LeftPanelCloseIcon, class: 'text-base-content centered', onClick: toggleSidebar },
		{
			icon: NotificationsIcon,
			class: 'text-base-content centered',
			onClick: () => console.log('Notifications clicked')
		},
		{ icon: DarkModeIcon, class: 'text-base-content centered', onClick: toggleTheme }
	];
</script>

<div class="drawer lg:drawer-open bg-base-300">
	<input type="checkbox" id="my-drawer" class="drawer-toggle" />

	<!-- Page content here -->
	<div class="drawer-content flex flex-col">
		<!-- Mobile header with hamburger menu -->
		<div class="lg:hidden navbar border-b border-base-300 bg-base-300">
			<div class="flex-none">
				<label for="my-drawer" class="btn btn-square btn-ghost">
				 <img src={LeftPanelCloseIcon} alt="Notifications" width="20" height="20" />
				</label>
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
		<aside class="flex min-h-full lg:{isCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 bg-base-300">
			<!-- Left Vertical Button Structure -->
			<div class="flex w-16 flex-col items-center gap-4 bg-base-300 py-4">
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
			<div class="flex flex-1 flex-col lg:{isCollapsed ? 'hidden' : 'block'} bg-base-300">
				<!-- User Profile Section -->
				<div class="p-4 bg-base-300">
					<div class="flex items-center gap-3">
						<!-- User Info -->
						<div class="flex flex-1 items-center gap-2">
							<div class="avatar">
								<img src={UserIcon} alt="User" width="20" height="20" />
							</div>
							<div class="flex-1">
								<div class="text-sm font-medium">Mete Ülkü</div>
							</div>
							<div class="flex items-center">
								<img src={KeyboardArrowDownIcon} alt="Compare" width="16" height="16" />
							</div>
						</div>

						<!-- Window Icon -->
						<button class="btn btn-ghost btn-sm" aria-label="Window options" onclick={toggleSidebar}>
							<img src={SidebarLeftIcon} alt="Window" width="16" height="16" />
						</button>
					</div>
				</div>

				<!-- Menu Items -->
				<div class="flex-1 overflow-y-auto bg-base-300">
					<ul class="menu w-full p-4 bg-base-300">
						{#each menuItems as item}
							<li>
								<div
									class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left {isActive(item.route)
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
