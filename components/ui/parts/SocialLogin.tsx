import { View, StyleSheet } from "react-native";
import React from "react";
import ButtonOutline from "../buttons/ButtonOutline";
import useTheme from "@/hooks/useTheme";
import { ThemeTypes } from "@/types";

export default function SocialLogin({isLoading, disabled}: {isLoading?: boolean; disabled?: boolean}) {
  const { theme } = useTheme();

  const styles = createStyles({ theme });

  const handleAppleLogin = () => {};

  const handleGoogleLogin = () => {};

  return (
    <View>
      <ButtonOutline
        title="Login with Apple"
        onPress={handleAppleLogin}
        style={styles.outLineButton}
        loading={isLoading}
        disabled={disabled}
        />
      <ButtonOutline
        title="Login with Google"
        onPress={handleGoogleLogin}
        style={styles.outLineButton}
        loading={isLoading}
        disabled={disabled}
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
