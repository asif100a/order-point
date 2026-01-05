import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeScreen from "@/screens/HomeScreen";
import { UserRole } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderUI from "@/components/ui/loader/LoaderUI";
import DashboardScreen from "@/screens/business/DashboardScreen";

export default function Index() {
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

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
      } finally {
        setLoading(false);
      }
    };
    getUserRole();
  }, []);

  if (loading) return <LoaderUI />;

  return (
    <View>{userRole === "user" ? <HomeScreen /> : <DashboardScreen />}</View>
  );
}
