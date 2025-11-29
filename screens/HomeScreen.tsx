import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import Profile_Image from "@/assets/images/profile/user.jpg";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, ThemeTypes } from "@/types";

export default function HomeScreen() {
  const router = useRouter();

  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={Profile_Image}
            width={50}
            height={50}
            alt="User Image"
            style={styles.profileImage}
          />
          <View style={styles.TopTextContainer}>
            <Text style={styles.header}>
              Hello!! <Text style={styles.gradientText}>Shahid</Text>
            </Text>
            <Text style={styles.location}>Mohakhali, Dhaka</Text>
          </View>
        </View>

        <View style={styles.iconsContainer}>
          <Pressable style={styles.roundButton}>
            <Feather name="bell" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.roundButton}>
            <MaterialIcons name="menu-open" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeTypes, colorScheme: ColorSchemeTypes) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "auto",
    },
    topContainer: {},
    profileContainer: {},
    profileImage: {},
    TopTextContainer: {},
    header: {},
    gradientText: {

    },
    location: {},
    iconsContainer: {},
    roundButton: {},
  });
}
