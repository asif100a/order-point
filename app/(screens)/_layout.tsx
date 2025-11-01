import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="choose_role" options={{ headerShown: false }} />
      <Stack.Screen name="auth_option" options={{ headerShown: false }} />
      <Stack.Screen name="auth/sign_in" options={{ headerShown: false }} />
      <Stack.Screen name="auth/sign_up" options={{ headerShown: false }} />
      <Stack.Screen name="auth/forget_password" options={{ headerShown: false }} />
      <Stack.Screen name="auth/confirmation_code" options={{ headerShown: false }} />
      <Stack.Screen name="auth/create_new_password" options={{ headerShown: false }} />
    </Stack>
  );
}
