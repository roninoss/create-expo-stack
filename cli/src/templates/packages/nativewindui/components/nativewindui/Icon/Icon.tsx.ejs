import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  SF_SYMBOLS_TO_MATERIAL_COMMUNITY_ICONS,
  SF_SYMBOLS_TO_MATERIAL_ICONS,
} from 'rn-icon-mapper';

import type { IconProps } from './types';

import { useColorScheme } from '@/lib/useColorScheme';

function Icon({
  name,
  materialCommunityIcon,
  materialIcon,
  sfSymbol: _sfSymbol,
  size = 24,
  ...props
}: IconProps) {
  const { colors } = useColorScheme();
  const defaultColor = colors.foreground;

  if (materialCommunityIcon) {
    return (
      <MaterialCommunityIcons
        size={size}
        color={defaultColor}
        {...props}
        {...materialCommunityIcon}
      />
    );
  }
  if (materialIcon) {
    return <MaterialIcons size={size} color={defaultColor} {...props} {...materialIcon} />;
  }
  const materialCommunityIconName =
    SF_SYMBOLS_TO_MATERIAL_COMMUNITY_ICONS[
      name as keyof typeof SF_SYMBOLS_TO_MATERIAL_COMMUNITY_ICONS
    ];
  if (materialCommunityIconName) {
    return (
      <MaterialCommunityIcons
        name={materialCommunityIconName}
        size={size}
        color={defaultColor}
        {...props}
      />
    );
  }
  const materialIconName =
    SF_SYMBOLS_TO_MATERIAL_ICONS[name as keyof typeof SF_SYMBOLS_TO_MATERIAL_ICONS];
  if (materialIconName) {
    return <MaterialIcons name={materialIconName} size={size} color={defaultColor} {...props} />;
  }
  return <MaterialCommunityIcons name="help" size={size} color={defaultColor} {...props} />;
}

export { Icon };