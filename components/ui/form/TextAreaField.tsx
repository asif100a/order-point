import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";

export default function TextAreaField({
  label = "Text",
  value,
  onTextChange,
  placeholder = "Enter Your Text",
  numberOfLines = 5,
}: {
  label?: string;
  value: string;
  onTextChange: (value: string) => void;
  placeholder?: string;
  numberOfLines?: number;
}) {
  const { colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ colorScheme, primaryColor });

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
      <TextInput
        numberOfLines={numberOfLines}
        multiline
        style={styles.inputField}
        placeholder={placeholder}
        value={value}
        onChangeText={onTextChange}
        keyboardType="default"
        textAlignVertical="top"
      />
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
    },
    label: {
      fontWeight: "500",
      marginBottom: 6,
    },
    inputField: {
      width: "100%",
      height: 120,
      borderWidth: 1,
      backgroundColor:
        colorScheme === "dark" ? "white" : primaryColor.primaryGray,
      borderColor: colorScheme === "dark" ? "white" : primaryColor.primaryGray,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 16
    },
  });
}
