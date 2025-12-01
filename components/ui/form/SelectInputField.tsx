import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";

export default function SelectInputField({
  label = "Text",
  value,
  onSelectChange,
  placeholder = "Select a value",
  options,
}: {
  label?: string;
  value: string;
  onSelectChange: (value: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
}) {
  const { colorScheme, primaryColor } = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const styles = createStyles({ colorScheme, primaryColor });
  
  // Find the selected label to display
  const selectedLabel = options.find(opt => opt.value === value)?.label || "";

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
      <Pressable 
        onPress={() => setOpen(true)} 
        style={styles.inputPressable}
      >
        <View style={styles.inputField}>
          <Text style={[
            styles.inputText,
            !selectedLabel && styles.placeholderText
          ]}>
            {selectedLabel || placeholder}
          </Text>
          {/* Dropdown arrow icon */}
          <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
        </View>
      </Pressable>

      {/* Dropdown Modal */}
      <Modal 
        visible={open} 
        transparent 
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              activeOpacity={1} 
              style={styles.modalBox}
            >
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label}</Text>
                <TouchableOpacity 
                  onPress={() => setOpen(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Options List */}
              <ScrollView style={styles.optionsContainer}>
                {options.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.option,
                      item.value === value && styles.selectedOption
                    ]}
                    onPress={() => {
                      onSelectChange(item.value);
                      setOpen(false);
                    }}
                  >
                    <Text style={[
                      styles.optionText,
                      item.value === value && styles.selectedOptionText
                    ]}>
                      {item.label}
                    </Text>
                    {item.value === value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  const isDark = colorScheme === "dark";
  
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
      color: isDark ? "#fff" : "#000",
    },
    inputPressable: {
      width: "100%",
    },
    inputField: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      backgroundColor: isDark ? "#1a1a1a" : primaryColor.primaryGray,
      borderColor: isDark ? "#333" : primaryColor.primaryGray,
      borderRadius: 24,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    inputText: {
      fontSize: 16,
      color: isDark ? "#fff" : "#000",
      flex: 1,
    },
    placeholderText: {
      color: isDark ? "#666" : "#999",
    },
    arrow: {
      fontSize: 12,
      color: isDark ? "#666" : "#999",
      marginLeft: 8,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      maxHeight: "70%",
    },
    modalBox: {
      width: "100%",
      backgroundColor: isDark ? "#1a1a1a" : "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#333" : "#eee",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDark ? "#333" : "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      fontSize: 18,
      color: isDark ? "#fff" : "#666",
      fontWeight: "500",
    },
    optionsContainer: {
      maxHeight: 400,
    },
    option: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2a2a2a" : "#f5f5f5",
    },
    selectedOption: {
      backgroundColor: isDark ? "#2a2a2a" : "#f0f8ff",
    },
    optionText: {
      fontSize: 16,
      color: isDark ? "#fff" : "#000",
      flex: 1,
    },
    selectedOptionText: {
      fontWeight: "600",
      color: isDark ? "#4a9eff" : "#007AFF",
    },
    checkmark: {
      fontSize: 18,
      color: isDark ? "#4a9eff" : "#007AFF",
      fontWeight: "bold",
      marginLeft: 8,
    },
  });
}