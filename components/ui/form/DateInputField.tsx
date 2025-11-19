import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInputField({
  label = "Text",
  date,
  onDateChange,
  placeholder = "Enter Your Date",
}: {
  label?: string;
  date: Date | null;
  onDateChange: (value: Date) => void;
  placeholder?: string;
}) {
  const { colorScheme, primaryColor } = useTheme();
  const [show, setShow] = useState<boolean>(false);

  const styles = createStyles({ colorScheme, primaryColor });

  // Function to format the date for displaying
  const formatDate = (rawDate: Date | null) => {
    if (!rawDate || !(rawDate instanceof Date) || isNaN(rawDate.getTime())) {
      return "";
    }
    return rawDate.toLocaleDateString("en-US");
  };

  // Use today's date as fallback when picker opens and no date is set yet
  const pickerValue = date && date instanceof Date && !isNaN(date.getTime()) ? date : new Date()

  // OnChange function
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;

    // On Android, close the picker immediately after selecting a date
    if (Platform.OS === "android") {
      setShow(false);
    }

    // For iOS, you might keep the picker visible for live selection,
    // but typically you close it or rely on a 'Done' button.
    if (currentDate) onDateChange(currentDate);
  };

  const showPicker = () => setShow(true);

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>

      <Pressable onPress={showPicker}>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          value={formatDate(date)}
          editable={false} // Prevent manual text input
        />
      </Pressable>

      {/* Conditionally render the DateTimePicker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={pickerValue}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"} // Use spinner for better iOS look
          onChange={onChange}
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
