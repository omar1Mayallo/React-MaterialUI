import { create } from "zustand";
import Cookies from "js-cookie";
import i18next from "i18next";

export enum LanguagesE {
  EN = "en",
  AR = "ar",
}

interface LanguageStateI {
  lang: LanguagesE;
  toggleLang: () => void;
  setLang: (theme: LanguagesE) => void;
}

const storedLang = Cookies.get("lang") as LanguagesE;

export const useLangStore = create<LanguageStateI>((set) => ({
  lang: storedLang || i18next.language,
  setLang: (lang) => {
    i18next.changeLanguage(lang);
    Cookies.set("lang", lang);
    set({ lang });
  },
  toggleLang: () => {
    set((_) => {
      const newLanguage =
        i18next.language === LanguagesE.EN ? LanguagesE.AR : LanguagesE.EN;
      i18next.changeLanguage(newLanguage);
      Cookies.set("lang", newLanguage);
      return { lang: newLanguage };
    });
  },
}));
