import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { CategoryType } from "@/app/(screens)/favorite";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Link } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";

export default function FavoriteScreen({
  categories,
}: {
  categories: CategoryType[];
}) {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <View>
      <TopNavigationHeader
        title="Favorite"
        description=""
        link={"/(tabs)" as any}
      />

      {/* Category Cards */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ height: "auto", marginTop: 12, paddingBottom: 16 }}
        renderItem={({ item }) => (
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
                source={item.image as string}
                width={700}
                height={220}
                alt={item.title}
                style={styles.image}
              />
              <View style={{ position: "absolute", top: 0, right: 0 }}>
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>
                    Saved ${item.discount}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.contentContainer}>
              {/* Hotel Name & Location */}
              <View style={styles.hotelLocationContainer}>
                <View style={styles.hotel}>
                  <Image
                    source={item.hotelImage}
                    alt={item.hotelName}
                    width={32}
                    height={32}
                  />
                  <Text style={styles.hotelText}>{item.hotelName}</Text>
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
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.category}>{item.category}</Text>
                  </View>
                </View>
                <Text style={styles.description}>{item.description}</Text>
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

                    <Text>{item.discount}</Text>
                  </View>
                  {/* Date */}
                  <View style={styles.infoContent}>
                    <View style={styles.iconTitle}>
                      <Fontisto name="calendar" size={24} color="black" />
                      <Text style={styles.infoText}>Date</Text>
                    </View>

                    <Text>{item.date}</Text>
                  </View>
                  {/* Stat time */}
                  <View style={styles.infoContent}>
                    <View style={styles.iconTitle}>
                      <Feather name="clock" size={24} color="black" />
                      <Text style={styles.infoText}>Stat time</Text>
                    </View>

                    <Text>{item.startTime}</Text>
                  </View>
                </View>
                {/* Button */}
                <View style={styles.buttonsContainer}>
                  <TouchableHighlight>
                    <MaterialCommunityIcons
                      name="delete-forever-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        )}
      />
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
    hotel: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
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
    buttonsContainer: {},
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
