import { router, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { UserRole } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderUI from "@/components/ui/loader/LoaderUI";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const getUserRole = async () => {
      try {
        setLoading(true);
        const role = await AsyncStorage.getItem("userRole");
        if (role) {
          setUserRole(role as UserRole);
        }
      } catch (error) {
        console.error("❌ Failed to get user: ", error);
        router.push("/choose_role");
      } finally {
        setLoading(false);
      }
    };
    getUserRole();
  }, []);

  if (loading) return <LoaderUI />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: userRole === "user" ? "Home" : "Dashboard",
          tabBarIcon: ({ color }) => {
            if (userRole === "user") {
              return <IconSymbol size={28} name="house.fill" color={color} />;
            } else
              return (
                <MaterialCommunityIcons
                  name="view-dashboard-outline"
                  size={24}
                  color={color}
                />
              );
          },
        }}
      />
      {/* User tabs */}
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bookmark" size={24} color={color} />
          ),
          href: userRole === "user" ? "/favorite" : null,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={24} color={color} />
          ),
          href: userRole === "user" ? "/analytics" : null,
        }}
      />
      {/* Business tabs */}
      <Tabs.Screen
        name="deals"
        options={{
          title: "Deals",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={24}
              color={color}
            />
          ),
          href: userRole === "business" ? "/deals" : null,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="insights" size={24} color={color} />
          ),
          href: userRole === "business" ? "/insights" : null,
        }}
      />
      {/* Common tabs */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bank-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
