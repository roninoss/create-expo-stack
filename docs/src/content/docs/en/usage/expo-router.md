---
title: Expo Router
description: Using Expo Router
---

Expo, a framework for building React Native applications, often uses the `@react-navigation` library for navigation, and Expo Router for file-based routing. Expo Router is designed to manage navigation between screens in React Native and web applications. It leverages the best file-system routing concepts from the web to create a universal application with seamless navigation across platforms.

## Expo Router Features

- **File-Based Routing:** Expo Router allows you to manage navigation by using a file-based approach. When a file is added to the app directory, it automatically becomes a route in your navigation, making it a convenient and intuitive way to structure your app's navigation.

- **Native Integration:** Expo Router is built on top of the powerful React Navigation suite, ensuring that navigation is truly native and platform-optimized by default. This provides a consistent and performant navigation experience across Android, iOS, and the web.

- **Shareable Routes:** Every screen in your app is automatically deep linkable, making any route shareable with links. This enhances the user experience by allowing seamless sharing of specific app content.

- **Offline-First:** Expo Router enables offline-first functionality, caching apps for offline use and providing automatic updates when a new version is published. It can handle all incoming native URLs without a network connection or server.

- **Optimized Routing:** Routes are automatically optimized with lazy-evaluation in production and deferred bundling in development, contributing to efficient performance.

- **Universal Fast Refresh:** Expo Router supports Universal Fast Refresh across Android, iOS, and web, facilitating quick development iteration.

- **Unified Navigation Structure:** Android, iOS, and web share a unified navigation structure, allowing developers to drop down to platform-specific APIs at the route level when needed.

- **Discoverable Content:** Expo Router enables build-time static rendering on the web and universal linking to native, making app content indexable by search engines.

Expo, in combination with @react-navigation and Expo Router, provides a comprehensive and streamlined solution for navigation in React Native and web applications, offering features that enhance performance, shareability, and discoverability.
