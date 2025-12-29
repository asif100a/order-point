import { StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import onboardingLogo from "@/assets/images/onboarding_logo.png";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/onboarding");
    }, 3000);
  }, [router]);

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
