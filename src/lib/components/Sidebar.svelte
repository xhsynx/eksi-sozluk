<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		Analytics01Icon,
		Notification01Icon,
		UserCircleIcon,
		Menu01Icon,
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
		Attachment01Icon
	} from '@hugeicons/core-free-icons';

	let { children } = $props();

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
</script>

<div class="drawer lg:drawer-open">
	<input type="checkbox" id="my-drawer" class="drawer-toggle" />

	<!-- Page content here -->
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-100 lg:hidden">
			<div class="flex-none">
				<label for="my-drawer" class="btn btn-square btn-ghost" aria-label="Open menu">
					<HugeiconsIcon icon={Menu01Icon} size={24} color="currentColor" />
				</label>
			</div>
			<div class="flex-1">
				<button class="btn text-xl btn-ghost">Ekşi Sözlük</button>
			</div>
		</div>

		<!-- Page content -->
		<div class="flex-1 p-4">
			{@render children?.()}
		</div>
	</div>

	<!-- Sidebar -->
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay"></label>
		<aside class="flex min-h-full w-80 bg-base-200">
			<!-- Left Vertical Button Structure -->
			<div class="flex w-16 flex-col items-center gap-4 bg-base-300 py-4">
				<!-- Top 3 Buttons -->
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full bg-black"
					aria-label="Logo"
				>
					<HugeiconsIcon icon={Attachment01Icon} size={20} color="white" />
				</button>

				<button
					class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500"
					aria-label="Analytics"
				>
					<HugeiconsIcon icon={Analytics01Icon} size={20} color="white" />
				</button>

				<button
					class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
					aria-label="Cloud"
				>
					<HugeiconsIcon icon={PuzzleIcon} size={20} color="#6B7280" />
				</button>

				<!-- Spacer -->
				<div class="flex-1"></div>

				<!-- Bottom 2 Buttons -->
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
					aria-label="Notifications"
				>
					<HugeiconsIcon icon={Notification01Icon} size={20} color="#6B7280" />
				</button>

				<button
					class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
					aria-label="Dark mode"
				>
					<HugeiconsIcon icon={Moon02Icon} size={20} color="#6B7280" />
				</button>
			</div>

			<!-- Main Content Area -->
			<div class="flex flex-1 flex-col">
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
							<HugeiconsIcon icon={FlowIcon} size={16} color="currentColor" />
						</button>
					</div>
				</div>

				<!-- Menu Items -->
				<div class="flex-1 overflow-y-auto">
					<ul class="menu w-full p-4">
						{#each menuItems as item}
							<li>
								<button
									class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left {item.active
										? 'bg-base-300'
										: 'hover:bg-base-300'}"
								>
									<HugeiconsIcon icon={item.icon} size={20} color="currentColor" />
									<span class="text-sm font-medium">{item.name}</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</aside>
	</div>
</div>
