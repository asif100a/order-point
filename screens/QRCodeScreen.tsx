import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import qrCodePhoto from "@/assets/images/qrCode/qr_code.png";
import CategoryImg1 from "@/assets/images/category/category1.png";
import hotelImg from "@/assets/images/category/hotel.png";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function QRCodeScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TopNavigationHeader
          title="QR Code"
          description=""
          link={"/(tabs)" as any}
        />

        <View style={styles.card}>
          {/* Image */}
          <View
            style={{
              position: "relative",
              width: "100%",
              // overflow: "hidden",
            }}
          >
            <Image
              source={qrCodePhoto}
              width={272}
              height={272}
              alt={"QR code"}
              style={styles.image}
            />

            {/* QR code info */}
            <View style={styles.qrCodeInfo}>
              <Text style={styles.limitationText}>
                This QR code Valid for only 10 minutes
              </Text>
              <Text style={styles.expirationText}>Expiration will be: 10:00</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            {/* Hotel Name & Location */}
            <View style={styles.hotelLocationContainer}>
              <View style={styles.hotel}>
                <Image
                  source={hotelImg}
                  alt={"Hotel Image"}
                  width={32}
                  height={32}
                />
                <Text style={styles.hotelText}>{"Daily Daawat-Gulshan 1"}</Text>
              </View>
            </View>
            {/* Title & Description */}
            <View style={styles.titleDescriptionContainer}>
              <View style={styles.titleContainer}>
                <Image
                  source={CategoryImg1}
                  alt={"Category Image"}
                  width={60}
                  height={34}
                  style={{ width: 60, height: 34, borderRadius: 4 }}
                />
                <Text style={styles.title}>{"Vegetable Burger"}</Text>
              </View>
            </View>
            {/* Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoContentContainer}>
                {/* Discount */}
                <View style={styles.infoContent}>
                  {/* Icon & Title */}
                  <View style={styles.iconTitle}>
                    <MaterialCommunityIcons
                      name="ticket-percent-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.infoText}>Discount</Text>
                  </View>

                  <Text>{20}%</Text>
                </View>
                {/* Date */}
                <View style={styles.infoContent}>
                  <View style={styles.iconTitle}>
                    <Fontisto name="calendar" size={24} color="black" />
                    <Text style={styles.infoText}>Date</Text>
                  </View>

                  <Text>{"23 sep 2025"}</Text>
                </View>
                {/* Used */}
                <View style={styles.infoContent}>
                  <View style={styles.iconTitle}>
                    <Ionicons name="warning-outline" size={24} color="black" />
                    <Text style={styles.infoText}>Used</Text>
                  </View>

                  <Text>{"04 Time"}</Text>
                </View>
                {/* Status */}
                <View style={styles.infoContent}>
                  <View style={styles.iconTitle}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.infoText}>Status</Text>
                  </View>

                  <Text style={styles.status}>{"Active"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: colorScheme === "dark" ? theme.background : "white",
      padding: 20,
    },

    card: {
      backgroundColor: theme.background,
      flexDirection: "column",
      gap: 14,
      marginBottom: 18,
    },

    image: {
      width: 272,
      height: 272,
      marginHorizontal: "auto",
    },

    qrCodeInfo: {
      marginTop: 40,
      marginBottom: 20,
    },

    limitationText: {
      fontSize: 18,
      fontWeight: "500",
      textAlign: "center",
      marginBottom: 6,
    },

    expirationText: {
      fontSize: 20,
      fontWeight: "600",
      textAlign: "center",
    },

    contentContainer: {
      width: "100%",
      flexDirection: "column",
      gap: 10,
    },

    hotelLocationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    hotel: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    hotelText: {
      fontSize: 18,
      fontWeight: "600",
    },

    titleDescriptionContainer: {
      width: "auto",
    },

    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    title: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 6,
    },

    infoContainer: {
      width: "100%",
    },

    infoContentContainer: {
      flexDirection: "column",
      gap: 12,
    },

    infoContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    iconTitle: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },

    infoText: {
      fontSize: 14,
      fontWeight: "500",
    },

    status: {
      color: primaryColor.greenNormal,
      backgroundColor: primaryColor.secondaryGreen,
      padding: 4,
      borderRadius: 4,
    },
  });
}
