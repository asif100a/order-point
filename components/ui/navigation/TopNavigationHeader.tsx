import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";

export default function TopNavigationHeader({
  title,
  link,
  description,
}: {
  title: string;
  link: RelativePathString | ExternalPathString | `/?${string}` | `/#${string}` | `/modal?${string}` | `/modal#${string}` | `/_sitemap?${string}` | `/_sitemap#${string}` | "/" | "/modal" | "/_sitemap";
  description: string;
}) {
  const router = useRouter();
  const { theme, colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ theme, colorScheme, primaryColor });

  return (
    <View>
      <View style={styles.titleContainer}>
        {/* Prev Button */}
        <Pressable onPress={() => router.push(link)} style={styles.prevArrow}>
          <AntDesign name="left" size={22} color="black" />
        </Pressable>

        <Text style={styles.title}>{title || ""}</Text>
      </View>
      {/* Description */}
      <Text style={styles.description}>{description || ""}</Text>
    </View>
  );
}

function createStyles({
  theme,
  colorScheme,
  primaryColor,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) {
  return StyleSheet.create({
    prevArrow: {
      width: 38,
      height: 38,
      padding: 8,
      borderRadius: "50%",
      backgroundColor:
        colorScheme === "dark" ? "white" : primaryColor.primaryGray,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "600",
      color: "#303030",
    },
    description: {
      fontWeight: "400",
      lineHeight: 24,
      marginTop: 12,
      fontSize: 16
    },
  });
}
