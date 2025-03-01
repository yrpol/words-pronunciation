"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Apply theme changes to the DOM
  const applyTheme = (newTheme: string) => {
    // This is critical - apply classes to html element
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      // Remove both classes first
      root.classList.remove("light", "dark");

      // Then add the appropriate one
      root.classList.add(newTheme);

      // Also update the color-scheme for browser UI elements
      root.style.colorScheme = newTheme;
    }
  };

  // Only run once when component mounts (client-side only)
  useEffect(() => {
    setMounted(true);

    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
      applyTheme("dark");
    } else {
      // Default to light mode if no preference
      setThemeState("light");
      applyTheme("light");
    }
  }, []);

  // Theme change function
  const setTheme = (newTheme: string) => {
    if (newTheme !== "light" && newTheme !== "dark") {
      console.error("Invalid theme:", newTheme);
      return;
    }

    // Save in localStorage
    localStorage.setItem("theme", newTheme);

    // Update state
    setThemeState(newTheme);

    // Apply to DOM
    applyTheme(newTheme);

    console.log("Theme changed to:", newTheme);
  };

  // If not mounted yet (server-side rendering), use light theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
