import { Colors } from "@/constants/theme";
import React from "react";
import { ImageSourcePropType } from "react-native";

export interface OnboardingTypes {
  title: string;
  description: string;
  image: ImageSourcePropType | undefined;
}

export interface LightTypes {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}
export interface DarkTypes {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}
export interface PrimaryColorTypes {
  primaryBlack: string;
  secondaryBlack: string;
  greenNormal: string;
  secondaryGreen: string
  primaryGray: string;
  primaryRed: string
  secondaryRed: string
}

export interface ColorsTypes {
  light: LightTypes;
  dark: DarkTypes;
  primaryColor: PrimaryColorTypes;
}
export type ColorSchemeTypes = "light" | "dark" | undefined | null;
export type ThemeTypes = LightTypes | DarkTypes;

export interface ThemeContextTypes {
  colorScheme: ColorSchemeTypes;
  setColorScheme: React.Dispatch<React.SetStateAction<ColorSchemeTypes>>;
  theme: ThemeTypes;
  primaryColor: PrimaryColorTypes
}

export interface WidgetTypes {
  id: string;
  title: string;
  description: string;
  icon: ImageSourcePropType | undefined;
}

export interface CategoryType {
  id: string;
  title: string;
  description: string;
  hotelName: string;
  hotelImage: string;
  image: string;
  discount: number;
  date: string;
  startTime: string;
  category: "New Deal" | "Expire Soon";
  location: string;
}