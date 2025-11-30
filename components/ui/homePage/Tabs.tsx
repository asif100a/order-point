import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";

export default function Tabs({
  tabs,
  active,
  setActive,
}: {
  tabs: string[];
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}) {
  const { colorScheme, theme, primaryColor } = useTheme();
  const screenWidth = Math.round(Dimensions.get("screen").width);
  const styles = createStyle({ tabLength: tabs.length, screenWidth, colorScheme, primaryColor });

  const toCapitalize = (text: string) => {
    return text?.slice(0, 1).toUpperCase() + text.slice(1);
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((t: string) => {
        const isActive = t === active;
        return (
          <TouchableOpacity
            key={t}
            onPress={() => setActive(t)}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {toCapitalize(t)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function createStyle({
  tabLength,
  screenWidth,
  colorScheme,
  primaryColor
}: {
  tabLength: number;
  screenWidth: number;
  colorScheme: ColorSchemeTypes
  primaryColor: PrimaryColorTypes
}) {
  // Calculate tab width accounting for container padding and gaps
  const containerPadding = 8;
  const gap = 10;
  const totalGaps = (tabLength - 1) * gap;
  const availableWidth = screenWidth - 48 - containerPadding * 2 - totalGaps;
  const tabWidth = availableWidth / tabLength;

  return StyleSheet.create({
    tabContainer: {
      flexDirection: "row",
      gap: gap,
      backgroundColor: "#F3F3F5",
      padding: containerPadding,
      borderRadius: 40,
      alignItems: "center",
    },
    tab: {
      width: tabWidth,
      height: 56,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    activeTab: {
      backgroundColor: "#00D9A5", // Your primary color
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    tabText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      color: "#666",
    },
    activeTabText: {
      color: colorScheme === 'dark' ? "#FFF" : primaryColor.primaryBlack,
      fontWeight: "700",
    },
  });
}
