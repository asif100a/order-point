import { View } from "react-native";
import React from "react";
import ChangePasswordScreen from "@/screens/profile/ChangePasswordScreen";
import { useChangePasswordMutation } from "@/store/api/authApi";
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
        type: "error",
        text1: "Error",
        text2: "Old Password must be greater than 6 or equal",
      });
    } else if (newPass.length < 6) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "New Password must be greater than 6 or equal",
      });
    } else if (confirmPass !== newPass) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "New password and Confirm password didn't match",
      });
    }

    try {
      const res = await changePassword({
        oldPassword: oldPass,
        newPassword: newPass,
      }).unwrap();
      // ✅ Check for error in the response
      if ("error" in res) {
        // Handle different error types
        const err = res.error as {
          status?: number;
          message?: string;
          data?: { message: string };
        };
        const errorMessage =
          "status" in err && err.status != null
            ? `Error: ${err.status} ${err.message || err?.data?.message}`
            : "Unknown error";

        return Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: errorMessage,
        });
      }

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
    }
  };
  return (
    <View>
      <ChangePasswordScreen
        handleChangePassword={handleChangePassword}
        isLoading={isLoading}
      />
    </View>
  );
}
