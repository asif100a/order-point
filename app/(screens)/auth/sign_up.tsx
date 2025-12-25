import { View } from "react-native";
import React from "react";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import { UserType } from "@/types/user.type";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "@/store/api/authApi";

export default function SignUp() {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

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
        alert('Your have signed up successfully')
        router.push("/auth/confirmation_code");
      }
    } catch (error) {
      console.error("❌ error while registering: ", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <View>
      <SignUpScreen handleSignUp={handleSignUp} isLoading={isLoading} />
    </View>
  );
}
