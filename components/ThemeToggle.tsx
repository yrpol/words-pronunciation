"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLocale } from "@/context/LocaleContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { translations } = useLocale();

  // Toggles between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">{translations.ui.theme}:</label>

      {/* Button toggle instead of select for better visibility */}
      <button
        onClick={toggleTheme}
        className={`
          px-3 py-1 rounded-md text-sm font-medium
          ${
            theme === "light"
              ? "bg-gray-200 text-gray-800"
              : "bg-gray-700 text-gray-100"
          }
          transition-colors duration-200
        `}
      >
        {theme === "light" ? (
          <span>🌞 {translations.ui.light}</span>
        ) : (
          <span>🌙 {translations.ui.dark}</span>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
