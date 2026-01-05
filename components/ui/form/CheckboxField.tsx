import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import { Checkbox } from "expo-checkbox";
import { ExternalPathString, Link, RelativePathString, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CheckboxField({
  value,
  onValueChange,
  label = "",
  linkText = "",
  link = "/",
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  linkText?: string;
  link?:
    | RelativePathString
    | ExternalPathString
    | "/"
    | `/?${string}`
    | `/#${string}`
    | "/modal"
    | `/modal?${string}`
    | `/modal#${string}`;
}) {
  const router = useRouter();
  const { colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ colorScheme, primaryColor });

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        color={value ? "#76A976" : undefined}
      />
      <Text style={styles.label}>
        {label} {" "}
        {linkText && (
          <Link href={link}>
            <Text style={styles.linkText}>{linkText}</Text>
          </Link>
        )}
      </Text>
    </View>
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
    checkboxContainer: {
      flexDirection: "row",
      gap: 8,
      alignItems: 'center'
    },
    label: {
      fontSize: 16,
      color: colorScheme === "dark" ? "white" : primaryColor.secondaryBlack,
    },
    linkText: {
      fontSize: 16,
      fontWeight: 500,
      color: '#556D55',
      textDecorationLine: "underline",
      marginTop: 8,
    },
  });
}
