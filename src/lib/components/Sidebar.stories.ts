import type { Meta, StoryObj } from '@storybook/svelte';
import Sidebar from './Sidebar.svelte';

const meta = {
	title: 'Layout/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		isCollapsed: {
			control: { type: 'boolean' }
		}
	}
} satisfies Meta<Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: (args) => ({
		Component: Sidebar,
		props: args,
		children: {
			component: 'div',
			props: {
				class: 'p-8 bg-base-100 min-h-screen'
			},
			children: 'Main content area with sidebar'
		}
	})
};

export const Collapsed: Story = {
	args: {
		isCollapsed: true
	},
	render: (args) => ({
		Component: Sidebar,
		props: args,
		children: {
			component: 'div',
			props: {
				class: 'p-8 bg-base-100 min-h-screen'
			},
			children: 'Main content area with collapsed sidebar'
		}
	})
};

export const WithContent: Story = {
	args: {},
	render: (args) => ({
		Component: Sidebar,
		props: args,
		children: {
			component: 'div',
			props: {
				class: 'p-8 bg-base-100 min-h-screen'
			},
			children: {
				component: 'div',
				props: {
					class: 'space-y-4'
				},
				children: [
					{
						component: 'h1',
						props: { class: 'text-2xl font-bold' },
						children: 'Ekşi Sözlük Dashboard'
					},
					{
						component: 'p',
						props: { class: 'text-base-content/70' },
						children: 'This is the main content area with the sidebar visible.'
					},
					{
						component: 'div',
						props: { class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' },
						children: [
							{
								component: 'div',
								props: { class: 'card bg-base-200 p-4' },
								children: 'Card 1'
							},
							{
								component: 'div',
								props: { class: 'card bg-base-200 p-4' },
								children: 'Card 2'
							},
							{
								component: 'div',
								props: { class: 'card bg-base-200 p-4' },
								children: 'Card 3'
							}
						]
					}
				]
			}
		}
	})
};
