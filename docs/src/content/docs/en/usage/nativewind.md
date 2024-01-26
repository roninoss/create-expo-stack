---
title: NativeWind
description: Using NativeWind
---

NativeWind is a styling solution that leverages Tailwind CSS as a scripting language to create a universal styling system for React Native applications. It enables the sharing of styled components across all React Native platforms while utilizing the most suitable style engine for each platform—CSS StyleSheet on the web and StyleSheet.create for native.

## Key Features

- **Universal Styling:** Utilizes Tailwind CSS to provide a consistent styling experience across all React Native platforms, improving developer UX, component performance, and code maintainability.

- **Build Time Processing:** Styles are processed during the application's build time, using the Tailwind CSS compile. This approach enhances efficiency and generates styles at build time.

- **Fast Runtime:** Employs a small runtime to selectively apply responsive styles based on changes to device orientation, color scheme, and other factors. This ensures a fast and optimized runtime performance.

- **Developer UX:** Includes plugins for easy setup and improved IntelliSense support, enhancing the overall developer experience.

- **Rich Feature Set:** Offers various features such as dark mode, arbitrary classes, media queries, themes, custom values, and plugins, providing a comprehensive set of tools for styling.

- **Pseudo Classes and Parent State Styles:** Supports pseudo-classes like hover, focus, and active on compatible components. Additionally, parent state styles automatically style children based on parent pseudo-classes.

## Universal Style System

A universal style system, as implemented by NativeWind, includes:

- **Static Styles:** Basic static styles for components.
- **UI State Styles:** Styles for UI states like active, hover, focus, etc.

- **Responsive Styles:** Support for responsive styles, including media queries and dynamic units.

- **Device State Styles:** Adaptable styles based on device states such as orientation and color scheme.

- **Styling Inheritance:** Enables styling inheritance for components.

- **Best Rendering Engine:** Utilizes the best rendering engine available for each platform, using CSS for web and providing a compatibility layer between React Native and CSS for native.

By offering these features, NativeWind allows developers to focus on building their systems rather than creating a custom style system, making it a universal styling solution for React Native platforms.
