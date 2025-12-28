import { View } from "react-native";
import React from "react";
import SuccessPage from "@/components/ui/page/SuccessPage";
import { useRouter } from "expo-router";

export default function ResetSuccess() {
  const router = useRouter();

  return (
    <View>
      <SuccessPage
        headerTitle="Reset Successful"
        headerDescription=""
        title="Password Reset Successfully"
        description="Now you can go to the home page"
        buttonText="Go to Home"
        navigationLink={"/auth/create_new_password" as any}
        onButtonClick={() => router.push("/(tabs)")}
      />
    </View>
  );
}
