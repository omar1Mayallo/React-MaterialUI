import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import customEN from "./locales/en/custom.json";
import customAR from "./locales/ar/custom.json";
import validationsEN from "./locales/en/validations.json";
import validationsAR from "./locales/ar/validations.json";

i18next.use(initReactI18next).init({
  lng: "en", // Default language
  debug: true,
  resources: {
    en: {
      custom: customEN,
      validations: validationsEN,
    },
    ar: {
      custom: customAR,
      validations: validationsAR,
    },
  },
});
