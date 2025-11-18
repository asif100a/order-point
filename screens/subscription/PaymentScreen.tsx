import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import { Image } from "react-native";
import walletIcon from "@/assets/icons/wallet.png";

export default function PaymentScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title="Payment Info"
        description=""
        link={"/subscription/choose_plan" as any}
      />

      <View style={styles.infoContainer}>
        <Image source={walletIcon} width={50} height={60} alt="Wallet" />
      </View>
    </ScreenContainer>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    infoContainer: {
      backgroundColor: primaryColor.primaryGray,
      padding: 16,
      flexDirection: "column",
      gap: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12
    },
  });
}
