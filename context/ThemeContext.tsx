import { Appearance } from "react-native";
import React, { createContext, useState } from "react";
import { ColorSchemeTypes, ThemeContextTypes } from "@/types";
import { Colors } from "@/constants/theme";

export const ThemeContext = createContext<ThemeContextTypes>({
  colorScheme: Appearance.getColorScheme(),
  setColorScheme: () => {},
  theme: Colors.light,
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeTypes>(
    Appearance.getColorScheme()
  );

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
