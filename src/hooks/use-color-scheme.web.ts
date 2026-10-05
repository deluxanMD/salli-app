import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const subscribe = () => () => {};

/**
 * Static rendering has no browser, so the first render must be light to match the server HTML.
 * Once hydrated, read the real system scheme.
 */
export function useColorScheme() {
  // The server snapshot is used while hydrating; afterwards React switches to the client one.
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const colorScheme = useRNColorScheme();
  return hasHydrated ? colorScheme : 'light';
}
