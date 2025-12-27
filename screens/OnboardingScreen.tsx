import whiteShape from "@/assets/images/onboarding/white-shape.png";
import Button from "@/components/ui/buttons/Button";
import { Colors } from "@/constants/theme";
import { ColorSchemeTypes, OnboardingTypes, ThemeTypes } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import {
  Appearance,
  GestureResponderEvent,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

interface OnboardingScreenProps {
  data: OnboardingTypes;
  onChangeIndex: React.Dispatch<React.SetStateAction<number>>;
  handleNext: (event: GestureResponderEvent) => void;
  currentIndex: number;
}

export default function OnboardingScreen({
  data,
  onChangeIndex,
  handleNext,
  currentIndex,
}: OnboardingScreenProps) {
  const router = useRouter()

  const colorScheme = Appearance.getColorScheme()

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <ImageBackground
        source={require("../assets/images/onboarding/background.png")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <Image source={data.image} style={styles.image} resizeMode="contain" />

        {/* Skip Button */}
        <Pressable style={styles.skipBtn} onPress={() => router.push('/auth_option')}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </ImageBackground>

      {/* Min Info */}
      <View style={styles.infoContainer}>
        <ImageBackground
          source={whiteShape}
          style={styles.whiteShape}
          resizeMode="cover"
        >
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.description}</Text>

          {/* Slider points */}
          <View style={styles.sliderPointContainer}>
            {[0, 1, 2].map((key) => (
              <Pressable
                key={key}
                onPress={() => onChangeIndex(key)}
                style={[
                  styles.sliderPoint,
                  key === currentIndex && styles.sliderPointActive,
                ]}
              />
            ))}
          </View>

          {/* Next Button */}
          <Button title="Next" onPress={handleNext} />
        </ImageBackground>
      </View>
    </View>
  );
}

function createStyles(theme: ThemeTypes, colorScheme: ColorSchemeTypes) {
  return StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  bgImage: {
    width: "100%",
    height: 642,
  },
  image: {
    width: "100%",
    height: 640,
  },
  skipBtn: {
    position: "absolute",
    top: 64,
    right: 24,
  },
  skipText: {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  whiteShape: {
    width: "auto",
    height: 420,
    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: 'transparent',
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
  }
})
};
