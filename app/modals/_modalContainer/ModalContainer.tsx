import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import useTheme from "@/hooks/useTheme";

export default function ModalContainer({
  visible,
  setVisible,
  children,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
}) {
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ primaryColor, colorScheme });

  return (
    <View>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>{children}</View>
        </View>
      </Modal>
    </View>
  );
}

function createStyles({ primaryColor, colorScheme }: { colorScheme: ColorSchemeTypes, primaryColor: PrimaryColorTypes }) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBox: {
      width: "93%",
      backgroundColor: colorScheme === 'dark' ? '#1a1515' : "#fff",
      borderRadius: 10,
      padding: 20,
      elevation: 5,
    },
  });
}
