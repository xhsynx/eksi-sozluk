import { writable } from 'svelte/store';

// Create a writable store for theme state
export const isDark = writable(false);

// Theme management functions
export function toggleTheme() {
	isDark.update(current => {
		const newValue = !current;
		// Update document class for DaisyUI theme
		if (newValue) {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
		}
		return newValue;
	});
}

export function setTheme(dark: boolean) {
	isDark.set(dark);
	// Update document class for DaisyUI theme
	if (dark) {
		document.documentElement.setAttribute('data-theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
	}
}

// Initialize theme on store creation
if (typeof document !== 'undefined') {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	setTheme(currentTheme === 'dark');
}
