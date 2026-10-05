# CLAUDE.md

Project guidelines for Claude Code. Read `AGENTS.md` too — it holds the Expo-specific rules, and this file builds on it. Keep both up to date when conventions change.

## Project overview

`salli-app` is an Expo / React Native app (Expo SDK 57, React Native 0.86, React 19.2, TypeScript strict) targeting iOS, Android, and web. Mobile-first, performance-conscious, cross-platform.

Enabled experiments (`app.json`): `typedRoutes`, `reactCompiler`.

## Commands

```bash
npx expo start          # dev server
npx expo lint           # lint
npx tsc --noEmit        # typecheck
npx expo-doctor         # diagnose dependency/config issues
npx expo install <pkg>  # add dependencies (never npm/yarn add)
npx expo install --fix  # repair incompatible versions
```

The project uses npm (`package-lock.json`), so use `npx`, not `bunx`. Run lint and typecheck before declaring any task done.

## Structure

```
src/app/         Expo Router routes only (_layout.tsx, index.tsx, explore.tsx)
src/components/  Shared UI components (platform variants: *.web.tsx)
src/components/ui/
src/hooks/       Custom hooks (use-theme, use-color-scheme[.web])
src/constants/   theme.ts (Colors, Fonts, spacing)
assets/          Images and icons
```

- Every file in `src/app/` is a route. Keep components, hooks, and utils out of it.
- Use the `@/` path alias for `src/` imports (e.g. `@/hooks/use-theme`), not deep relative paths.

## Conventions

- **Naming:** kebab-case file names (`themed-text.tsx`); PascalCase components; camelCase hooks prefixed with `use`.
- **Platform code:** use `.web.tsx` / `.web.ts` (or `.ios` / `.android`) suffixes for platform-specific files rather than scattering `Platform.OS` checks.
- **Theming:** read colors via `useTheme()` and `Colors` in `src/constants/theme.ts`; support light and dark mode everywhere. Prefer `ThemedText` / `ThemedView`. Don't hard-code colors in components.
- **TypeScript:** strict mode; avoid `any`. Use typed routes (`Link`, `router`) from `expo-router`.
- **React Compiler is on:** don't add manual `useMemo` / `useCallback` / `React.memo` unless there's a measured reason.
- **Navigation:** Expo Router only. Import `Link`, `router`, `useLocalSearchParams` from `expo-router`.
- **Performance:** use `FlatList`/`FlashList` for long lists, `expo-image` for images, Reanimated for animation (keep work on the UI thread).
- **Layout:** respect safe areas (`react-native-safe-area-context`) and test on small screens.

## Dependencies

- Add packages with `npx expo install <pkg>` so SDK-compatible versions are chosen.
- Prefer Expo modules over third-party libraries.
- Libraries with native code require a development build (Expo Go only bundles its own native modules).

## Expo docs

Expo changes between SDK releases — don't rely on memory. Check the `expo` major version in `package.json` and consult `https://docs.expo.dev/versions/v57.0.0/`, or the index at `https://docs.expo.dev/llms.txt`, before using any Expo/EAS/React Native API.

## Native code & builds

- `ios/` and `android/` are generated (Continuous Native Generation). Never create or edit them by hand; configure via `app.json` and config plugins.
- Build/submit/update with EAS (`npx eas-cli@latest build|submit|update`).

## Definition of done

1. `npx tsc --noEmit` passes.
2. `npx expo lint` passes.
3. Works in light and dark mode, and on both native and web where relevant.
4. No hand-edited native directories; dependencies added via `expo install`.
