import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import Tabs from "./Tabs";
import CategoryImg1 from "@/assets/images/category/category1.png";
import CategoryImg2 from "@/assets/images/category/category2.png";
import CategoryImg3 from "@/assets/images/category/category3.png";
import hotelImg from "@/assets/images/category/hotel.png";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "../buttons/Button";
import { Link, useRouter } from "expo-router";

interface CategoryType {
  id: string;
  title: string;
  description: string;
  hotelName: string;
  hotelImage: string;
  image: string;
  discount: number;
  date: string;
  startTime: string;
  category: "New Deal" | "Expire Soon";
  location: string;
}

const TABS = ["Featured", "New", "Near by me"];

const CATEGORIES: CategoryType[] = [
  {
    id: "1",
    title: "Vegetable Burger",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Daily Daawat-Gulshan 1",
    hotelImage: hotelImg,
    image: CategoryImg1,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Gulshan-1",
  },
  {
    id: "2",
    title: "Vegetable Kachchi",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Daily Daawat-Gulshan 1",
    hotelImage: hotelImg,
    image: CategoryImg2,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Gulshan-2",
  },
  {
    id: "3",
    title: "Dream Coffee",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Daily Daawat-Gulshan 1",
    hotelImage: hotelImg,
    image: CategoryImg3,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Mohakhali C/A",
  },
];

export default function Categories() {
  const router = useRouter();
  const { colorScheme, theme, primaryColor } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [bookmark, setBookmark] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleGotoDetails = (id: string) => {
    router.push(`/details/[${id}]` as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Categories</Text>
      {/* Tabs */}
      <Tabs tabs={TABS} active={activeTab} setActive={setActiveTab} />

      {/* Category Cards */}
      <FlatList
        data={CATEGORIES}
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
                {/* Buttons */}
                <View style={styles.buttonsContainer}>
                  <Button
                    title="📅 Details"
                    onPress={() => handleGotoDetails(item.id)}
                    height={48}
                    style={{ marginTop: 0, flex: 1 }}
                  />

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
                    style={[
                      styles.roundButton,
                      bookmark && styles.activeButton,
                    ]}
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
      flexDirection: 'row', 
      alignItems: 'center',
      gap: 4
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
