import { View } from "react-native";
import React, { useEffect } from "react";
import SignInScreen from "@/screens/auth/SignInScreen";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/store/api/authApi";
import LoaderUI from "@/components/ui/loader/LoaderUI";
import useAuth from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
import { emailRegex } from "@/utils";

export default function SignIn() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const { user, hasToken, isAuthLoading } = useAuth();

  useEffect(() => {
    if (user?._id && !isAuthLoading && hasToken) {
      return router.push("/(tabs)");
    }
  }, [user, router, isAuthLoading, hasToken]);

  const handleLogin = async (email: string, password: string) => {
    console.log("Email: ", email, "\n Password: ", password);
    if (!email) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email is missing!",
      });
    } else if (email && !emailRegex.test(email)) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please provide an valid email",
      });
    } else if (!password) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password is missing",
      });
    } else if (password.length < 6) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password must be greater than 6 or equal",
      });
    }
    try {
      const res = await login({ email, password });
      // console.log("Completed Login Response: ", res);
      
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
          text1: "Login Failed",
          text2: errorMessage,
        });
      }

      if (res?.data?.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Your have signed in successfully",
        });
        router.push("/(tabs)");
      }
    } catch (error) {
      console.error("❌ error while singing in: ", error);
    }
  };

  if (isAuthLoading) {
    return <LoaderUI />;
  }

  return (
    <View>
      <SignInScreen handleLogin={handleLogin} isLoading={isLoading} />
    </View>
  );
}
