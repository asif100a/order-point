import { View } from "react-native";
import React from "react";
import ChangePasswordScreen from "@/screens/profile/ChangePasswordScreen";

export default function ChangePassword() {
  const handleChangePassword = (
    oldPass: string,
    newPass: string,
    confirmPass: string
  ) => {
    if (oldPass.length < 6) {
      return alert("Password must be greater than 6 or equal");
    } else if (newPass.length < 6) {
      return alert("Password must be greater than 6 or equal");
    } else if (confirmPass !== newPass) {
      return alert("New password and Confirm password didn't match");
    }
  };
  return (
    <View>
      <ChangePasswordScreen handleChangePassword={handleChangePassword} />
    </View>
  );
}
