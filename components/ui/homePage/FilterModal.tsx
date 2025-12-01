import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import Button from "../buttons/Button";
import DateInputField from "../form/DateInputField";

export default function FilterModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: (value: boolean) => void;
}) {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleSearch = () => {};

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={() => onClose(false)}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        {/* Form */}
        <View style={styles.formContainer}>
          <DateInputField
            label="Date"
            placeholder="Enter Date"
            date={selectedDate}
            onDateChange={setSelectedDate}
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => onClose(false)}
            style={styles.cancelButton}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          {/* Search Button */}
          <Button
            title="Search by Filter"
            onPress={handleSearch}
            height={48}
            style={{ width: "48%", marginTop: 0 }}
          />
        </View>
      </View>
    </Modal>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalContainer: {
      width: "100%",
      height: "auto",
      position: "absolute",
      top: 0,
      padding: 16,
      borderRadius: 16,
      backgroundColor: colorScheme === "dark" ? "#000000" : "white",
    },
    formContainer: {
      width: "100%",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cancelButton: {
      width: "48%",
      height: 48,
      color: primaryColor.greenNormal,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: primaryColor.greenNormal,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    cancelText: {
      fontSize: 18,
      fontWeight: "medium",
      color: primaryColor.greenNormal,
    },
  });
}
