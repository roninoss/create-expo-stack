import { describe, expect, test } from 'bun:test';

import { toExpoScheme, toExpoSlug } from '../src/utilities/generateProjectFiles';

describe('Expo project identifiers', () => {
  test('creates stable slugs from app names', () => {
    expect(toExpoSlug('My Expo App')).toBe('my-expo-app');
    expect(toExpoSlug('  Demo_App  ')).toBe('demo_app');
    expect(toExpoSlug('---')).toBe('expo-app');
  });

  test('creates URL-safe schemes that start with a letter', () => {
    expect(toExpoScheme('My Expo App')).toBe('my-expo-app');
    expect(toExpoScheme('123 Demo App')).toBe('demo-app');
    expect(toExpoScheme('!!!')).toBe('expo-app');
  });
});
