import { View } from "react-native";
import React from "react";
import ConfirmationCodeScreen from "@/screens/auth/ConfirmationCodeScreen";
import { useVerifyOTPMutation } from "@/store/api/authApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import { isApiError } from "@/utils";
import Toast from "react-native-toast-message";

export default function ConfirmationCode() {
  const router = useRouter();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const {destination, email} = useLocalSearchParams();
  console.log("Destination: ", destination)

  const handleConfirmCode = async (code: string) => {
    // console.log("OTP code: ", code);
    try {
      const res = await verifyOTP({ otp: code });
      console.log("Verified Response: ", res);
      if (res?.data?.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: 'You have verified successfully',
        });
        if(destination) {
          router.push(destination as any);
        }else {
          router.push("/(tabs)");
        }
      }
    } catch (error) {
      console.error("❌ error while verifying otp: ", error);
      if (isApiError(error)) {
        Toast.show({
          type: "error",
          text1: "Failed to verifying otp",
          text2: error?.data?.message,
        });
      } else if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Failed to verifying otp",
          text2: error?.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong! Please try again.",
        });
      }
    }
  };

  return (
    <View>
      <ConfirmationCodeScreen
        handleConfirmCode={handleConfirmCode}
        isLoading={isLoading}
        email={email as string}
      />
    </View>
  );
}
