import { View, StyleSheet } from "react-native";
import React from "react";
import ButtonOutline from "../buttons/ButtonOutline";
import useTheme from "@/hooks/useTheme";
import { ThemeTypes } from "@/types";

export default function SocialLogin() {
  const { theme } = useTheme();

  const styles = createStyles({ theme });

  const handleAppleLogin = () => {};

  const handleGoogleLogin = () => {};

  return (
    <View>
      <ButtonOutline
        title="Login with apple"
        onPress={handleAppleLogin}
        style={styles.outLineButton}
      />
      <ButtonOutline
        title="Login with Google"
        onPress={handleGoogleLogin}
        style={styles.outLineButton}
      />
    </View>
  );
}

function createStyles({ theme }: { theme: ThemeTypes }) {
  return StyleSheet.create({
    outLineButton: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: "#6ECC96",
    },
  });
}
