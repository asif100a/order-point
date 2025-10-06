import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Logo from "@/components/ui/Logo";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, ThemeTypes } from "@/types";

const SignInScreen = () => {
  const { theme, colorScheme } = useTheme();

  const styles = createStyles({ theme, colorScheme });

  return (
    <View style={styles.container}>
      <Logo />
      <Text>SignInScreen</Text>
    </View>
  );
};

export default SignInScreen;

function createStyles({
  theme,
  colorScheme,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
}) {
  return StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: theme.background,
      paddingLeft: 16,
      paddingRight: 16,
      flexDirection: "column",
    },
  });
}
