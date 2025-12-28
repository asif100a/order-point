import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ScreenContainer from "../layout/ScreenContainer";
import TopNavigationHeader from "../navigation/TopNavigationHeader";
import SuccessIcon from "@/assets/images/common/success.png";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import Button from "../buttons/Button";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import ButtonOutline from "../buttons/ButtonOutline";

export default function SuccessPage({
  headerTitle = "",
  headerDescription = "",
  title = "",
  description = "",
  buttonText,
  onButtonClick,
  navigationLink,
  backToHomeBtn = false,
}: {
  headerTitle: string;
  headerDescription: string;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void,
  navigationLink:
    | RelativePathString
    | ExternalPathString
    | "/"
    | `/?${string}`
    | `/#${string}`
    | "/modal"
    | `/modal?${string}`
    | `/modal#${string}`
    | "/_sitemap"
    | `/_sitemap?${string}`
    | `/_sitemap#${string}`;
  backToHomeBtn?: boolean;
}) {
  const router = useRouter();
  const { theme, colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ theme, colorScheme, primaryColor });

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title={headerTitle}
        description={headerDescription}
        link={navigationLink}
      />
      <Image source={SuccessIcon} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button
          title={buttonText}
          onPress={onButtonClick}
        />
        {backToHomeBtn && (
          <ButtonOutline title="Back to Home" onPress={() => router.push('/home' as any)} />
        )}
      </View>
    </ScreenContainer>
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
    image: {
      width: 242,
      height: 212,
      marginHorizontal: "auto",
      marginBottom: 16,
    },
    contentContainer: {
      width: "100%",
      flexDirection: "column",
      gap: 16,
    },
    title: {
      fontSize: 26,
      fontWeight: "semibold",
      textAlign: "center",
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      fontWeight: "normal",
      textAlign: "center",
    },
  });
}
