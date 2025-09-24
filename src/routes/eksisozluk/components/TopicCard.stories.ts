import type { Meta, StoryObj } from '@storybook/svelte';
import TopicCard from './TopicCard.svelte';
import TopicItem from './TopicItem.svelte';

const meta = {
	title: 'Pages/TopicCard',
	component: TopicCard,
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		title: {
			control: { type: 'text' }
		},
		currentPage: {
			control: { type: 'number' }
		},
		totalPages: {
			control: { type: 'number' }
		},
		className: {
			control: { type: 'text' }
		}
	}
} satisfies Meta<TopicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Başlıklar',
		currentPage: 1,
		totalPages: 47,
		className: ''
	},
	render: (args) => ({
		Component: TopicCard,
		props: args,
		children: {
			component: TopicItem,
			props: {
				title: 'Kemal Kılıçdaroğlu',
				content: 'CHP Genel Başkanı Kemal Kılıçdaroğlu hakkında güncel gelişmeler...',
				date: new Date('2024-01-15'),
				likes: 42,
				author: 'scandsucker',
				lastUpdate: new Date('2024-01-15T10:00:00')
			}
		}
	})
};

export const WithMultipleItems: Story = {
	args: {
		title: 'Başlıklar',
		currentPage: 3,
		totalPages: 47,
		className: ''
	},
	render: (args) => ({
		Component: TopicCard,
		props: args,
		children: {
			component: TopicItem,
			props: [
				{
					title: 'Kemal Kılıçdaroğlu',
					content: 'CHP Genel Başkanı hakkında güncel gelişmeler...',
					date: new Date('2024-01-15'),
					likes: 42,
					author: 'scandsucker',
					lastUpdate: new Date('2024-01-15T10:00:00')
				},
				{
					title: 'Ekonomi',
					content: 'Türkiye ekonomisindeki son gelişmeler...',
					date: new Date('2024-01-14'),
					likes: 28,
					author: 'economist',
					lastUpdate: new Date('2024-01-14T15:30:00')
				},
				{
					title: 'Teknoloji',
					content: 'Yapay zeka ve teknoloji dünyasından haberler...',
					date: new Date('2024-01-13'),
					likes: 35,
					author: 'techguru',
					lastUpdate: new Date('2024-01-13T09:15:00')
				}
			]
		}
	})
};

export const ContentDetails: Story = {
	args: {
		title: 'Content Details',
		currentPage: 1,
		totalPages: 20,
		className: ''
	},
	render: (args) => ({
		Component: TopicCard,
		props: args,
		children: {
			component: TopicItem,
			props: {
				title: 'Kemal Kılıçdaroğlu',
				content: 'CHP Genel Başkanı Kemal Kılıçdaroğlu hakkında güncel gelişmeler ve siyasi analizler...',
				date: new Date('2024-01-15'),
				likes: 42,
				author: 'scandsucker',
				lastUpdate: new Date('2024-01-15T10:00:00')
			}
		}
	})
};
