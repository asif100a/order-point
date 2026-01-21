import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  CategoryType,
  ColorSchemeTypes,
  DealType,
  PrimaryColorTypes,
  ThemeTypes,
} from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import Button from "@/components/ui/buttons/Button";
import CategoryImg1 from "@/assets/images/category/category1.png";
import CategoryImg2 from "@/assets/images/category/category2.png";
import CategoryImg3 from "@/assets/images/category/category3.png";
import hotelImg from "@/assets/images/category/hotel.png";

const DEALS: DealType[] = [
  {
    id: "1",
    title: "Vegetable Burger",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Cappuccino Coffee",
    hotelImage: hotelImg,
    image: CategoryImg1,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Dhaka",
    usedCount: 1,
    maxUsage: 5,
  },
  {
    id: "2",
    title: "Vegetable Kachchi",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Cappuccino Coffee",
    hotelImage: hotelImg,
    image: CategoryImg2,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Dhaka",
    usedCount: 1,
    maxUsage: 5,
  },
  {
    id: "3",
    title: "Dream Coffee",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Cappuccino Coffee",
    hotelImage: hotelImg,
    image: CategoryImg3,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Dhaka",
    usedCount: 1,
    maxUsage: 5,
  },
];

export default function AllDeals() {
  const { colorScheme, theme, primaryColor } = useTheme();

  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(),
  );

  const styles = createStyles(theme, colorScheme, primaryColor);

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const dealCard = useCallback(
    ({ item }: { item: CategoryType }) => {
      const isBookmarked = bookmarkedItems.has(item.id);

      return (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            {/* Left side - Image */}
            <View style={styles.imageContainer}>
              <Image
                source={item.image as ImageSourcePropType}
                style={styles.image}
              />
            </View>

            {/* Right side - Content */}
            <View style={styles.rightContent}>
              {/* Title and Bookmark */}
              <View style={styles.titleRow}>
                <View style={styles.titleDiscount}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.hotelName}
                  </Text>
                  {/* Discount */}
                  <Text style={styles.discountText}>
                    {item.discount}% off on all time
                  </Text>
                </View>
                <Pressable
                  style={[
                    styles.bookmarkButton,
                    isBookmarked && { borderColor: "#FFA7A7" },
                  ]}
                  onPress={() => toggleBookmark(item.id)}
                >
                  {isBookmarked ? (
                    <FontAwesome
                      name="bookmark"
                      size={20}
                      color={primaryColor.primaryRed}
                    />
                  ) : (
                    <FontAwesome
                      name="bookmark-o"
                      size={20}
                      color={primaryColor.greenNormal}
                    />
                  )}
                </Pressable>
              </View>

              {/* Usage Info */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Used:</Text>
                <Text style={styles.infoValue}>
                  {item.usedCount}/{item.maxUsage} times this month
                </Text>
              </View>

              {/* Location */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Location:</Text>
                <Text style={[styles.infoValue, styles.locationLink]}>
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
          {/* Use Discount Button */}
          <Link href={`/details/[${item.id}]`} asChild>
            <Button title="Use Discount" />
          </Link>
        </View>
      );
    },
    [
      bookmarkedItems,
      primaryColor.greenNormal,
      primaryColor.primaryRed,
      styles.bookmarkButton,
      styles.card,
      styles.cardContent,
      styles.discountText,
      styles.image,
      styles.imageContainer,
      styles.infoLabel,
      styles.infoRow,
      styles.infoValue,
      styles.locationLink,
      styles.rightContent,
      styles.title,
      styles.titleDiscount,
      styles.titleRow,
    ],
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationHeader title="All Deal" description="" link />
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes,
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    middleContent: {
      flex: 1,
      gap: 6,
    },
    discountTag: {
      alignSelf: "flex-start",
      backgroundColor: "#FFF3F0",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    usageInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    usageLabel: {
      fontSize: 13,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#999" : "#666666",
    },
    usageValue: {
      fontSize: 13,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
    },
    locationLabel: {
      fontSize: 13,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#999" : "#666666",
    },
    locationValue: {
      fontSize: 13,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      flex: 1,
    },
    deleteButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FFE5E5",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    },
    card: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: "#E3E3E3",
      borderRadius: 12,
      marginBottom: 16,
      padding: 12,
    },
    cardContent: {
      flexDirection: "row",
    },
    imageContainer: {
      width: 100,
      height: 120,
      borderRadius: 8,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    rightContent: {
      flex: 1,
      marginLeft: 12,
      justifyContent: "space-between",
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    titleDiscount: {},
    title: {
      fontSize: 16,
      fontWeight: 600,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      flex: 1,
      marginRight: 8,
      marginBottom: 4,
    },
    discountText: {
      fontSize: 14,
      color: primaryColor.secondaryBlack,
      marginBottom: 8,
    },
    bookmarkButton: {
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: "#E3E3E3",
      borderRadius: 50,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    infoLabel: {
      fontSize: 14,
      color: primaryColor.secondaryBlack,
      marginRight: 8,
    },
    infoValue: {
      fontSize: 14,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    locationLink: {
      textDecorationLine: "underline",
    },
  });
}
