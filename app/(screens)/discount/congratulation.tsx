import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SuccessIcon from "@/assets/images/common/success.png";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import Button from "../../../components/ui/buttons/Button";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";

export default function Congratulation() {
  const router = useRouter();
  const { theme, colorScheme, primaryColor } = useTheme();
  const [discountCode] = useState("**********");
  const [copied, setCopied] = useState(false);

  const windowHeight = Dimensions.get("screen").height;

  const styles = createStyles({
    theme,
    colorScheme,
    primaryColor,
    windowHeight,
  });

  const handleCopy = () => {
    // Add your clipboard copy logic here
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigationHeader
          title={"Congratulation!"}
          description=""
          link={"/(tabs)" as any}
        />
        
        <View style={styles.contentWrapper}>
          {/* Badge Icon */}
          <Image source={SuccessIcon} style={styles.image} />
          
          {/* Discount Code Section */}
          <View style={styles.discountSection}>
            <Text style={styles.discountLabel}>
              {"Here's"} your exclusive discount code.
            </Text>
            
            <View style={styles.codeContainer}>
              <Text style={styles.discountCode}>{discountCode}</Text>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={handleCopy}
              >
                <Text style={styles.copyButtonText}>
                  {copied ? "Copied!" : "Copy"}
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.trackingNote}>
              Once you copy this code, it will be counted as used and tracked on your profile.
            </Text>
          </View>

          {/* Bottom Message */}
          <View style={styles.bottomMessage}>
            <Text style={styles.bottomText}>
              Enjoy your discount and keep saving with
            </Text>
            <View style={styles.premiumRow}>
              <Text style={[styles.bottomText, styles.premiumText]}>
                LumeFitness Premium
              </Text>
              <Text style={styles.bottomText}>✨</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function createStyles({
  theme,
  colorScheme,
  primaryColor,
  windowHeight,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
  windowHeight: number;
}) {
  return StyleSheet.create({
    container: {
      height: windowHeight,
      backgroundColor: theme.background,
    },
    safeArea: {
      flex: 1,
      paddingHorizontal: 16,
    },
    contentWrapper: {
      flex: 1,
      justifyContent: "space-between",
      paddingVertical: 20,
    },
    image: {
      width: 200,
      height: 200,
      marginHorizontal: "auto",
      alignSelf: "center",
      marginTop: 40,
    },
    discountSection: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    discountLabel: {
      fontSize: 16,
      textAlign: "center",
      color: theme.text || "#000",
      marginBottom: 20,
    },
    codeContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      borderRadius: 12,
      paddingLeft: 20,
      paddingVertical: 4,
      marginBottom: 16,
    },
    discountCode: {
      flex: 1,
      fontSize: 16,
      color: "#333",
      letterSpacing: 2,
    },
    copyButton: {
      backgroundColor: primaryColor.greenNormal || "#5A8B6F",
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 12,
    },
    copyButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    trackingNote: {
      fontSize: 13,
      textAlign: "center",
      color: "#666",
      lineHeight: 20,
      paddingHorizontal: 8,
    },
    bottomMessage: {
      paddingBottom: 40,
      alignItems: "center",
    },
    bottomText: {
      fontSize: 16,
      textAlign: "center",
      color: theme.text || "#000",
    },
    premiumRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 4,
    },
    premiumText: {
      color: primaryColor.greenNormal || "#5A8B6F",
      fontWeight: "600",
    },
  });
}