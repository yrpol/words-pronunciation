"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { en } from "../locales/en";
import { uk } from "../locales/uk";

type Locales = {
  [key: string]: any;
};

const locales: Locales = {
  en,
  uk,
};

type LocaleContextType = {
  locale: string;
  translations: any;
  setLocale: (locale: string) => void;
};

const defaultValue: LocaleContextType = {
  locale: "en",
  translations: locales.en,
  setLocale: () => {},
};

const LocaleContext = createContext<LocaleContextType>(defaultValue);

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState("en");
  const [translations, setTranslations] = useState(locales.en);

  useEffect(() => {
    // Try to get the saved language preference from localStorage
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && locales[savedLocale]) {
      setLocaleState(savedLocale);
      setTranslations(locales[savedLocale]);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (locales[browserLang]) {
        setLocaleState(browserLang);
        setTranslations(locales[browserLang]);
      }
    }
  }, []);

  const setLocale = (newLocale: string) => {
    if (locales[newLocale]) {
      localStorage.setItem("locale", newLocale);
      setLocaleState(newLocale);
      setTranslations(locales[newLocale]);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, translations, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
