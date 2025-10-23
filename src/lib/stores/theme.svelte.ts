export function createThemeStore() {
	let isDark = $state(false);

	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('theme');
		isDark = savedTheme === 'dark';
		if (savedTheme === 'dark') {
			document.documentElement.classList.add('dark');
		}
	}

	return {
		get isDark() {
			return isDark;
		},
		toggle() {
			isDark = !isDark;
			if (typeof window !== 'undefined') {
				if (isDark) {
					document.documentElement.classList.add('dark');
					localStorage.setItem('theme', 'dark');
				} else {
					document.documentElement.classList.remove('dark');
					localStorage.setItem('theme', 'light');
				}
			}
		}
	};
}

export const themeStore = createThemeStore();

