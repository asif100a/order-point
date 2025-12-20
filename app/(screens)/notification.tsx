import { View } from "react-native";
import React from "react";
import NotificationScreen from "@/screens/NotificationScreen";
import useTheme from "@/hooks/useTheme";

export default function Notification() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <NotificationScreen />
    </View>
  );
}
