import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      {/* Auth Layouts */}
      <Stack.Screen name="choose_role" options={{ headerShown: false }} />
      <Stack.Screen name="auth_option" options={{ headerShown: false }} />
      <Stack.Screen name="auth/sign_in" options={{ headerShown: false }} />
      <Stack.Screen name="auth/sign_up" options={{ headerShown: false }} />
      <Stack.Screen name="auth/forget_password" options={{ headerShown: false }} />
      <Stack.Screen name="auth/confirmation_code" options={{ headerShown: false }} />
      <Stack.Screen name="auth/create_new_password" options={{ headerShown: false }} />
      <Stack.Screen name="auth/reset_success" options={{ headerShown: false }} />

      {/* Profile Layouts */}
      <Stack.Screen name="profile/add_photo" options={{headerShown: false}} />

      {/* Subscription Layouts */}
      <Stack.Screen name="subscription/choose_plan" options={{headerShown: false}} />
      <Stack.Screen name="subscription/payment" options={{headerShown: false}} />
      <Stack.Screen name="subscription/payment_success" options={{headerShown: false}} />

      {/* Notification */}
      <Stack.Screen name="notification" options={{headerShown: false}} />

      {/* Map */}
      <Stack.Screen name="map" options={{headerShown: false}} />

      {/* Details Page */}
      <Stack.Screen name="details" options={{headerShown: false}} />

      {/* Details Page */}
      <Stack.Screen name="qr_code" options={{headerShown: false}} />
    </Stack>
  );
}
