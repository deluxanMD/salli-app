# CLAUDE.md

Project guidelines for Claude Code. Read `AGENTS.md` too — it holds the Expo-specific rules, and this file builds on it. Keep both up to date when conventions change.

## Project overview

`salli-app` ("Salli") is an Expo / React Native expense tracker for Sri Lankan users (Expo SDK 57, React Native 0.86, React 19.2, TypeScript strict) targeting iOS, Android, and web. Its selling point is automation: it reads bank SMS on the device and files each expense under the right category. Messages are processed on the device and never uploaded. Never claim "end-to-end encrypted" in the UI. Mobile-first, performance-conscious, cross-platform. The design canvas is the source of truth for visuals; `src/theme/salli-theme.ts` is the only source of colors, type, spacing, radius and sizes.

Enabled experiments (`app.json`): `typedRoutes`, `reactCompiler`.

## Commands

```bash
npx expo start          # dev server
npx expo lint           # lint (includes Prettier)
npm run format          # format with Prettier
npm test                # unit tests (Jest)
npx tsc --noEmit        # typecheck
npx expo-doctor         # diagnose dependency/config issues
npx expo install <pkg>  # add dependencies (never npm/yarn add)
npx expo install --fix  # repair incompatible versions
```

The project uses npm (`package-lock.json`), so use `npx`, not `bunx`. Run lint and typecheck before declaring any task done.

## Structure

Follow the modern Expo Router layout: a `src/` directory, with routes separated from everything else.

```
src/
  app/            Routes only (_layout.tsx; (tabs)/ with index, activity, insights, budgets, settings)
  components/     Shared UI components (ui/ for primitives and the spec's shared components, charts/)
  i18n/           en.ts: every user-facing string (English only for now)
  theme/          salli-theme.ts tokens, theme-provider.tsx (light/dark/system), color helpers
  features/       Feature modules (components, hooks, api, types) once the app grows
  hooks/          Shared custom hooks
  utils/          Pure helper functions
  services/       API clients and external integrations
  types/          Shared TypeScript types
assets/           Images, fonts, icons
```

- Every file in `src/app/` is a route. Keep components, hooks, and utils out of it.
- Add new top-level folders under `src/` only when needed; co-locate code used by a single feature in `src/features/<feature>/`.

## Naming & imports

- **Files and folders:** kebab-case (`themed-text.tsx`, `use-theme.ts`). Route files follow Expo Router syntax (`[id].tsx`, `(tabs)/`, `_layout.tsx`).
- **Platform variants:** `.web.tsx`, `.ios.tsx`, `.android.tsx` suffixes instead of scattered `Platform.OS` checks.
- **Identifiers:** PascalCase components and types, camelCase variables and functions, `use` prefix for hooks, UPPER_SNAKE_CASE for true constants.
- **Exports:** named exports for components, hooks, and utils; default exports only where Expo Router requires them (route files).
- **Imports:** use the `@/` alias for anything under `src/` (never deep `../../` paths); use `import type` for type-only imports. Order: React/React Native, third-party packages, `@/` alias imports, relative imports, styles. VS Code organizes imports on save.

## Lint & formatting

- ESLint (`eslint-config-expo`) and Prettier are configured: `eslint.config.js`, `.prettierrc`, `.prettierignore`. Prettier runs through ESLint, so `npx expo lint` reports formatting problems.
- Style: single quotes, semicolons, trailing commas, 100-character lines, 2-space indent.
- Before finishing any change run `npm run format`, `npx expo lint` and `npx tsc --noEmit`. Don't disable lint rules without a comment explaining why.

## Conventions

- **Theming:** read tokens via `useTheme()` from `@/theme/theme-provider` (colors, `categoryColor`, `cardShadow`) and the static tokens (`typography`, `spacing`, `radius`, `sizes`, `charts`) from `@/theme/salli-theme`. Support light and dark mode. Use the `Text` primitive in `@/components/ui/text`. Never hard-code hex values or font sizes in components; never use `fontWeight` (pick the DM Sans file via `fontFamily`). Use `withAlpha` for translucent tints.
- **Money:** format only with `formatRs` (minus sign is U+2212).
- **Strings:** add every user-facing string to `src/i18n/en.ts`; no inline copy in components.
- **Accessibility:** touch targets at least 44 × 44 (use `hitSlop` on 40-high controls), `accessibilityLabel` on icon-only buttons, text scales to 130% (`Text` caps it), contrast at least 4.5:1.
- **TypeScript:** strict mode; avoid `any`. Use typed routes (`Link`, `router`) from `expo-router`.
- **React Compiler is on:** don't add manual `useMemo` / `useCallback` / `React.memo` unless there's a measured reason.
- **Navigation:** Expo Router only. Import `Link`, `router`, `useLocalSearchParams` from `expo-router`.
- **Performance:** use `FlatList`/`FlashList` for long lists, `expo-image` for images, Reanimated for animation (keep work on the UI thread).
- **Layout:** respect safe areas (`react-native-safe-area-context`) and test on small screens.

## Testing

- Jest with the `jest-expo` preset and React Native Testing Library (v14: `render` and `renderHook` are async, so `await` them). Config in `jest.config.js`.
- Co-locate tests next to the code as `*.test.ts` / `*.test.tsx`; import via the `@/` alias.
- Query by role, text, or label, not by implementation details. Mock only boundaries. Render themed components with `renderWithTheme` from `@/test/render-with-theme`. Reanimated and worklets are mocked in `src/test/setup.ts`.
- Add or update tests for every behavior change. Run `npm test` before pushing.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on pull requests and pushes to `main`: lint, Prettier check, typecheck, unit tests with coverage, `expo-doctor`, and a web export build. All must pass before merging. Run the same checks locally before pushing.

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
2. `npx expo lint` passes and `npm run format:check` is clean.
3. `npm test` passes.
4. Works in light and dark mode, and on both native and web where relevant.
5. No hand-edited native directories; dependencies added via `expo install`.
