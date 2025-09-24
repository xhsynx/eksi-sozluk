import type { Meta, StoryObj } from '@storybook/svelte';
import DateRangeSelector from './DateRangeSelector.svelte';

const meta = {
	title: 'Components/DateRangeSelector',
	component: DateRangeSelector,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		selectedRange: {
			control: { type: 'text' }
		},
		width: {
			control: { type: 'text' }
		},
		height: {
			control: { type: 'text' }
		}
	}
} satisfies Meta<DateRangeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		selectedRange: 'Son 7 gün',
		width: 'w-48',
		height: 'py-3'
	}
};

export const LastDay: Story = {
	args: {
		selectedRange: 'Son 1 gün',
		width: 'w-48',
		height: 'py-3'
	}
};

export const LastMonth: Story = {
	args: {
		selectedRange: 'Son 30 gün',
		width: 'w-48',
		height: 'py-3'
	}
};

export const Compact: Story = {
	args: {
		selectedRange: 'Son 7 gün',
		width: 'w-40',
		height: 'py-2'
	}
};
