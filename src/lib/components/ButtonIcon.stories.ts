import type { Meta, StoryObj } from '@storybook/svelte';
import ButtonIcon from './ButtonIcon.svelte';
import { Search01Icon } from '@hugeicons/core-free-icons';

const meta = {
	title: 'Components/ButtonIcon',
	component: ButtonIcon,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		text: {
			control: { type: 'text' }
		},
		disabled: {
			control: { type: 'boolean' }
		},
		loading: {
			control: { type: 'boolean' }
		},
		type: {
			control: { type: 'select' },
			options: ['button', 'text']
		}
	}
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'Search',
		disabled: false,
		loading: false,
		type: 'button',
		icon: Search01Icon
	}
};

export const TextOnly: Story = {
	args: {
		text: 'Text Only Button',
		type: 'text'
	}
};

export const IconOnly: Story = {
	args: {
		type: 'button',
		icon: Search01Icon
	}
};

export const Loading: Story = {
	args: {
		text: 'Loading...',
		loading: true,
		type: 'button',
		icon: Search01Icon
	}
};

export const Disabled: Story = {
	args: {
		text: 'Disabled',
		disabled: true,
		type: 'button',
		icon: Search01Icon
	}
};
