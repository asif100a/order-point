import { useRouter } from "expo-router";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import Toast from "react-native-toast-message";
import { emailRegex, isApiError } from "@/utils";
import { View } from "react-native";
import ForgetPasswordScreen from "@/screens/auth/ForgetPasswordScreen";

export default function ForgetPassword() {
  const router = useRouter();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgetPass = async (email: string) => {
    if (!email) {
      return Toast.show({
        type: "error",
        text1: "Success",
        text2: "Password must be greater than 6 or equal",
      });
    } else if (email && !emailRegex.test(email)) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please provide an valid email",
      });
    }

    try {
      const res = await forgotPassword({
        email,
      }).unwrap();
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "An OTP sent to your email address",
        });
        router.push({
          pathname: "/auth/confirmation_code",
          params: { destination: "/auth/create_new_password", email },
        });
      }
    } catch (error) {
      console.error("❌ Error while sending email: ", error);
      if (isApiError(error)) {
        Toast.show({
          type: "error",
          text1: "Failed to sending email",
          text2: error?.data?.message,
        });
      } else if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Failed to sending email",
          text2: error?.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to sending email",
        });
      }
    }
  };

  return (
    <View>
      <ForgetPasswordScreen
        handleForgetPass={handleForgetPass}
        isLoading={isLoading}
      />
    </View>
  );
}
