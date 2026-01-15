import React from "react";
import EditProfileScreen from "@/screens/profile/EditProfileScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useUpdateUserMutation } from "@/store/api/userApi";

export default function EditProfile() {
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

  const handleUpdate = async (
    name: string,
    email: string,
    address: string,
    phoneNumber: string,
    photoURI: string
  ) => {
    if (!photoURI) {
      Toast.show({
        type: "error",
        text1: "Failed to edit profile",
        text2: "Photo not found!",
      });
      return;
    }
    const newData = {
      name,
      contractNumber: phoneNumber,
      latitude: 0,
      longitude: 0,
      address,
    };
    const formData = new FormData();
    formData.append("image", photoURI);
    formData.append("data", JSON.stringify(newData));
    try {
      const res = await updateUser(formData).unwrap();
      console.log("Profile update Res: ", res);
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
          text1: "Failed to update profile",
          text2: errorMessage,
        });
      }

      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully",
        });
      }
    } catch (error) {
      console.error("❌Error while updating profile: ", error);
    }
  };

  return (
    <GestureHandlerRootView>
      <EditProfileScreen
        handleUpdate={handleUpdate}
        isUpdateLoading={isUpdateLoading}
      />
    </GestureHandlerRootView>
  );
}
