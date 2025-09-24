import type { Meta, StoryObj } from '@storybook/svelte';
import RefreshButton from './RefreshButton.svelte';

const meta = {
	title: 'Components/RefreshButton',
	component: RefreshButton,
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
		},
		loading: {
			control: { type: 'boolean' }
		}
	}
} satisfies Meta<RefreshButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'Yenile',
		width: 'lg:w-auto',
		height: 'py-3',
		loading: false
	}
};

export const Loading: Story = {
	args: {
		text: 'Yenile',
		width: 'lg:w-auto',
		height: 'py-3',
		loading: true
	}
};

export const Compact: Story = {
	args: {
		text: 'Yenile',
		width: 'w-auto',
		height: 'py-2',
		loading: false
	}
};

export const CustomText: Story = {
	args: {
		text: 'Refresh Data',
		width: 'lg:w-auto',
		height: 'py-3',
		loading: false
	}
};
