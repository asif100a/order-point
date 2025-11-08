import React, { useState } from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { StyleSheet, View } from "react-native";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import PasswordInputField from "@/components/ui/form/PasswordInputField";
import Button from "@/components/ui/buttons/Button";
import { useRouter } from "expo-router";

export default function CreateNewPasswordScreen() {
  const router = useRouter();
  const { theme, colorScheme, primaryColor } = useTheme();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const styles = createStyles({ theme, colorScheme, primaryColor });

  const handleCreateNewPass = () => {
    router.push("/auth/reset_success");
  };

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title="Create new password"
        description="Please create and enter a new password for 
your account"
        link={"/auth/confirmation_code" as any}
      />

      <View style={styles.form}>
        <PasswordInputField
          value={newPassword}
          onPasswordChange={setNewPassword}
          label="New Password"
          placeholder="Enter your new password"
        />
        <PasswordInputField
          value={confirmPassword}
          onPasswordChange={setConfirmPassword}
          label="Confirm Password"
          placeholder="Enter your confirm password"
        />
        <Button title="Update" onPress={handleCreateNewPass} />
      </View>
    </ScreenContainer>
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
    primaryFontSize: {
      fontSize: 16,
    },
    contentContainer: {
      marginTop: 48,
    },
    description: {
      fontWeight: "400",
      marginTop: 12,
      lineHeight: 24,
    },
    form: {
      marginTop: 24,
    },
  });
}
