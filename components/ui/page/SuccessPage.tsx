import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ScreenContainer from "../layout/ScreenContainer";
import TopNavigationHeader from "../navigation/TopNavigationHeader";
import SuccessIcon from "@/assets/images/common/success.png";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";

export default function SuccessPage({
  headerTitle = "",
  headerDescription = "",
  navigationLink,
}: {
  headerTitle: string;
  headerDescription: string;
  navigationLink: string;
}) {
  const { theme, colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ theme, colorScheme, primaryColor });

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title={headerTitle}
        description={headerDescription}
        link={navigationLink}
      />
      <Image source={SuccessIcon} />
    </ScreenContainer>
  );
}

function createStyles({
  theme,
  colorScheme,
  primaryColor,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) {
  return StyleSheet.create({});
}
