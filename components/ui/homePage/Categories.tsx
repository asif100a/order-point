import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import React, { useCallback, useState } from "react";
import useTheme from "@/hooks/useTheme";
import {
  CategoryType,
  ColorSchemeTypes,
  PrimaryColorTypes,
  ThemeTypes,
} from "@/types";
import Tabs from "./Tabs";
import CategoryImg1 from "@/assets/images/category/category1.png";
import CategoryImg2 from "@/assets/images/category/category2.png";
import CategoryImg3 from "@/assets/images/category/category3.png";
import hotelImg from "@/assets/images/category/hotel.png";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Button from "../buttons/Button";
import { Link } from "expo-router";
import VerifyModal from "@/app/modals/VerifyModal";

const TABS = ["In-Person", "Online", "Services"];

const CATEGORIES: CategoryType[] = [
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

export default function Categories() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(),
  );
  const [isModalVisible, setModalVisible] = useState(false);

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

  const category = useCallback(
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
                  <Link href={`/details/[${item.id}]`} asChild>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.hotelName}
                    </Text>
                  </Link>
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
          <Button title="Use Discount" onPress={() => setModalVisible(true)} />
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
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Tabs tabs={TABS} active={activeTab} setActive={setActiveTab} />
      </View>

      <Text style={styles.categoryText}>Available Discounts</Text>

      {/* Category Cards */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ height: "auto", marginTop: 12, paddingBottom: 16 }}
        renderItem={category}
      />

      {/* Modal */}
      <VerifyModal visible={isModalVisible} setVisible={setModalVisible} />
    </View>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes,
) {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    tabContainer: {
      marginTop: 12,
      marginBottom: 8,
    },
    categoryText: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 12,
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
