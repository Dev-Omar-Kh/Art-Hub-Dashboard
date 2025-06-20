import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from './locales/en.json';
import arLang from './locales/ar.json';

const resources = {
    en: {
        translation: enLang
    },
    ar: {
        translation: arLang
    }
};

const currentLang = localStorage.getItem('language') || 'ar';

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ar',
        lng: currentLang,

        interpolation: {
            escapeValue: false
        }

    });

export default i18n;