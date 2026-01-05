import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";

export default function DealsScreen() {
  const { theme } = useTheme();
  const styles = createStyles({ theme });

  //   const windowHeight = Dimensions.get("screen").height;
  return (
    <SafeAreaView style={styles.container}>
      <Text>DealsScreen</Text>
    </SafeAreaView>
  );
}

function createStyles({ theme }: { theme: ThemeTypes }) {
  return StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      flexDirection: "column",
      overflow: "visible",
    },
  });
}
