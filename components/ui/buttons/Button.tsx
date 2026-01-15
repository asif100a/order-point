import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "@/hooks/useTheme";

export default function Button({
  title,
  onPress,
  style,
  height,
  padding,
  loading,
  disabled,
}: {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
  height?: number;
  padding?: number;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}) {
  const { primaryColor } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => {}}
      activeOpacity={0.7}
      style={[{ marginTop: 20 }, style]}
      disabled={loading || disabled}
    >
      <LinearGradient
        colors={["#556D55", "#76A976"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[styles.button, { height: height ?? 56, padding: padding ?? 0 }]}
      >
        {loading ? (
          <ActivityIndicator size="large" color={primaryColor.primaryRed} />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 56,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
