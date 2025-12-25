import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import Button from "@/components/ui/buttons/Button";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";

export default function ConfirmationCodeScreen({
  handleConfirmCode,
  isLoading,
}: {
  handleConfirmCode: (otp: string) => void;
  isLoading: boolean;
}) {
  const { theme, colorScheme, primaryColor } = useTheme();

  // Store OTP as array of 6 digits
  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]);

  // Create refs for each input to manage focus
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const styles = createStyles({ theme, colorScheme, primaryColor });
  const windowHeight = Dimensions.get("screen").height;

  const handleOtpChange = (text: string, index: number) => {
    // Only allow single digit
    if (text.length > 1) {
      text = text.slice(-1);
    }

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = text;
    setOTP(newOtp);

    // Auto-focus next input if digit entered
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace - move to previous input
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = () => {
    const otpString = otp.join("");

    // Validate OTP is complete
    if (otpString.length === 6) {
      handleConfirmCode(otpString);
    } else {
      // Show error or alert
      alert("Please complete the OTP code");
      console.warn("Please enter complete OTP");
    }
  };

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TopNavigationHeader
            title="Confirm OTP"
            link={"/auth/forget_password" as any}
            description="To confirm your account, enter the 6-digit code we sent to shahidhasn@gmail.com"
          />

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, styles.primaryFontSize]}>
                Enter OTP
              </Text>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={styles.inputField}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    selectTextOnFocus
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}></View>

          <Button
            title="Verify Code"
            onPress={onSubmit}
            style={{ marginTop: -38 }}
            loading={isLoading}
            loadingText="Verifying..."
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
      fontSize: 20,
      fontWeight: "600",
    },
    sendCode: {
      fontWeight: "500",
      color: primaryColor.greenNormal,
      textAlign: "right",
    },
  });
}
