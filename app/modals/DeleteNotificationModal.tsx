import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import ModalContainer from "./_modalContainer/ModalContainer";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";

export default function DeleteNotificationModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
}) {
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ colorScheme, primaryColor });

  return (
    <ModalContainer visible={visible} setVisible={setVisible}>
      <View>
        <View>
          <Text style={styles.title}>Are you sure!</Text>
          <Text style={styles.description}>
            Do you want to delete Notification?
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#BF0000" }]}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>Yes</Text>
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
