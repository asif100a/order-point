import { ThemeContext } from "@/context/ThemeContext";
import { ThemeContextTypes } from "@/types";
import { useContext } from "react";

export default function useTheme() {
  const theme = useContext<ThemeContextTypes>(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used within a ThemeContext.Provider");
  }

  return theme;
}
