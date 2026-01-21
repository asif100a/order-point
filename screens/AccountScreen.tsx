import React, { useState } from "react";
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
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import LoaderUI from "@/components/ui/loader/LoaderUI";
import ConfirmModal from "@/app/modals/ConfirmModal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function AccountScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const router = useRouter();
  const { isAuthLoading, user } = useAuth();
  const [openDeleteProfilePopup, setOpenDeleteProfilePopup] =
    useState<boolean>(false);
  const [openLogoutPopup, setOpenLogoutPopup] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleDeleteAccount = () => {};

  const handleLogout = async () => {
    // Remove the OTP from the AsyncStorage
    await AsyncStorage.removeItem("token");
    // Redirect to the Login page
    router.push("/auth/sign_in");
  };

  if (isAuthLoading) return <LoaderUI />;

  return (
    <View>
      <ScreenContainer>
        <View style={styles.container}>
          <TopNavigationHeader title="Profile" description="" link />

          {/* Profile View */}
          <View style={styles.addPhotoContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  user?.photoUrl ? { uri: user?.photoUrl } : PLACEHOLDER_PROFILE
                }
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionButtonContainer}>
            {/* Edit Profile */}
            <Link href={"/profile/edit_profile"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <FontAwesome name="user-o" size={24} color="black" />
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* Manage Subscription */}
            <Link href={"/subscription/choose_plan"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <FontAwesome6 name="crown" size={24} color="black" />
                  <Text style={styles.buttonText}>Manage Subscription</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* Manage Subscription */}
            <Link href={"/user/contact_us"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <FontAwesome5 name="headset" size={24} color="black" />
                  <Text style={styles.buttonText}>Support</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* Change Password */}
            <Link href={"/profile/change_password"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <Ionicons name="key-outline" size={24} color="black" />
                  <Text style={styles.buttonText}>Change Password</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* Terms & Condition */}
            <Link href={"/common/terms_and_conditions"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.buttonText}>Terms & Condition</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* Privacy & Policy */}
            <Link href={"/common/privacy_policy"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <AntDesign name="check-circle" size={24} color="black" />
                  <Text style={styles.buttonText}>Privacy & Policy</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* FAQ */}
            <Link href={"/common/faq"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <Entypo name="text-document" size={24} color="black" />
                  <Text style={styles.buttonText}>FAQ</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* Notification Manage */}
            <Link href={"/notification"} asChild>
              <Pressable style={styles.actionButton}>
                <View style={styles.logoTextPair}>
                  {/* Icon */}
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.buttonText}>Notification Manage</Text>
                </View>

                {/* Icon */}
                <AntDesign name="right" size={18} color="black" />
              </Pressable>
            </Link>
            {/* Delete Profile */}
            <Pressable
              onPress={() => setOpenDeleteProfilePopup(true)}
              style={styles.actionButton}
            >
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
              onPress={() => setOpenLogoutPopup(true)}
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

      {/* Delete Profile Popup */}
      <ConfirmModal
        visible={openDeleteProfilePopup}
        setVisible={setOpenDeleteProfilePopup}
        title="Are you sure?"
        description="Do you want to delete your profile?"
        onConfirm={handleDeleteAccount}
      />

      {/* Logout Popup */}
      <ConfirmModal
        visible={openLogoutPopup}
        setVisible={setOpenLogoutPopup}
        title="Are you sure you?"
        description="Do want to Log-out your profile?"
        onConfirm={handleLogout}
      />
    </View>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes,
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
    actionButtonContainer: {
      flexDirection: "column",
      gap: 16,
    },
    actionButton: {
      width: "100%",
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
