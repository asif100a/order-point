import { View } from "react-native";
import React from "react";
import CreateNewPasswordScreen from "@/screens/auth/CreateNewPasswordScreen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useResetPasswordMutation } from "@/store/api/authApi";
import Toast from "react-native-toast-message";
import { isApiError } from "@/utils";

export default function CreateNewPassword() {
  const router = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { email } = useLocalSearchParams();

  const handleCreateNewPass = async (newPass: string, confirmPass: string) => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: 'Something went wrong! Please try again',
      });
      console.error('❌ Email is missing')
      return;
    }
    try {
      const res = await resetPassword({
        email,
        newPassword: newPass,
        confirmPassword: confirmPass,
      }).unwrap();
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Password reset successfully",
        });
        router.push("/auth/reset_success");
      }
    } catch (error) {
      console.error("❌ Error while creating new password: ", error);
      if (isApiError(error)) {
        Toast.show({
          type: "error",
          text1: "Failed to create new password",
          text2: error?.data?.message,
        });
      } else if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Failed to create new password",
          text2: error?.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to create new password",
        });
      }
    }
  };

  return (
    <View>
      <CreateNewPasswordScreen
        handleCreateNewPass={handleCreateNewPass}
        isLoading={isLoading}
      />
    </View>
  );
}
