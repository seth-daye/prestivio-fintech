import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import itCommon from './locales/it/common.json';
import itHome from './locales/it/home.json';
import itLoans from './locales/it/loans.json';
import itContact from './locales/it/contact.json';
import itFaq from './locales/it/faq.json';
import itSimulator from './locales/it/simulator.json';
import itApplication from './locales/it/application.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enLoans from './locales/en/loans.json';
import enContact from './locales/en/contact.json';
import enFaq from './locales/en/faq.json';
import enSimulator from './locales/en/simulator.json';
import enApplication from './locales/en/application.json';

import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frLoans from './locales/fr/loans.json';
import frContact from './locales/fr/contact.json';
import frFaq from './locales/fr/faq.json';
import frSimulator from './locales/fr/simulator.json';
import frApplication from './locales/fr/application.json';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esLoans from './locales/es/loans.json';
import esContact from './locales/es/contact.json';
import esFaq from './locales/es/faq.json';
import esSimulator from './locales/es/simulator.json';
import esApplication from './locales/es/application.json';

import deCommon from './locales/de/common.json';
import deHome from './locales/de/home.json';
import deLoans from './locales/de/loans.json';
import deContact from './locales/de/contact.json';
import deFaq from './locales/de/faq.json';
import deSimulator from './locales/de/simulator.json';
import deApplication from './locales/de/application.json';

export const supportedLanguages = [
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'en', label: 'English', flag: 'GB' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
];

export const defaultLanguage = 'it';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { common: itCommon, home: itHome, loans: itLoans, contact: itContact, faq: itFaq, simulator: itSimulator, application: itApplication },
      en: { common: enCommon, home: enHome, loans: enLoans, contact: enContact, faq: enFaq, simulator: enSimulator, application: enApplication },
      fr: { common: frCommon, home: frHome, loans: frLoans, contact: frContact, faq: frFaq, simulator: frSimulator, application: frApplication },
      es: { common: esCommon, home: esHome, loans: esLoans, contact: esContact, faq: esFaq, simulator: esSimulator, application: esApplication },
      de: { common: deCommon, home: deHome, loans: deLoans, contact: deContact, faq: deFaq, simulator: deSimulator, application: deApplication },
    },
    fallbackLng: defaultLanguage,
    supportedLngs: ['it', 'en', 'fr', 'es', 'de'],
    ns: ['common', 'home', 'loans', 'contact', 'faq', 'simulator', 'application'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'prestivio_lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
