import { ThemeContext } from "@/context/ThemeContext";
import { ThemeContextTypes } from "@/types";
import { useContext } from "react";

export default function useTheme() {
  const theme = useContext<ThemeContextTypes>(ThemeContext);

  if (!theme) {
    console.error("❌ No theme found!");
    return;
  }

  return theme;
}
