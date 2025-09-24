import type { Meta, StoryObj } from '@storybook/svelte';
import TopicItem from './TopicItem.svelte';

const meta = {
	title: 'Pages/TopicItem',
	component: TopicItem,
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		title: {
			control: { type: 'text' }
		},
		content: {
			control: { type: 'text' }
		},
		date: {
			control: { type: 'date' }
		},
		likes: {
			control: { type: 'number' }
		},
		author: {
			control: { type: 'text' }
		},
		lastUpdate: {
			control: { type: 'date' }
		}
	}
} satisfies Meta<TopicItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Kemal Kılıçdaroğlu',
		content: 'CHP Genel Başkanı Kemal Kılıçdaroğlu hakkında güncel gelişmeler ve siyasi analizler...',
		date: new Date('2024-01-15'),
		likes: 42,
		author: 'scandsucker',
		lastUpdate: new Date('2024-01-15T10:00:00')
	}
};

export const HighLikes: Story = {
	args: {
		title: 'Ekonomi',
		content: 'Türkiye ekonomisindeki son gelişmeler ve analizler...',
		date: new Date('2024-01-14'),
		likes: 156,
		author: 'economist',
		lastUpdate: new Date('2024-01-14T15:30:00')
	}
};

export const Recent: Story = {
	args: {
		title: 'Teknoloji',
		content: 'Yapay zeka ve teknoloji dünyasından son haberler...',
		date: new Date('2024-01-13'),
		likes: 35,
		author: 'techguru',
		lastUpdate: new Date('2024-01-13T09:15:00')
	}
};

export const WithoutLastUpdate: Story = {
	args: {
		title: 'Spor',
		content: 'Futbol ve diğer spor dallarından haberler...',
		date: new Date('2024-01-12'),
		likes: 23,
		author: 'sportsfan'
	}
};

export const LongContent: Story = {
	args: {
		title: 'Uzun Başlık Örneği',
		content: 'Bu çok uzun bir içerik örneğidir. Bu içerik, sayfanın nasıl görüneceğini test etmek için yazılmıştır. Uzun metinlerin nasıl görüntülendiğini görmek için bu örneği kullanabiliriz. Bu şekilde responsive tasarımın nasıl çalıştığını da test edebiliriz.',
		date: new Date('2024-01-11'),
		likes: 89,
		author: 'longwriter',
		lastUpdate: new Date('2024-01-11T14:45:00')
	}
};
