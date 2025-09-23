<div class="container mx-auto p-6">
	<!-- Search and Filter Bar -->
	<div class="flex flex-col lg:flex-row gap-4 mb-8">
		<!-- Search Bar -->
		<div class="lg:w-80">
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</div>
				<input 
					type="text" 
					value="Kemal Kılıçdaroğlu"
					class="input w-full pl-10 pr-10 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
				/>
				<div class="absolute inset-y-0 right-0 pr-3 flex items-center">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
					</svg>
				</div>
			</div>
		</div>
		
		<!-- Date Range Selector -->
		<div class="lg:w-48">
			<button class="btn w-full justify-start bg-purple-600 border-purple-500 text-white hover:bg-purple-700 hover:border-purple-600">
				<svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
				</svg>
				Son 7 gün
				<svg class="h-4 w-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
				</svg>
			</button>
		</div>
		
		<!-- Spacer -->
		<div class="flex-1"></div>
		
		<!-- Refresh Button -->
		<div class="lg:w-auto">
			<button class="btn bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300 hover:border-gray-400 rounded-full px-6">
				<svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
				</svg>
				Yenile
				<div class="ml-2 border-l border-gray-400 pl-2">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
					</svg>
				</div>
			</button>
		</div>
	</div>
	
	<h1 class="text-3xl font-bold mb-6">Ekşi Sözlük</h1>
	
	<!-- Content Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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