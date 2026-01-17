import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import ModalContainer from "./_modalContainer/ModalContainer";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";

export default function ConfirmModal({
  visible,
  setVisible,
  onConfirm = () => {},
  title,
  description,
  confirmText = "Yes",
  cancelText = "No",
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}) {
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ colorScheme, primaryColor });

  return (
    <ModalContainer visible={visible} setVisible={setVisible}>
      <View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={[styles.button, { backgroundColor: "#BF0000" }]}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalContainer>
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
    container: {},
    title: {
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      fontWeight: 600,
      fontSize: 20,
      marginBottom: 12,
      textAlign: "center",
    },
    description: {
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      fontWeight: 400,
      fontSize: 18,
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: 24,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      width: "48%",
      paddingVertical: 12,
      backgroundColor: primaryColor.primaryGray,
      borderRadius: 50,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 600,
      color: primaryColor.primaryBlack,
      textAlign: "center",
    },
  });
}
