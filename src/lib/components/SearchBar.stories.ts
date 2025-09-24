import type { Meta, StoryObj } from '@storybook/svelte';
import SearchBar from './SearchBar.svelte';

const meta = {
	title: 'Components/SearchBar',
	component: SearchBar,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		value: {
			control: { type: 'text' }
		},
		placeholder: {
			control: { type: 'text' }
		},
		width: {
			control: { type: 'text' }
		},
		height: {
			control: { type: 'text' }
		}
	}
} satisfies Meta<SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: '',
		placeholder: 'Ara...',
		width: 'w-80',
		height: 'py-2'
	}
};

export const WithValue: Story = {
	args: {
		value: 'Kemal Kılıçdaroğlu',
		placeholder: 'Ara...',
		width: 'w-80',
		height: 'py-2'
	}
};

export const Compact: Story = {
	args: {
		value: '',
		placeholder: 'Ara...',
		width: 'w-64',
		height: 'py-1'
	}
};

export const Large: Story = {
	args: {
		value: '',
		placeholder: 'Ara...',
		width: 'w-96',
		height: 'py-3'
	}
};
