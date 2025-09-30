import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import onboard1 from "@/assets/images/onboarding/onboarding-1.png";
import whiteShape from "@/assets/images/onboarding/white-shape.png";

export default function index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/onboarding/background.png")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <Image source={onboard1} style={styles.image} resizeMode="contain" />
      </ImageBackground>

      {/* Min Info */}
      <View style={styles.infoContainer}>
        <ImageBackground
          source={whiteShape}
          style={styles.whiteShape}
          resizeMode="cover"
        >
          <Text style={styles.title}>Discover Local Savings</Text>
          <Text style={styles.description}>
            Unlock exclusive discounts and perks at your favorite local
            businesses. Save more while supporting your community—all in one
            app.
          </Text>

          {/* Slider points */}
          <View style={styles.sliderPointContainer}>
            <Pressable style={[styles.sliderPoint, styles.sliderPointActive]} />
            <Pressable style={styles.sliderPoint} />
            <Pressable style={styles.sliderPoint} />
          </View>

          {/* Next Button */}
          <TouchableOpacity activeOpacity={0.7}>
            <LinearGradient
              colors={["#1CD77A", "#0BF3E7"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  bgImage: {
    width: "100%",
    height: 632,
  },
  image: {
    width: "100%",
    height: 628,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  whiteShape: {
    width: 'auto',
    height: 410,
    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "regular",
    textAlign: "center",
    marginTop: 8,
  },
  sliderPointContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  sliderPoint: {
    width: 12,
    height: 12,
    backgroundColor: "#CBEEDC",
    borderRadius: "100%",
  },
  sliderPointActive: {
    backgroundColor: "#57C78F",
  },
  nextButton: {
    width: "100%",
    height: 56,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
