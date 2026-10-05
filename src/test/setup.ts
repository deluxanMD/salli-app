// Reanimated and worklets need native runtimes; use their official Jest mocks.
jest.mock('react-native-worklets', () => jest.requireActual('react-native-worklets/src/mock'));
jest.mock('react-native-reanimated', () => jest.requireActual('react-native-reanimated/mock'));

jest.mock('expo-router', () => {
  const { mockRouter, mockSearchParams } = jest.requireActual('@/test/mock-router');
  return { router: mockRouter, useLocalSearchParams: () => mockSearchParams };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
