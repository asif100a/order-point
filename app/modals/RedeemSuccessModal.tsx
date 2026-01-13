import { View, Text, Platform, Image, StyleSheet } from "react-native";
import React from "react";
import ModalContainer from "./_modalContainer/ModalContainer";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import SuccessIcon from "@/assets/images/common/success_checkmark.png";

export default function RedeemSuccessModal({
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
        <View style={styles.iconContainer}>
          <Image
            source={SuccessIcon}
            alt="Success"
            width={80}
            height={80}
            style={styles.icon}
          />
        </View>

        <Text style={styles.title}>Redeemed Successfully</Text>
        <Text style={styles.description}>Enjoy your discount!</Text>
      </View>
    </ModalContainer>
  );
}

function createStyles({ colorScheme, primaryColor }: {colorScheme: ColorSchemeTypes, primaryColor: PrimaryColorTypes }) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    iconContainer: {
      position: "relative",
      paddingBottom: 24,
    },
    icon: {
      position: "absolute",
      top: -60,
      left: Platform.OS === "web" ? "48%" : "38%",
    },
    title: {
      fontSize: 20,
      fontWeight: 600,
      marginBottom: 8,
      textAlign: "center",
      color: colorScheme === 'dark' ? 'white' : primaryColor.primaryBlack
    },
    description: {
        fontSize: 16,
        fontWeight: 400,
        color: colorScheme === 'dark' ? 'white' : primaryColor.secondaryBlack,
        textAlign: "center",
    }
  });
}
