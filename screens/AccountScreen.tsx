import React from 'react';
import { StyleSheet, View } from 'react-native';
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TopNavigationHeader
          title="Profile"
          description=""
          link={"/(tabs)/analytics" as any}
        />
      </View>
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
  });
}
