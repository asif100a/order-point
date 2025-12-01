import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import Profile_Image from "@/assets/images/profile/user.jpg";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import TextInputField from "@/components/ui/form/TextInputField";
import Categories from "@/components/ui/homePage/Categories";
import Ionicons from "@expo/vector-icons/Ionicons";
import FilterModal from "@/components/ui/homePage/FilterModal";

export default function HomeScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topContent}>
          {/* Profile */}
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
                Hello!!{" "}
                <Text style={{ color: primaryColor.greenNormal }}>Shahid</Text>
              </Text>
              <Text style={styles.location}>Mohakhali, Dhaka</Text>
            </View>
          </View>

          {/* 2 Buttons */}
          <View style={styles.iconsContainer}>
            <View style={{ position: "relative" }}>
              {/* Notification */}
              <Pressable style={styles.roundButton}>
                <Feather name="bell" size={24} color="black" />
              </Pressable>

              <View style={styles.dotContainer}>
                <View style={styles.redDot} />
              </View>
            </View>
            {/* Filter */}
            <Pressable
              onPress={() => setFilterOpen(true)}
              style={styles.roundButton}
            >
              <Ionicons name="filter-circle-outline" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Search bar */}
        <TextInputField
          label=""
          placeholder="🔍 Looking for..."
          value={searchTerm}
          onTextChange={setSearchTerm}
        />
      </View>

      {/* Categories */}
      <Categories />

      {/* Bottom Tabs */}

      {/* Modal */}
      <FilterModal visible={filterOpen} onClose={setFilterOpen} />
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: colorScheme === "dark" ? theme.background : "white",
      padding: 20,
    },
    topContainer: {
      width: "100%",
      height: "auto",
    },
    topContent: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    profileImage: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: primaryColor.greenNormal,
      borderRadius: 50,
      width: 50,
      height: 50,
    },
    TopTextContainer: {
      width: "auto",
      height: "auto",
    },
    header: {
      fontSize: 24,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    location: {
      fontSize: 14,
      fontWeight: "normal",
      color: colorScheme === "dark" ? "white" : primaryColor.secondaryBlack,
    },
    iconsContainer: {
      flexDirection: "row",
      gap: 16,
    },
    roundButton: {
      width: 48,
      height: 48,
      backgroundColor: primaryColor.primaryGray,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
    dotContainer: {
      position: "absolute",
      top: 12,
      right: 12,
    },
    redDot: {
      width: 10,
      height: 10,
      backgroundColor: "#FF383C",
      borderRadius: 50,
    },
  });
}
