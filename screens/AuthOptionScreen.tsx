import user1 from "@/assets/images/chooseRole/user1.png";
import user2 from "@/assets/images/chooseRole/user2.png";
import Button from "@/components/ui/buttons/Button";
import Logo from "@/components/ui/Logo";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes, WidgetTypes } from "@/types";
import { Link, router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

const widgets: WidgetTypes[] = [
  {
    id: "1",
    title: "Member",
    description: "Select how you want to get started",
    icon: user1,
  },
  {
    id: "2",
    title: "Local Business",
    description: "Select how you want to get started",
    icon: user2,
  },
];

const AuthOptionScreen = () => {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Logo />
        <Text style={styles.description}>
          Discover exclusive local discounts and perks. Sign up today and save
          while supporting your community.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionContainer}>
        {/* Sign In Button */}
        <Button
          title="Sign In"
          onPress={() => router.push("/auth/sign_in")}
          style={{ marginTop: 0 }}
        />
        {/* Sign Up Button */}
        <Button title="Sign Up" onPress={() => router.push("/auth/sign_up")} />

        <Text style={[styles.text, styles.bottomText]}>
          By signing up you confirm that you have read & agree to the our{" "}
          <Link href={"/privacy_policy"} style={styles.link}>Privacy Policy</Link> and{" "}
          <Link href={"/Terms_conditions"} style={styles.link}>Terms & conditions</Link>
        </Text>
      </View>
    </View>
  );
};

export default AuthOptionScreen;

function createStyles(theme: ThemeTypes, colorScheme: ColorSchemeTypes, primaryColor: PrimaryColorTypes) {
  return StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: theme.background,
      paddingLeft: 16,
      paddingRight: 16,
      flexDirection: "column",
    },
    topContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 14,
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
    },
    description: {
      fontSize: 16,
      fontWeight: "regular",
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
      textAlign: "center",
      width: 344,
      marginTop: 16,
    },
    actionContainer: {
      flex: 1,
      width: "100%",
      flexDirection: "column",
    },
    bottomText: {
      textAlign: "center",
      marginTop: 32
    },
    link: {
      color: primaryColor.greenNormal
    }
  });
}
