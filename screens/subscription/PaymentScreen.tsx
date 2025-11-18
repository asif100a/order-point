import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import { Image } from "react-native";
import walletIcon from "@/assets/icons/wallet.png";
import TextInputField from "@/components/ui/form/TextInputField";
import NumberInputField from "@/components/ui/form/NumberInputField";

export default function PaymentScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [name, setName] = useState<string>("");
  const [cardNum, setCardNum] = useState<number | undefined>(undefined);

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
        <Text style={styles.title}>Total Amount</Text>
        <Text style={styles.price}>$50.00</Text>
      </View>

      <View style={styles.form}>
        <TextInputField
          label="Card Holder Name"
          placeholder="💳 Your name"
          value={name}
          onTextChange={setName}
        />
        <NumberInputField
          label="Card Number"
          placeholder="💴 123456"
          value={cardNum}
          onNumberChange={setCardNum}
        />
        <DateInputField />
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
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#cccddbff",
      borderRadius: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "semibold",
      fontFamily: "poppins",
    },
    price: {
      fontSize: 32,
      fontWeight: "semibold",
    },
    form: {
        marginTop: 24
    },
  });
}
