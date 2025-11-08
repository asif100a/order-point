import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import Button from "@/components/ui/buttons/Button";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";

export default function ConfirmationCodeScreen() {
  const router = useRouter();
  const { theme, colorScheme, primaryColor } = useTheme();
  const [email, setEmail] = useState<string>("");

  const styles = createStyles({ theme, colorScheme, primaryColor });

  const windowHeight = Dimensions.get("screen").height;
  const windowWidth = Dimensions.get("screen").width;
  // console.log("Window Height: ", windowHeight);
  // console.log("Window Width: ", windowWidth);

  const handleForgetPass = () => {
    router.push("/auth/create_new_password");
  };

  const otpLength = Array.from({ length: 6 }).map((_, i) => ({
    id: i.toString(),
  }));

  // const otpFields = () => (

  // );

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <TopNavigationHeader
            title="Confirm OTP"
            link={"/auth/forget_password" as any}
            description="To confirm your account, enter the 6-digit code we
sent to shahidhasn@gmail.com"
          />

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, styles.primaryFontSize]}>
                Enter OTP
              </Text>
              <View style={styles.otpContainer}>
                {otpLength.map((item) => (
                  <TextInput
                    key={item.id}
                    style={styles.inputField}
                    placeholder=""
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="numeric"
                  />
                ))}
              </View>
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
    otpContainer: {
      flex: 1,
      flexDirection: "row",
      gap: 10,
    },
    inputField: {
      width: 48,
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
