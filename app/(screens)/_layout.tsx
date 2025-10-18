import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="choose_role" options={{ headerShown: false }} />
      <Stack.Screen name="auth_option" options={{ headerShown: false }} />
      <Stack.Screen name="sign_in" options={{ headerShown: false }} />
      <Stack.Screen name="sign_up" options={{ headerShown: false }} />
    </Stack>
  );
}
