import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";

export default function NumberInputField({
  label = 'Number',
  value,
  onNumberChange,
  placeholder = "Enter Your Number"
}: {
  label?: string,
  value: number | undefined;
  onNumberChange: (value: number | undefined) => void;
  placeholder?: string
}) {
  const { colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ colorScheme, primaryColor });

  const handleChange = (value: string) => {
    if(value === '') {
        onNumberChange(undefined)
    }else {
        const numericValue = Number(value);
        if(!isNaN(numericValue)) {
            onNumberChange(numericValue)
        }
    }
  }

  return (
    <View style={styles.inputContainer}> 
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        value={value !== undefined ? value.toString() : ''}
        onChangeText={handleChange}
        keyboardType="number-pad"
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
      height: 50,
      borderWidth: 1,
      backgroundColor:
        colorScheme === "dark" ? "white" : primaryColor.primaryGray,
      borderColor: colorScheme === "dark" ? "white" : primaryColor.primaryGray,
      borderRadius: 24,
      paddingHorizontal: 16,
    },
  });
}
