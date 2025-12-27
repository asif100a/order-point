import React from "react";
import EditProfileScreen from "@/screens/profile/EditProfileScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function EditProfile() {
  const handleUpdate = (name: string, email: string, phoneNumber: string) => {

  };

  return (
    <GestureHandlerRootView>
      <EditProfileScreen handleUpdate={handleUpdate} />
    </GestureHandlerRootView>
  );
}
