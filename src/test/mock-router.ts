/** State behind the global expo-router mock (see setup.ts). */
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn(() => true),
};

export const mockSearchParams: { id?: string } = {};
