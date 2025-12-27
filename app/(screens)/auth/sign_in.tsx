import { View } from "react-native";
import React, { useEffect } from "react";
import SignInScreen from "@/screens/auth/SignInScreen";
import { useRouter } from "expo-router";
import { useGetUserQuery, useLoginMutation } from "@/store/api/authApi";
import LoaderUI from "@/components/ui/loader/LoaderUI";

export default function SignIn() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  // If already user logged in redirect
  const {
    data: userRes,
    isLoading: isProfileLoading,
    isError,
    error,
  } = useGetUserQuery();
  const user = userRes?.data;

  useEffect(() => {
    if (user?._id) {
      return router.push("/(tabs)");
    }
  }, [user, router]);

  useEffect(() => {
    if (isError) {
      console.error("❌ error while getting user: ", error);
    }
  }, [isError, error]);

  const handleLogin = async (email: string, password: string) => {
    console.log("Email: ", email, "\n Password: ", password);
    if (!email) {
      return alert("Email is missing!");
    } else if (!password) {
      return alert("Password is missing!");
    }
    try {
      const res = await login({ email, password });
      console.log("Completed Login Response: ", res);
      if (res?.data?.success) {
        alert("Your have signed in successfully");
        router.push("/(tabs)");
      }
    } catch (error) {
      console.error("❌ error while singing in: ", error);
      alert("Something went wrong! Please try again.");
    }
  };

  if (isProfileLoading) {
    return <LoaderUI />;
  }

  return (
    <View>
      <SignInScreen handleLogin={handleLogin} isLoading={isLoading} />
    </View>
  );
}
