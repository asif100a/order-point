import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import Tabs from "./Tabs";

const TABS = ["Featured", "New", "Near by me"];

export default function Categories() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <View style={styles.container}>
      <Text>Categories</Text>
      {/* Tabs */}
      <Tabs tabs={TABS} active={activeTab} setActive={setActiveTab} />
    </View>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "auto",
    },
  });
}
