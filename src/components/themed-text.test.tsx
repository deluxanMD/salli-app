import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

describe('ThemedText', () => {
  it('renders its children', async () => {
    await render(<ThemedText>Hello</ThemedText>);

    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('uses the theme text color by default', async () => {
    await render(<ThemedText>Hello</ThemedText>);

    const style = StyleSheet.flatten(screen.getByText('Hello').props.style);
    expect(style.color).toBe(Colors.light.text);
  });

  it('applies the requested theme color', async () => {
    await render(<ThemedText themeColor="textSecondary">Hello</ThemedText>);

    const style = StyleSheet.flatten(screen.getByText('Hello').props.style);
    expect(style.color).toBe(Colors.light.textSecondary);
  });
});
