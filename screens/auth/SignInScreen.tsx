import Button from "@/components/ui/buttons/Button";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline";
import Logo from "@/components/ui/Logo";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  const router = useRouter()
  const { theme, colorScheme, primaryColor } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const styles = createStyles({ theme, colorScheme, primaryColor });

  const handleLogin = () => {};

  const handleAppleLogin = () => {};

  const handleGoogleLogin = () => {};

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
              <View style={styles.inputContainer}>
                <Text style={[styles.label, styles.primaryFontSize]}>
                  Email
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter Your Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, styles.primaryFontSize]}>
                  Password
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter Your Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Remember me & Forget Password */}
              <View style={styles.rememberForgetContainer}>
                {/* Remember me */}
                <View style={styles.rememberMe}>
                  <Checkbox
                    value={remember}
                    onValueChange={setRemember}
                    color={remember ? "#007AFF" : undefined}
                  />
                  <Text style={styles.primaryFontSize}>Remember me</Text>
                </View>
                <Pressable onPress={() => router.push('/auth/forget_password')}>
                  <Text style={[styles.primaryFontSize, styles.forgetPassword]}>
                    Forget your password?
                  </Text>
                </Pressable>
              </View>

              <Button title="Login" onPress={handleLogin} />

              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={[styles.primaryFontSize, { fontWeight: "500" }]}>
                  Or
                </Text>
                <View style={styles.line} />
              </View>

              <ButtonOutline
                title="Login with apple"
                onPress={handleAppleLogin}
                style={styles.outLineButton}
              />
              <ButtonOutline
                title="Login with Goople"
                onPress={handleGoogleLogin}
                style={styles.outLineButton}
              />

              <Text
                style={[
                  styles.primaryFontSize,
                  { marginTop: 24, textAlign: "center" },
                ]}
              >
                Do you have an account?{" "}
                <Text style={{ color: "#57C78F", fontWeight: "600" }}>
                  Sign Up
                </Text>
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
      marginTop: 24,
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
    rememberMe: {
      flexDirection: "row",
      gap: 12,
      alignContent: "center",
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
    outLineButton: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: "#6ECC96",
    },
  });
}
