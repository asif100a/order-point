import { StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import onboardingLogo from "@/assets/images/onboarding_logo.png";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
  const router = useRouter();
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

  useEffect(() => {
    setTimeout(() => {
      if (isFirstLaunchApp) {
        router.push("/onboarding");
      } else router.push("/choose_role");
    }, 3000);
  }, [router, isFirstLaunchApp]);

  return (
    <LinearGradient
      colors={["#6ECC96", "#0BE4F3", "#57C78F"]}
      style={styles.container}
    >
      <Image
        source={onboardingLogo}
        alt="onboarding-logo"
        style={styles.logo}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 210,
    resizeMode: "contain",
  },
});
