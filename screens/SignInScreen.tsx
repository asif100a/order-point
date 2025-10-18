import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import Logo from "@/components/ui/Logo";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

const SignInScreen = () => {
  const { theme, colorScheme, primaryColor } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const styles = createStyles({ theme, colorScheme, primaryColor });

  return (
    <View style={styles.container}>
      <SafeAreaView>
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
              <Text style={[styles.label, styles.primaryFontSize]}>Email</Text>
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
                />{" "}
                <Text style={styles.primaryFontSize}>Remember me</Text>
              </View>
              <Text style={[styles.primaryFontSize, styles.forgetPassword]}>
                Forget your password?
              </Text>
            </View>
          </View>
        </View>
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
      height: "100%",
      backgroundColor: theme.background,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 32,
      flexDirection: "column",
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
      marginBottom: 4,
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
  });
}
