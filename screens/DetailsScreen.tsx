import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import CategoryImg1 from "@/assets/images/category/category1.png";
import hotelImg from "@/assets/images/category/hotel.png";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [bookmark, setBookmark] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
      <SafeAreaView>
        <View style={styles.container}>
          {/* Image */}
          <View
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <Image
              source={CategoryImg1}
              width={700}
              height={220}
              alt={"Details Title"}
              style={styles.image}
            />
            <View style={{ position: "absolute", top: 0, right: 0 }}>
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>Saved ${20}</Text>
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            {/* Hotel Name & Location */}
            <View style={styles.hotelLocationContainer}>
              <View>
                <Image
                  source={hotelImg}
                  alt={"Hotel Image"}
                  width={32}
                  height={32}
                />
                <Text style={styles.hotelText}>{"Daily Daawat-Gulshan 1"}</Text>
              </View>
              <View style={styles.locationContainer}>
                <EvilIcons
                  name="location"
                  size={24}
                  color={primaryColor.greenNormal}
                />

                <Link href={"/map"}>
                  <Text style={styles.linkText}>View</Text>
                </Link>
              </View>
            </View>
            {/* Title & Description */}
            <View style={styles.titleDescriptionContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{"Vegetable Burger"}</Text>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>{"New Deal"}</Text>
                </View>
              </View>
              <Text style={styles.description}>
                {
                  "A veggie burger is a plant-based patty served in a bur ger bun, made from ingredients like vegetables legum es in beans. This is the most delicious veggie burger recipe we’ve made. These taste amazing and are packed with vegetables, with nearly 1 cup of veggies in every patty."
                }
              </Text>
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

                  <Text>{"item.discount"}</Text>
                </View>
                {/* Date */}
                <View style={styles.infoContent}>
                  <View style={styles.iconTitle}>
                    <Fontisto name="calendar" size={24} color="black" />
                    <Text style={styles.infoText}>Date</Text>
                  </View>

                  <Text>{"item.date"}</Text>
                </View>
                {/* Stat time */}
                <View style={styles.infoContent}>
                  <View style={styles.iconTitle}>
                    <Feather name="clock" size={24} color="black" />
                    <Text style={styles.infoText}>Stat time</Text>
                  </View>

                  <Text>{"item.startTime"}</Text>
                </View>
              </View>
              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                {/* QR Code */}
                <Pressable style={styles.roundButton}>
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={24}
                    color="black"
                  />
                </Pressable>
                {/* Favorite */}
                <Pressable
                  style={[styles.roundButton, bookmark && styles.activeButton]}
                  onPress={() => setBookmark(!bookmark)}
                >
                  {bookmark ? (
                    <FontAwesome name="bookmark" size={24} color="red" />
                  ) : (
                    <Feather name="bookmark" size={24} color="black" />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
      padding: 20
    },
    categoryText: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 12,
    },
    card: {
      backgroundColor: theme.background,
      flexDirection: "column",
      gap: 14,
      marginBottom: 18,
    },
    image: {
      width: "100%",
      height: 220,
      borderRadius: 12,
    },
    discountContainer: {
      backgroundColor: primaryColor.secondaryGreen,
      padding: 8,
      borderStartEndRadius: 12,
      borderEndStartRadius: 12,
    },
    discountText: {
      fontSize: 15,
      fontWeight: "medium",
      color: primaryColor.greenNormal,
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
    hotelText: {
      fontSize: 18,
      fontWeight: "semibold",
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 0,
    },
    linkText: {
      color: primaryColor.greenNormal,
      textDecorationLine: "underline",
    },
    titleDescriptionContainer: {
      width: "auto",
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "semibold",
      marginBottom: 6,
    },
    categoryContainer: {
      padding: 4,
      backgroundColor: primaryColor.secondaryGreen,
      borderRadius: 4,
    },
    category: {
      fontSize: 14,
      fontWeight: "normal",
      color: primaryColor.greenNormal,
    },
    description: {
      fontSize: 14,
      color: primaryColor.secondaryBlack,
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
      fontWeight: "medium",
    },
    buttonsContainer: {
      flexDirection: "row",
      gap: 14,
      marginTop: 12,
    },
    roundButton: {
      borderRadius: 50,
      backgroundColor: primaryColor.secondaryGreen,
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    activeButton: {
      backgroundColor: primaryColor.secondaryRed,
    },
  });
}
