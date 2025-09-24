import type { Topic, TopicListResponse } from '$lib/types/topic';
import type { Entry } from '$lib/types/entry';
import type { User } from '$lib/types/user';

// Mock users
const mockUsers: User[] = [
	{ id: 1, name: 'scandsucker', avatar: '🌙', email: 'scand@example.com', joinDate: '2020-01-15' },
	{ id: 2, name: 'Paula Mora', avatar: '👩', email: 'paula@example.com', joinDate: '2019-03-22' },
	{ id: 3, name: 'Eddie Lake', avatar: '👨', email: 'eddie@example.com', joinDate: '2021-07-10' },
	{ id: 4, name: 'Chris Glasser', avatar: '🧑', email: 'chris@example.com', joinDate: '2020-11-05' },
	{ id: 5, name: 'Autumn Phillips', avatar: '👩‍🦰', email: 'autumn@example.com', joinDate: '2022-02-18' },
	{ id: 6, name: 'John Dukes', avatar: '👨‍💼', email: 'john@example.com', joinDate: '2018-09-12' },
	{ id: 7, name: 'Frances Swann', avatar: '👩‍🎨', email: 'frances@example.com', joinDate: '2021-04-30' },
	{ id: 8, name: 'Lorri Warf', avatar: '👩‍💻', email: 'lorri@example.com', joinDate: '2020-06-08' }
];

// Mock data
const mockTopics: Topic[] = [
	{
		id: 1,
		title: 'Kemal Kılıçdaroğlu',
		content: 'CHP Genel Başkanı Kemal Kılıçdaroğlu hakkında güncel gelişmeler ve yorumlar.',
		date: '2024-01-15',
		likes: 245,
		entries: [
			{
				id: 1,
				content: 'Kemal Kılıçdaroğlu son açıklamalarında ekonomik politikalar hakkında konuştu.',
				likes: 45,
				date: '2024-01-15T10:30:00',
				user: mockUsers[0]
			},
			{
				id: 2,
				content: 'CHP lideri, seçim stratejileri ve parti içi demokrasi konularında görüşlerini paylaştı.',
				likes: 32,
				date: '2024-01-15T14:20:00',
				user: mockUsers[1]
			},
			{
				id: 3,
				content: 'Kılıçdaroğlu\'nun son röportajı medyada geniş yankı buldu.',
				likes: 28,
				date: '2024-01-15T16:45:00',
				user: mockUsers[2]
			}
		]
	},
	{
		id: 2,
		title: 'Ekonomi',
		content: 'Türkiye ekonomisindeki son gelişmeler, dolar kuru ve enflasyon verileri.',
		date: '2024-01-14',
		likes: 189,
		entries: [
			{
				id: 4,
				content: 'Dolar kuru bugün 32.50 seviyelerinde işlem görüyor.',
				likes: 67,
				date: '2024-01-14T09:15:00',
				user: mockUsers[3]
			},
			{
				id: 5,
				content: 'Enflasyon verileri beklentilerin üzerinde geldi.',
				likes: 43,
				date: '2024-01-14T11:30:00',
				user: mockUsers[4]
			}
		]
	},
	{
		id: 3,
		title: 'Teknoloji',
		content: 'Yapay zeka, blockchain ve diğer teknoloji trendleri hakkında tartışmalar.',
		date: '2024-01-13',
		likes: 156,
		entries: [
			{
				id: 6,
				content: 'ChatGPT-4 yeni özellikleri ile dikkat çekiyor.',
				likes: 89,
				date: '2024-01-13T08:45:00',
				user: mockUsers[5]
			}
		]
	},
	{
		id: 4,
		title: 'Spor',
		content: 'Futbol, basketbol ve diğer spor dallarındaki son gelişmeler.',
		date: '2024-01-12',
		likes: 98,
		entries: [
			{
				id: 7,
				content: 'Galatasaray yeni transfer döneminde aktif.',
				likes: 156,
				date: '2024-01-12T19:30:00',
				user: mockUsers[6]
			}
		]
	},
	{
		id: 5,
		title: 'Eğitim',
		content: 'Üniversite sınavları, eğitim sistemi ve akademik tartışmalar.',
		date: '2024-01-11',
		likes: 134,
		entries: [
			{
				id: 8,
				content: 'YKS sonuçları açıklandı, başarı oranları yükseldi.',
				likes: 234,
				date: '2024-01-11T14:00:00',
				user: mockUsers[7]
			}
		]
	},
	{
		id: 6,
		title: 'Sağlık',
		content: 'Pandemi sonrası sağlık sistemi ve tıbbi gelişmeler.',
		date: '2024-01-10',
		likes: 87,
		entries: []
	},
	{
		id: 7,
		title: 'Kültür',
		content: 'Sanat, müzik, sinema ve kültürel etkinlikler.',
		date: '2024-01-09',
		likes: 76,
		entries: []
	},
	{
		id: 8,
		title: 'Politika',
		content: 'Siyasi gelişmeler, seçimler ve demokrasi tartışmaları.',
		date: '2024-01-08',
		likes: 203,
		entries: []
	},
	{
		id: 9,
		title: 'Çevre',
		content: 'İklim değişikliği, çevre koruma ve sürdürülebilirlik.',
		date: '2024-01-07',
		likes: 92,
		entries: []
	},
	{
		id: 10,
		title: 'Seyahat',
		content: 'Turizm, seyahat deneyimleri ve destinasyon önerileri.',
		date: '2024-01-06',
		likes: 65,
		entries: []
	}
];

// Mock service functions
export const topicService = {
	async getTopics(page: number = 1, pageSize: number = 10): Promise<TopicListResponse> {
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 500));
		
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedTopics = mockTopics.slice(startIndex, endIndex);
		
		return {
			topics: paginatedTopics,
			total: mockTopics.length,
			page,
			pageSize
		};
	},

	async getTopicById(id: number): Promise<Topic | null> {
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 300));
		
		return mockTopics.find(topic => topic.id === id) || null;
	},

	async searchTopics(query: string): Promise<Topic[]> {
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 400));
		
		return mockTopics.filter(topic => 
			topic.title.toLowerCase().includes(query.toLowerCase()) ||
			topic.content.toLowerCase().includes(query.toLowerCase())
		);
	},

	async getTopicEntries(topicId: number): Promise<Entry[]> {
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 300));
		
		const topic = mockTopics.find(t => t.id === topicId);
		return topic?.entries || [];
	}
};
