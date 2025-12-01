import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimeInputField({
  label = "Text",
  time,
  onTimeChange,
  placeholder = "Enter Your Text",
}: {
  label?: string;
  time: Date | null;
  onTimeChange: Dispatch<SetStateAction<Date | null>>;
  placeholder?: string;
}) {
  const { colorScheme, primaryColor } = useTheme();
  const [show, setShow] = useState<boolean>(false);

  const styles = createStyles({ colorScheme, primaryColor });

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        value={time?.toLocaleTimeString()}
        keyboardType="default"
        onPress={() => setShow(true)}
      />

      {show && time && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(time) => onTimeChange(time)}
        />
      )}
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
