import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';

export function DatePicker(
  props: React.ComponentProps<typeof DateTimePicker> & {
    mode: 'date' | 'time' | 'datetime';
  }
) {
  const show = (currentMode: 'time' | 'date') => () => {
    DateTimePickerAndroid.open({
      value: props.value,
      onChange: props.onChange,
      mode: currentMode,
      minimumDate: props.minimumDate,
      maximumDate: props.maximumDate,
    });
  };

  return (
    <View className='flex-row gap-2.5'>
      {props.mode.includes('date') && (
        <View className='relative pt-1.5'>
          <Pressable
            onPress={show('date')}
            className='border border-border active:opacity-80 px-5 py-3 rounded-md'
          >
            <Text variant='subhead'>
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
              }).format(props.value)}
            </Text>
          </Pressable>
          <View className='absolute top-0 left-2 bg-card px-1'>
            <Text variant='caption2' className='text-[10px] opacity-60'>
              Date
            </Text>
          </View>
        </View>
      )}
      {props.mode.includes('time') && (
        <View className='relative pt-1.5'>
          <Pressable
            onPress={show('time')}
            className='border border-border active:opacity-80 px-5 py-3 rounded-md'
          >
            <Text variant='subhead'>
              {new Intl.DateTimeFormat('en-US', {
                timeStyle: 'short',
              }).format(props.value)}
            </Text>
          </Pressable>
          <View className='absolute top-0 left-2 bg-card px-1'>
            <Text variant='caption2' className='text-[10px] opacity-60'>
              Time
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
