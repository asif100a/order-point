import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "@/components/ui/buttons/Button";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";

export default function ForgetPasswordScreen() {
  const router = useRouter();
  const { theme, colorScheme, primaryColor } = useTheme();
  const [email, setEmail] = useState<string>("");

  const styles = createStyles({ theme, colorScheme, primaryColor });

  const windowHeight = Dimensions.get("screen").height;
  // console.log("Window Height: ", windowHeight);

  const handleForgetPass = () => {
    router.push("/auth/confirmation_code");
  };

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <TopNavigationHeader
            title="Forget Password"
            link={"/auth/sign_in" as any}
            description="Please enter your email address which was used to create your account"
          />

          {/* Form */}
          <View style={styles.form}>
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
          </View>
          {/* Main Content */}
          <View style={styles.contentContainer}></View>
          <Button
            title="Send Code"
            onPress={handleForgetPass}
            style={{ marginTop: -38 }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

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
    contentContainer: {
      marginTop: 48,
    },
    description: {
      fontWeight: "400",
      marginTop: 12,
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
    sendCode: {
      fontWeight: "500",
      color: primaryColor.greenNormal,
      textAlign: "right",
    },
  });
}
