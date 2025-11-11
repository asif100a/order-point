import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";

export default function ScreenContainer({
  children,
  customStyles = {},
}: {
  children: React.ReactNode;
  customStyles?: object
}) {
  const { theme } = useTheme();
  const styles = createStyles({ theme });

  const windowHeight = Dimensions.get("screen").height;

  return (
    <View style={[styles.container, { height: windowHeight }, customStyles]}>
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function createStyles({ theme }: { theme: ThemeTypes }) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 32,
      flexDirection: "column",
      overflow: "visible",
    },
  });
}
