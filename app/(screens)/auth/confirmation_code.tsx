import { View } from "react-native";
import React from "react";
import ConfirmationCodeScreen from "@/screens/auth/ConfirmationCodeScreen";
import { useVerifyOTPMutation } from "@/store/api/authApi";
import { useRouter } from "expo-router";

export default function ConfirmationCode() {
  const router = useRouter();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const handleConfirmCode = async(code: string) => {
    console.log("OTP code: ", code);
    try {
      const res = await verifyOTP({otp: code});
      console.log("Verified Response: ", res);
      if (res?.data?.success) {
        alert('You have verified successfully')
        router.push("/(tabs)");
      }
    } catch (error) {
      console.error("❌ error while verifying otp: ", error);
      alert(error?.data?.message || "Something went wrong! Please try again.");
    }
  };
  
  return (
    <View>
      <ConfirmationCodeScreen
        handleConfirmCode={handleConfirmCode}
        isLoading={isLoading}
      />
    </View>
  );
}
