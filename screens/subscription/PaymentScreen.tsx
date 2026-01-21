import { View, Text, StyleSheet , Image } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import walletIcon from "@/assets/icons/wallet.png";
import TextInputField from "@/components/ui/form/TextInputField";
import NumberInputField from "@/components/ui/form/NumberInputField";
import DateInputField from "@/components/ui/form/DateInputField";
import CheckboxField from "@/components/ui/form/CheckboxField";
import Button from "@/components/ui/buttons/Button";
import { useRouter } from "expo-router";

export default function PaymentScreen() {
  const router = useRouter()
  const { colorScheme, theme, primaryColor } = useTheme();
  const [name, setName] = useState<string>("");
  const [cardNum, setCardNum] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date>(new Date());
  const [cvv, setCvv] = useState<number | undefined>(undefined);
  const [checked, setChecked] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handlePayment = () => {
    router.push('/subscription/payment_success')
  }

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title="Payment Info"
        description=""
        link
      />

      <View style={styles.infoContainer}>
        <Image source={walletIcon} width={50} height={60} alt="Wallet" />
        <Text style={styles.title}>Total Amount</Text>
        <Text style={styles.price}>$50.00</Text>
      </View>

      {/* Payment Form */}
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
        {/* Group */}
        <View style={styles.dateCvvContainer}>
          <View style={styles.dateCvv}>
            <DateInputField
              label="Payment Date"
              date={date}
              onDateChange={setDate}
              placeholder="Select a date"
            />
          </View>
          <View style={[styles.dateCvv, { marginLeft: "4%" }]}>
            <NumberInputField
              label="CVV"
              placeholder="***"
              value={cvv}
              onNumberChange={setCvv}
            />
          </View>
        </View>
        {/* Checkbox */}
        <CheckboxField label="Save card data for future payments" value={checked} onValueChange={setChecked} />

        {/* Submit Button */}
        <Button title="Confirm Payment" onPress={handlePayment} />
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
      marginTop: 24,
    },
    dateCvvContainer: {
      flexDirection: "row",
    },
    dateCvv: {
      width: "48%",
    },
  });
}
