import Button from "@/components/ui/buttons/Button";
import CheckboxField from "@/components/ui/form/CheckboxField";
import EmailInputField from "@/components/ui/form/EmailInputField";
import PasswordInputField from "@/components/ui/form/PasswordInputField";
import Logo from "@/components/ui/Logo";
import SocialLogin from "@/components/ui/parts/SocialLogin";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  const router = useRouter();
  const { theme, colorScheme, primaryColor } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const styles = createStyles({ theme, colorScheme, primaryColor });

  const handleLogin = () => {
    router.push('/home')
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Prev Button */}
          <Pressable
            onPress={() => router.push("/auth_option")}
            style={styles.prevArrow}
          >
            <AntDesign name="left" size={22} color="black" />
          </Pressable>
          {/* Logo */}
          <Logo style={styles.logo} />

          {/* Main Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={[styles.description, styles.primaryFontSize]}>
              Hi Welcome back..! Please enter your correct Information And
              continue{" "}
            </Text>

            {/* Form */}
            <View style={styles.form}>
              {/* Email */}
              <EmailInputField value={email} onEmailChange={setEmail} />
              {/* Password */}
              <PasswordInputField
                value={password}
                onPasswordChange={setPassword}
              />

              {/* Remember me & Forget Password */}
              <View style={styles.rememberForgetContainer}>
                {/* Remember me */}
                <CheckboxField
                  value={remember}
                  onValueChange={setRemember}
                  label="Remember me"
                />
                <Pressable onPress={() => router.push("/auth/forget_password")}>
                  <Text style={[styles.primaryFontSize, styles.forgetPassword]}>
                    Forget your password?
                  </Text>
                </Pressable>
              </View>

              <Button title="Login" onPress={handleLogin} />

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={[styles.primaryFontSize, { fontWeight: "500" }]}>
                  Or
                </Text>
                <View style={styles.line} />
              </View>

              <SocialLogin />

              <Text
                style={[
                  styles.primaryFontSize,
                  { marginTop: 24, textAlign: "center" },
                ]}
              >
                Do you have an account?{" "}
                <Pressable onPress={() => router.push("/auth/sign_up")}>
                  <Text style={{ color: "#57C78F", fontWeight: "600" }}>
                    Sign Up
                  </Text>
                </Pressable>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignInScreen;

function createStyles({
  theme,
  colorScheme,
  primaryColor,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 32,
      flexDirection: "column",
      overflow: "visible",
    },
    primaryFontSize: {
      fontSize: 16,
    },
    prevArrow: {
      width: 38,
      height: 38,
      padding: 8,
      borderRadius: "50%",
      backgroundColor:
        colorScheme === "dark" ? "white" : primaryColor.primaryGray,
    },
    logo: {
      marginTop: 48,
    },
    contentContainer: {
      marginTop: 48,
    },
    loginText: {
      fontSize: 32,
      fontWeight: "600",
    },
    description: {
      fontWeight: "400",
      marginTop: 6,
      lineHeight: 24,
    },
    form: {
      marginVertical: 32
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontWeight: "500",
      marginBottom: 6,
    },
    inputField: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      backgroundColor:
        colorScheme === "dark" ? "white" : primaryColor.primaryGray,
      borderColor: colorScheme === "dark" ? "white" : primaryColor.primaryGray,
      borderRadius: 24,
      paddingHorizontal: 16,
    },
    rememberForgetContainer: {
      flexDirection: "row",
      width: "100%",
      alignContent: "center",
      justifyContent: "space-between",
    },
    forgetPassword: {
      color: "#BF0000",
      fontWeight: "500",
    },
    dividerContainer: {
      width: "100%",
      paddingTop: 24,
      paddingBlock: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    line: {
      backgroundColor: primaryColor.primaryBlack,
      flex: 1,
      height: 1,
    },
  });
}
