import { StyleSheet, Image, View } from "react-native";
import React, { useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/choose_role");
    }, 3000);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={logo} alt="Save Key" style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9EFEB",
  },
  logo: {
    width: 280,
    height: 252,
    resizeMode: "contain",
  },
});
