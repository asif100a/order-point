import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/buttons/Button";
import CheckboxField from "@/components/ui/form/CheckboxField";
import EmailInputField from "@/components/ui/form/EmailInputField";
import NumberInputField from "@/components/ui/form/NumberInputField";
import PasswordInputField from "@/components/ui/form/PasswordInputField";
import TextInputField from "@/components/ui/form/TextInputField";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignUpScreen() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false)

  const { theme, colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ theme, colorScheme, primaryColor });

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title=""
        description=""
        link={"/auth_option" as any}
      />
      <Logo />

      <View>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.description}>
          Fill your information below or register with your account.
        </Text>

        <View style={styles.formContainer}>
          {/* Name */}
          <TextInputField
            value={name}
            onTextChange={setName}
            label="User Name"
            placeholder="Enter your name"
          />
          {/* Email */}
          <EmailInputField value={email} onEmailChange={setEmail} />
          {/* Phone Number */}
          <NumberInputField
            value={phoneNumber}
            onNumberChange={setPhoneNumber}
            placeholder="Enter your phone number"
          />
          {/* Password */}
          <PasswordInputField value={password} onPasswordChange={setPassword} />
          {/* Confirm Password */}
          <PasswordInputField
            value={password}
            onPasswordChange={setPassword}
            label="Confirm password"
            placeholder="Enter your confirm password"
          />
          {/* Check Button */}
          <CheckboxField value={checked} onValueChange={setChecked} label="By agreeing to the" linkText="Terms & Condition" />

          {/* Submit Button */}
          <Button title="Sign Up" />
        </View>
      </View>
    </ScreenContainer>
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
    title: {
      fontSize: 32,
      fontWeight: "semibold",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    description: {
      fontSize: 16,
      fontWeight: "normal",
      color: colorScheme === "dark" ? "white" : primaryColor.secondaryBlack,
    },
    formContainer: {
      marginTop: 32,
    },
  });
}
