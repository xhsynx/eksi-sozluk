import type { Meta, StoryObj } from '@storybook/svelte';
import SortSelector from './SortSelector.svelte';

const meta = {
	title: 'Components/SortSelector',
	component: SortSelector,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		selectedSort: {
			control: { type: 'text' }
		},
		width: {
			control: { type: 'text' }
		},
		height: {
			control: { type: 'text' }
		}
	}
} satisfies Meta<SortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		selectedSort: 'En yeniye göre sırala',
		width: 'w-auto',
		height: 'h-10'
	}
};

export const OldestFirst: Story = {
	args: {
		selectedSort: 'En eskiye göre sırala',
		width: 'w-auto',
		height: 'h-10'
	}
};

export const MostPopular: Story = {
	args: {
		selectedSort: 'En popüler',
		width: 'w-auto',
		height: 'h-10'
	}
};

export const Alphabetical: Story = {
	args: {
		selectedSort: 'Alfabetik A-Z',
		width: 'w-auto',
		height: 'h-10'
	}
};
