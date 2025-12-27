import { View } from "react-native";
import React, { useEffect } from "react";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import { UserType } from "@/types/user.type";
import { useRouter } from "expo-router";
import { useGetUserQuery, useRegisterMutation } from "@/store/api/authApi";
import LoaderUI from "@/components/ui/loader/LoaderUI";

export default function SignUp() {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

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

  // Verify the User
  const VerifyUser = (user: UserType): boolean => {
    for (const key of Object.keys(user)) {
      if (!user[key as keyof UserType]) {
        alert(`${key} is required!`);
        return false;
      }
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (user.email && !emailRegex.test(user.email)) {
      alert("Please provide an valid email");
      return false;
    }
    if (user.password !== user.confirmPassword) {
      alert("Password and Confirm password didn't match");
      return false;
    }
    return true;
  };

  const handleSignUp = async (data: UserType) => {
    // console.log("User data: ", data);
    if (VerifyUser(data) === false) {
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      contractNumber: data.phoneNumber,
    };
    try {
      const res = await register(newUser as any);
      // console.log("Completed Response: ", res);
      if (res?.data?.success) {
        alert("Your have signed up successfully");
        router.push("/auth/confirmation_code");
      }
    } catch (error) {
      console.error("❌ error while registering: ", error);
      alert("Something went wrong! Please try again.");
    }
  };

  if (isProfileLoading) {
    return <LoaderUI />;
  }

  return (
    <View>
      <SignUpScreen handleSignUp={handleSignUp} isLoading={isLoading} />
    </View>
  );
}
