import { SymbolView } from 'expo-symbols';

import type { IconProps } from './types';

import { useColorScheme } from '@/lib/useColorScheme';

function Icon({
  materialCommunityIcon: _materialCommunityIcon,
  materialIcon: _materialIcon,
  sfSymbol,
  name,
  color,
  size = 24,
  ...props
}: IconProps) {
  const { colors } = useColorScheme();
  return (
    <SymbolView
      name={name ?? 'questionmark'}
      tintColor={rgbaToHex(color ?? colors.foreground)}
      size={size}
      resizeMode="scaleAspectFit"
      {...props}
      {...sfSymbol}
    />
  );
}

export { Icon };

// TODO: seems like the need to convert rgba to hex color is a bug in expo-symbols, accordion to the docs, it should accept a hex color, but it doesn't.

function rgbaToHex(color: string): string {
  if (!color) return 'black';
  const rgbaRegex =
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i;
  const match = color.match(rgbaRegex);

  if (!match) {
    return color;
  }

  const [, rStr, gStr, bStr, aStr] = match;
  const r = Math.min(255, parseInt(rStr));
  const g = Math.min(255, parseInt(gStr));
  const b = Math.min(255, parseInt(bStr));
  const a = aStr !== undefined ? Math.round(parseFloat(aStr) * 255) : 255;

  const toHex = (n: number) => n.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 255 ? toHex(a) : ''}`;
}