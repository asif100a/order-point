import { View } from "react-native";
import React, { useEffect } from "react";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import { UserType } from "@/types/user.type";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "@/store/api/authApi";
import LoaderUI from "@/components/ui/loader/LoaderUI";
import useAuth from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
import { emailRegex } from "@/utils";

type Fields = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  isCheckedTermsAndConditions: string;
};

const fields: Fields = {
  name: "Name",
  email: "Email",
  phoneNumber: "Phone Number",
  password: "Password",
  confirmPassword: "Confirm Password",
  isCheckedTermsAndConditions: "Checking Terms and Conditions",
};

export default function SignUp() {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  // const { user, hasToken, isAuthLoading } = useAuth();

  // useEffect(() => {
  //   if (user?._id && !isAuthLoading && hasToken) {
  //     return router.push("/(tabs)");
  //   }
  // }, [user, router, isAuthLoading, hasToken]);

  // Verify the User
  const VerifyUser = (user: UserType): boolean => {
    for (const key of Object.keys(user)) {
      if (!user[key as keyof UserType]) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${fields[key as keyof Fields]} is required!`,
        });
        return false;
      }
    }
    if (user.email && !emailRegex.test(user.email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please provide an valid email",
      });
      return false;
    } else if (user.password && user.password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password must be greater than 6 or equal",
      });
      return false;
    }
    if (user.password !== user.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password and Confirm password didn't match",
      });
      return false;
    }
    return true;
  };

  const handleSignUp = async (data: UserType) => {
    // console.log("User data: ", data);
    if (!VerifyUser(data)) return;

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      contractNumber: data.phoneNumber,
    };
    try {
      const res = await register(newUser as any);
      // console.log("Completed Response: ", res);

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
          text1: "Registration Failed",
          text2: errorMessage,
        });
      }

      if (res?.data?.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Your have signed up successfully",
        });
        router.push({
          pathname: "/auth/confirmation_code",
          params: { email: data?.email },
        });
      }
    } catch (error) {
      console.error("❌ error while registering: ", error);
    }
  };

  // if (isAuthLoading) {
  //   return <LoaderUI />;
  // }

  return (
    <View>
      <SignUpScreen handleSignUp={handleSignUp} isLoading={isLoading} />
    </View>
  );
}
