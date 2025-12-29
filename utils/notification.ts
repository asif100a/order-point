import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";

// Types
export interface NotificationContent {
    title: string;
    body: string;
    data?: Record<string, any>;
}

export type NotificationCallback = (notification: Notifications.Notification) => void;
export type NotificationResponseCallback = (response: Notifications.NotificationResponse) => void;

// Confiture notification handler
export const confitureNotificationHandler = (): void => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};

// Register for push notifications
export async function registerForPushNotifications(): Promise<string | null> {
  let token;

  // Configure Android notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // Check if running on physical device
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Request permissions if not granted
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return null;
    }

    // Get the Expo push token
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "", // Replace with the actual project Id
      })
    ).data;

    console.log("Push token: ", token);
  } else {
    console.error("Must use physical device for Push Notifications");
    return null;
  }

  return token;
}

// Register token with the backend sever
export async function registerTokenWithServer(token: string, serverUrl: string): Promise<{success: boolean; message?: string} | null> {
  if (!token) return null;

  try {
    const { data } = await axios.post(`${serverUrl}/register-token`, { token });
    console.log("Token registered with server: ", data);
    return data;
  } catch (error) {
    console.error("Error registering token with server: ", error);
    return null;
  }
}

// Schedule a local notification
export async function scheduleLocalNotification(
  title: string,
  body: string,
  trigger: Notifications.NotificationTriggerInput,
  data: Record<string, any> = {}
): Promise<string> {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger,
    });
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}

// Schedule an immediate notification
export async function sendImmediateNotification(
  title: string,
  body: string,
  data: Record<string, any> = {}
): Promise<string> {
  return scheduleLocalNotification(title, body, null, data);
}

// Cancel all scheduled notifications
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Cancel a specific notification
export async function cancelNotification(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

// Set up notification listeners
export function setupNotificationListeners(
  onNotificationReceived?: NotificationCallback,
  onNotificationResponse?: NotificationResponseCallback
) {
  // Listener for notifications received while app is foregrounded
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Notification received: ", notification);
      if (onNotificationReceived) {
        onNotificationReceived(notification);
      }
    }
  );

  // Listener for user interactions with notifications
  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification tapped: ", response);
      if (onNotificationResponse) {
        onNotificationResponse(response);
      }
    });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

// Get notification permissions status
export async function getNotificationPermissions(): Promise<Notifications.NotificationPermissionsStatus> {
    const permissions = await Notifications.getPermissionsAsync();
    return permissions.status;
}

// Request notification permissions
export async function requestNotificationPermissions(): Promise<Notifications.NotificationPermissionsStatus> {
    const permissions = await Notifications.requestPermissionsAsync();
    return permissions.status;
}