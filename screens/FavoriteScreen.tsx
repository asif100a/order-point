import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CategoryType } from "@/app/(screens)/favorite";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteScreen({
  categories,
}: {
  categories: CategoryType[];
}) {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationHeader
        title="Favorite"
        description=""
        link={"/(tabs)" as any}
      />

      {/* Category Cards */}
      <View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Image */}

              <View style={styles.hotelImgTitleDescriptionContainer}>
                <Image
                  source={item.image as ImageSourcePropType}
                  width={100}
                  height={118}
                  alt={item.title}
                  style={styles.image}
                />
                <View style={styles.titleDescriptionContainer}>
                  <View style={styles.hotel}>
                    <Image
                      source={item.hotelImage as ImageSourcePropType}
                      alt={item.hotelName}
                      width={32}
                      height={32}
                    />
                    <Text style={styles.hotelText}>{item.hotelName}</Text>
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
                </View>
              </View>
              <View style={styles.contentContainer}>
                {/* Hotel Name & Location */}
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
                </View>
                {/* Button */}
                <TouchableOpacity
                  style={styles.roundButton}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="delete-forever-outline"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    categoryText: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 12,
    },
    card: {
      backgroundColor: "#F5F5F7",
      flexDirection: "column",
      gap: 14,
      padding: 16,
      borderRadius: 16,
      marginBottom: 18,
    },
    hotelImgTitleDescriptionContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 16,
    },
    image: {
      width: 100,
      height: 117,
      borderRadius: 12,
      flexShrink: 0,
    },
    contentContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
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
      flex: 1,
      flexShrink: 1,
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
      flexWrap: "wrap",
    },
    infoContainer: {
      flex: 1,
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
    roundButton: {
      borderRadius: 50,
      backgroundColor: primaryColor.secondaryRed,
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
