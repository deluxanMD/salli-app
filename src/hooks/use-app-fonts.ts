import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/dm-sans';

/** Loads the five DM Sans files named in the theme's `fontFamily`. Returns true once ready. */
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    DMSans_800ExtraBold,
  });
  // On a load error fall back to system fonts rather than holding the splash screen forever.
  return loaded || error !== null;
}
