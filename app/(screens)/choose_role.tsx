import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ChooseRoleScreen from "@/screens/ChooseRoleScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function ChooseRole() {
  const [isFirstLaunchApp, setIsFirstLaunchApp] = useState(false);
  
    useEffect(() => {
      const getIsFirstLaunch = async () => {
        const firstLaunchStatus = await AsyncStorage.getItem("isFirstLaunch");
        if (firstLaunchStatus === null) {
          setIsFirstLaunchApp(true);
          await AsyncStorage.setItem("isFirstLaunch", "false");
        } else {
          setIsFirstLaunchApp(false);
        }
      };
      getIsFirstLaunch();
    }, []);

  return (
    <View>
      <ChooseRoleScreen isFirstLaunchApp={isFirstLaunchApp} />
    </View>
  );
}
