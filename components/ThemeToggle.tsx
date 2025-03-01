"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { translations } = useLocale();

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium dark:text-white">
        {translations.ui.theme}:
      </label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="border p-1 rounded text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
      >
        <option value="light">{translations.ui.light}</option>
        <option value="dark">{translations.ui.dark}</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
