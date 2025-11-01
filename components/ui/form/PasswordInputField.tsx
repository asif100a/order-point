import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import Feather from "@expo/vector-icons/Feather";

export default function PasswordInputField({
  value,
  onPasswordChange,
  label = 'Password',
  placeholder = "Enter Your Password"
}: {
  value: string;
  onPasswordChange: (value: string) => void;
  label?: string;
  placeholder?: string
}) {
  const { colorScheme, primaryColor } = useTheme();
  const [isSecure, setIsSecure] = useState(true);

  const styles = createStyles({ colorScheme, primaryColor });

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        value={value}
        onChangeText={onPasswordChange}
        secureTextEntry={isSecure}
      />
      <Pressable onPress={() => setIsSecure(!isSecure)} style={styles.eyeIcon}>
        {isSecure ? (
          <Feather name="eye" size={24} color="black" />
        ) : (
          <Feather name="eye-off" size={24} color="black" />
        )}
      </Pressable>
    </View>
  );
}

function createStyles({
  colorScheme,
  primaryColor,
}: {
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) {
  return StyleSheet.create({
    primaryFontSize: {
      fontSize: 16,
    },
    inputContainer: {
      marginBottom: 16,
      position: "relative",
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
    eyeIcon: {
        position: 'absolute',
        bottom: 12,
        right: 14
    }
  });
}
