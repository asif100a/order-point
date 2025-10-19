import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "@/hooks/useTheme";
import { ThemeTypes } from "@/types";

export default function ButtonOutline({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
}) {
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <LinearGradient
      colors={["#6ECC96", "#0BF3E7", "#57C78F"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={[styles.gradientBorder, style]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function createStyles(theme: ThemeTypes) {
  return StyleSheet.create({
    gradientBorder: {
      padding: 1,
      borderRadius: 25,
      borderColor: theme.background,
      marginTop: 16
    },
    button: {
      backgroundColor: "#fff",
      borderRadius: 25,
      paddingVertical: 14,
      paddingHorizontal: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}
