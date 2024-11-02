"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { NextUIProvider } from "@nextui-org/react";

// Create a context for the theme
const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook to use theme context
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check local storage for the user's preference
    const savedPreference = localStorage.getItem("darkMode");
    return savedPreference ? JSON.parse(savedPreference) : false;
  });

  // Effect to apply the dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    // Save the preference to local storage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeContext.Provider>
  );
}
