"use client";

import React from "react";
import { useLocale } from "../context/LocaleContext";

const LanguageSelector = () => {
  const { locale, translations, setLocale } = useLocale();

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium dark:text-white">
        {translations.ui.language}:
      </label>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="border p-1 rounded text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
      >
        <option value="en">English</option>
        <option value="uk">Українська</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
