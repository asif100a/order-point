import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ModalContainer from "./_modalContainer/ModalContainer";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import { Feather } from "@expo/vector-icons";

export default function VerifyModal({
  visible = false,
  setVisible,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
}) {
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ colorScheme, primaryColor });

  return (
    <ModalContainer
      visible={visible}
      setVisible={setVisible}
      style={{ position: "relative" }}
    >
      {/* Close Button */}
      <TouchableOpacity
        onPress={() => setVisible(false)}
        style={styles.closeButton}
      >
        <Feather name="x" size={20} color={primaryColor.primaryRed} />
      </TouchableOpacity>

      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />

        <Text style={styles.verifyText}>Verifying your membership...</Text>
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
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 24,
      padding: 24,
    },
    closeButton: {
      padding: 4,
      backgroundColor: primaryColor.primaryGray,
      borderRadius: 50,
      position: "absolute",
      top: 8,
      right: 8,
    },
    loader: {},
    verifyText: {
      fontSize: 18,
      fontWeight: 500,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
  });
}
