import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { fallbackChecker } from './fallbackChecker';
import { languageDetector } from './languageDetector';

type Init18n = {
  resources: Resource;
  fallbackLng: string;
};

export const init18n = ({ resources, fallbackLng }: Init18n) => {
  return i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: fallbackChecker(resources, fallbackLng),
      compatibilityJSON: 'v3', // By default React Native projects does not support Intl
      interpolation: {
        escapeValue: false,
      },
    });
};
