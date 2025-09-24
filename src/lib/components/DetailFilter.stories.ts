import type { Meta, StoryObj } from '@storybook/svelte';
import DetailFilter from './DetailFilter.svelte';

const meta = {
	title: 'Components/DetailFilter',
	component: DetailFilter,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		text: {
			control: { type: 'text' }
		},
		width: {
			control: { type: 'text' }
		},
		height: {
			control: { type: 'text' }
		}
	}
} satisfies Meta<DetailFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'Detaylı Ara',
		width: 'w-auto',
		height: 'h-10'
	}
};

export const Compact: Story = {
	args: {
		text: 'Detaylı Ara',
		width: 'w-auto',
		height: 'h-8'
	}
};

export const Large: Story = {
	args: {
		text: 'Detaylı Ara',
		width: 'w-auto',
		height: 'h-12'
	}
};

export const CustomText: Story = {
	args: {
		text: 'Advanced Search',
		width: 'w-auto',
		height: 'h-10'
	}
};
