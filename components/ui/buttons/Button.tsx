import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Button({
  title,
  onPress,
  style,
  height,
  padding,
  loading,
  loadingText,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  height?: number;
  padding?: number;
  loading?: boolean;
  loadingText?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[{ marginTop: 20 }, style]}
      disabled={loading}
    >
      <LinearGradient
        colors={["#1CD77A", "#0BF3E7"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[styles.button, { height: height ?? 56, padding: padding ?? 0 }]}
      >
        <Text style={styles.buttonText}>
          {loading ? loadingText || title : title}
        </Text>
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
  },
});
