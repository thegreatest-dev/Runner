import { useEffect, useState } from 'react';
import { useColorScheme as useRN } from 'react-native';

// prefer an explicit preference from ThemePreference context when available
export function useColorScheme() {
	// lazy require to avoid circular imports at module initialization
	let pref: any = null;
	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		pref = require('@/context/ThemePreference');
	} catch (e) {
		pref = null;
	}


	const system = useRN();
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => setHydrated(true), []);

	// If a ThemePreference hook exists in the project, call it here (unconditionally when the module is present).
	// We call it before the hydration guard so hook ordering stays stable across renders.
	let prefResult: any = null;
	if (pref && pref.useThemePreference) {
		try {
			prefResult = pref.useThemePreference();
		} catch (e) {
			// Hook was called outside a provider or not available; ignore and fallback below.
			prefResult = null;
		}
	}

	if (!hydrated) return 'light';

	if (prefResult && prefResult.preference) {
		return prefResult.preference === 'system' ? system : prefResult.preference;
	}

	return system || 'light';
}
