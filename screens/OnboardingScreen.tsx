import { OnboardingTypes } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface OnboardingScreenProps {
  data: OnboardingTypes;
  width: number;
}

export default function OnboardingScreen({
  data,
  width,
}: OnboardingScreenProps) {
  const styles = createStyles(width);

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={data.image} style={styles.image} resizeMode="contain" />
      </View>

      {/* Min Info */}
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
    </View>
  );
}

function createStyles(width: number) {
  return StyleSheet.create({
    container: {
      width: width,
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white",
      justifyContent: "space-between",
    },
    imgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: "100%",
      height: 392,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "transparent",
    },
    description: {
      fontSize: 16,
      fontWeight: "regular",
      textAlign: "center",
      marginTop: 8,
    },
  });
}
