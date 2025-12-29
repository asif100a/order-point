import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import ThemeProvider from "@/context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Toast from 'react-native-toast-message';
import { useEffect, useState } from "react";
import { confitureNotificationHandler, registerForPushNotifications, registerTokenWithServer, sendImmediateNotification, setupNotificationListeners } from "@/utils/notification";
import * as Notifications from 'expo-notifications';

export const unstable_settings = {
  anchor: "(tabs)",
};

const SERVER_URL = process.env.EXPO_PUBLIC_BACKEND_URL; 

export default function RootLayout() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  // useEffect(() => {
  //   // Configure notification handler
  //   confitureNotificationHandler();

  //   // Initialize notifications
  //   initializeNotifications();

  //   // Set up listeners
  //   const cleanup = setupNotificationListeners(
  //     // Called when notification is received
  //     (notification: Notifications.Notification) => {
  //       setNotification(notification)
  //     },
  //     // Called when user taps notification
  //     (response: Notifications.NotificationResponse) => {
  //       console.log('User tapped notification: ', response);
  //       const data = response.notification.request.content.data;
  //       // Handle navigation or other actions based on notification data
  //       if(data?.screens) {
  //         // Navigate to specific screen
  //         console.log('Navigate to: ', data.screen);
  //       }
  //     }
  //   )

  //   // Cleanup listeners on unmount
  //   return cleanup;
  // }, [])

  const initializeNotifications = async (): Promise<void> => {
    try {
      // Register for push notifications
      const token = await registerForPushNotifications();

      if(token) {
        setExpoPushToken(token);

        // Register token with your backend server
        await registerTokenWithServer(token, SERVER_URL || '')
      }
    } catch (error) {
      console.error('Error initializing notifications: ', error);
    }
  }

  const handleSendTestNotification = async(): Promise<void> => {
    await sendImmediateNotification("Test Notification 📱", "This is a test from your app!", {screen: 'Home', userId: '123'})
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </Provider>
  );
}
