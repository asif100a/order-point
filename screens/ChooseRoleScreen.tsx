import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ColorSchemeTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import LOGO from "@/assets/images/chooseRole/logo.png";
import user1 from "@/assets/images/chooseRole/user1.png";
import user2 from "@/assets/images/chooseRole/user2.png";

const ChooseRoleScreen = () => {
  const { colorScheme, theme } = useTheme();

  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LOGO} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.text, styles.title]}>Choose your role</Text>
        <Text style={styles.description}>
          Select how you want to get started
        </Text>
      </View>

      {/* Widget */}
      <View style={styles.widget}>
        <Image source={user1} style={styles.icon} />
        <Text style={[styles.text, styles.widgetTitle]}>Member</Text>
        <Text style={[styles.text, styles.widgetDescription]}>
          Select how you want to get started
        </Text>
      </View>
    </View>
  );
};

export default ChooseRoleScreen;

function createStyles(theme: ThemeTypes, colorScheme: ColorSchemeTypes) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingLeft: 16,
      paddingRight: 16,
    },
    logoContainer: {
      alignItems: "center",
      paddingTop: 40,
    },
    logo: {
      width: "auto",
      height: "auto",
    },
    contentContainer: {
      flex: 1,
    },
    text: {
      color: colorScheme === "dark" ? theme.text : theme.primaryBlack,
    },
    title: {
      fontSize: 32,
      fontWeight: "semibold",
    },
    description: {
      fontSize: 16,
      fontWeight: "regular",
      color: colorScheme === "dark" ? theme.text : theme.primaryBlack,
    },
    widget: {
      borderColor: "#E6F7EE",
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "#F9FEFE",
      padding: 16,
    },
    icon: {},
    widgetTitle: {},
    widgetDescription: {},
  });
}
