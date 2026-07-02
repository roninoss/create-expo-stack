---
title: Software Mansion
description: Adding Software Mansion React Native packages
---

Create Expo Stack includes React Native Reanimated and React Native Worklets by default because they are common foundations for modern Expo apps.

## Optional Packages

The interactive prompt only shows packages that can be added to the generated app. Gesture Handler and Screens are automatically included when you choose Expo Router or React Navigation, so they are only shown for apps without a navigation template.

You can also add Software Mansion packages with flags:

| Flag                                 | Package                          |
| ------------------------------------ | -------------------------------- |
| `--react-native-gesture-handler`     | React Native Gesture Handler     |
| `--react-native-screens`             | React Native Screens             |
| `--react-native-svg`                 | React Native SVG                 |
| `--react-native-keyboard-controller` | React Native Keyboard Controller |

Gesture Handler and Screens are already included when you select Expo Router or React Navigation, so these flags are mainly useful for apps without a navigation template.

## Example

```bash
npm create expo-stack myapp --stylesheet --react-native-svg --react-native-keyboard-controller
```
