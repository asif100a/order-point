import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import PLACEHOLDER_PROFILE from "@/assets/images/profile/placeholder_profile.png";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AccountScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const router = useRouter();

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleLogout = async () => {
    // Remove the OTP from the AsyncStorage
    await AsyncStorage.removeItem("token");
    // Redirect to the Login page
    router.push("/auth/sign_in");
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <TopNavigationHeader
          title="Profile"
          description=""
          link={"/(tabs)/analytics" as any}
        />

        {/* Profile View */}
        <View style={styles.addPhotoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={PLACEHOLDER_PROFILE}
              style={styles.image}
              resizeMode="cover"
            />
            <Pressable style={styles.editButton}>
              <Feather
                name="edit-3"
                size={24}
                color={primaryColor.greenNormal}
              />
            </Pressable>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionButtonContainer}>
          {/* Edit Profile */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <FontAwesome name="user-o" size={24} color="black" />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* Manage Subscription */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <FontAwesome6 name="crown" size={24} color="black" />
              <Text style={styles.buttonText}>Manage Subscription</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* Change Password */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <Ionicons name="key-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Change Password</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* Terms & Condition */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <Ionicons name="document-text-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Terms & Condition</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* Privacy & Policy */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <AntDesign name="check-circle" size={24} color="black" />
              <Text style={styles.buttonText}>Privacy & Policy</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* FAQ */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <Entypo name="text-document" size={24} color="black" />
              <Text style={styles.buttonText}>FAQ</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* Notification Manage */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <Ionicons name="notifications-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Notification Manage</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* Delete Profile */}
          <Pressable style={styles.actionButton}>
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <MaterialIcons name="delete-forever" size={24} color="black" />
              <Text style={styles.buttonText}>Delete Profile</Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </Pressable>
          {/* Log Out */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <View style={styles.logoTextPair}>
              {/* Icon */}
              <AntDesign name="logout" size={24} color="black" />
              <Text style={[styles.buttonText, styles.logoutButtonText]}>
                Log Out
              </Text>
            </View>

            {/* Icon */}
            <AntDesign name="right" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    container: {
      marginBottom: 66,
    },
    addPhotoContainer: {
      justifyContent: "space-between",
      paddingVertical: 32,
    },
    imageContainer: {
      marginHorizontal: "auto",
      marginBottom: 40,
      position: "relative",
      width: 200,
      height: 200,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    editButton: {
      position: "absolute",
      bottom: 32,
      right: 16,
      zIndex: 10,
      backgroundColor: "white",
      padding: 6,
      borderRadius: 50,
    },
    actionButtonContainer: {
      flexDirection: "column",
      gap: 16,
    },
    actionButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: primaryColor.primaryGray,
      borderRadius: 50,
    },
    logoTextPair: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 400,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    logoutButton: {
      backgroundColor: primaryColor.secondaryRed,
    },
    logoutButtonText: {
      color: primaryColor.primaryRed,
    },
  });
}
