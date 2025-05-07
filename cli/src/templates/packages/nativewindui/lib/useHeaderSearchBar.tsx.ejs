import { COLORS } from '~/theme/colors';
import { useNavigation } from 'expo-router';
import * as React from 'react';
import { SearchBarProps } from 'react-native-screens';
import { useColorScheme } from './useColorScheme';

export function useHeaderSearchBar(props: SearchBarProps = {}) {
  const { colorScheme, colors } = useColorScheme();
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search...',
        barTintColor: colorScheme === 'dark' ? COLORS.black : COLORS.white,
        textColor: colors.foreground,
        tintColor: colors.primary,
        headerIconColor: colors.foreground,
        hintTextColor: colors.grey,
        hideWhenScrolling: false,
        onChangeText(ev) {
          setSearch(ev.nativeEvent.text);
        },
        ...props,
      } satisfies SearchBarProps,
    });
  }, [navigation, colorScheme, colors.foreground, colors.primary, colors.grey, props]);

  return search;
}
