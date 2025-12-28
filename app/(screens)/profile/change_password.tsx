import { View } from "react-native";
import React from "react";
import ChangePasswordScreen from "@/screens/profile/ChangePasswordScreen";
import { useChangePasswordMutation } from "@/store/api/authApi";
import { isApiError } from "@/utils";
import Toast from "react-native-toast-message";

export default function ChangePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (
    oldPass: string,
    newPass: string,
    confirmPass: string,
    reset: () => void
  ) => {
    if (oldPass.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Old Password must be greater than 6 or equal'
      });
    } else if (newPass.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'New Password must be greater than 6 or equal'
      });
    } else if (confirmPass !== newPass) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "New password and Confirm password didn't match"
      });
    }

    try {
      const res = await changePassword({
        oldPassword: oldPass,
        newPassword: newPass,
      }).unwrap();
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Password changed successfully",
        });
        reset();
      }
    } catch (error) {
      console.error("❌ Error while changing password: ", error);
      if (isApiError(error)) {
        Toast.show({
          type: "error",
          text1: "Failed to changing password",
          text2: error?.data?.message,
        });
      } else if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Failed to changing password",
          text2: error?.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to changing password",
        });
      }
    }
  };
  return (
    <View>
      <ChangePasswordScreen handleChangePassword={handleChangePassword} isLoading={isLoading} />
    </View>
  );
}
