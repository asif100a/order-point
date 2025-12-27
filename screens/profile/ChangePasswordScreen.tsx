import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import TextInputField from "@/components/ui/form/TextInputField";
import Button from "@/components/ui/buttons/Button";
import PasswordInputField from "@/components/ui/form/PasswordInputField";

export default function ChangePasswordScreen({handleChangePassword}: {handleChangePassword: (oldPass: string, newPass: string, confirmPass: string) => void}) {
  const { theme, colorScheme, primaryColor } = useTheme();

  //   State definitions
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const styles = createStyles({ theme, colorScheme, primaryColor });

  const handleOnsubmit = () => handleChangePassword(oldPass, newPass, confirmPass);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationHeader
        title="Change Password"
        description=""
        link={"/(tabs)/account" as any}
      />

      <PasswordInputField
        label="Old Password"
        value={oldPass}
        onPasswordChange={setOldPass}
        placeholder="Enter old password"
      />
      <PasswordInputField
        label="New Password"
        value={newPass}
        onPasswordChange={setNewPass}
        placeholder="Enter new password"
      />
      <PasswordInputField
        label="Confirm Password"
        value={confirmPass}
        onPasswordChange={setConfirmPass}
        placeholder="Enter confirm password"
      />

      {/* Submit Button */}
      <Button title="Update" onPress={handleOnsubmit} />
    </SafeAreaView>
  );
}

function createStyles({
  theme,
  colorScheme,
  primaryColor,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      padding: 16,
      height: '100%'
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
      zIndex: 1, // Below the bottom sheet but above content
    },
    addPhotoContainer: {
      justifyContent: "space-between",
      paddingVertical: 32,
    },
    imageContainer: {
      marginHorizontal: "auto",
      width: 150,
      height: 150,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    uploadButton: {
      padding: 8,
      paddingHorizontal: 12,
      backgroundColor: primaryColor.secondaryGreen,
      borderRadius: 8,
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      marginTop: 16,
      marginHorizontal: "auto",
    },
    uploadButtonText: {
      fontSize: 14,
      fontWeight: 400,
      color: primaryColor.greenNormal,
    },
    form: {
      flexDirection: "column",
    },
    uploadContainer: {
      padding: 24,
      gap: 16,
      zIndex: 2, // Above the overlay
    },
    sheetTitle: {
      fontSize: 24,
      fontWeight: "600",
      textAlign: "center",
      color: colorScheme === "dark" ? "#fff" : primaryColor.primaryBlack,
      marginBottom: 16,
    },
    box: {
      backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "white",
      borderRadius: 12,
      overflow: "hidden",
    },
    option: {
      padding: 20,
    },
    buttonText: {
      fontSize: 18,
      textAlign: "center",
      color: colorScheme === "dark" ? "#fff" : primaryColor.primaryBlack,
    },
    divider: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "#444" : "#ddd",
    },
  });
}
