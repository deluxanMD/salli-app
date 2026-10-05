import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/dm-sans';

/**
 * On web there is no splash screen to hold, and the static render cannot wait for fonts, so
 * gating the tree would not hydrate. Render immediately; the browser swaps fonts in as they load.
 */
export function useAppFonts(): boolean {
  useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    DMSans_800ExtraBold,
  });
  return true;
}
