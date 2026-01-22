import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import walletGreenIcon from "@/assets/icons/wallet-green.png";
import redeemIcon from "@/assets/icons/redeem.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

type StateType = {
  title: string;
  icon: string;
  mainText: number;
  progress?: number;
};

type BusinessItemType = {
  id: string;
  name: string;
  location: string;
  totalSales: number;
  image: string;
};

const states: StateType[] = [
  {
    title: "Total Business",
    mainText: 245,
    icon: walletGreenIcon,
    progress: 6,
  },
  {
    title: "Redemption",
    mainText: 35,
    icon: redeemIcon,
  },
];

// Mock data for top businesses
const topBusinesses: BusinessItemType[] = [
  {
    id: "1",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
  {
    id: "2",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
  {
    id: "3",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
  {
    id: "4",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
  {
    id: "5",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
  {
    id: "6",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
];

// Mock data for top redemptions (same structure)
const topRedemptions: BusinessItemType[] = [
  {
    id: "1",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
  {
    id: "2",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
  {
    id: "3",
    name: "Daily Daawat-Gulshan 1",
    location: "Location",
    totalSales: 2375,
    image: "https://via.placeholder.com/48",
  },
];

export default function AnalyticsScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [activeTab, setActiveTab] = useState<"business" | "redemption">(
    "business",
  );

  const styles = createStyles(theme, colorScheme, primaryColor);

  const currentData = activeTab === "business" ? topBusinesses : topRedemptions;

  const itemList = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <View key={item.id} style={styles.businessItem}>
        <View style={styles.businessLeft}>
          <Image source={{ uri: item.image }} style={styles.businessImage} />
          <View style={styles.businessInfo}>
            <Text style={styles.businessName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Feather
                name="map-pin"
                size={14}
                color={
                  colorScheme === "dark" ? "#999" : primaryColor.secondaryBlack
                }
              />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.businessRight}>
          <Text style={styles.salesLabel}>Total sales</Text>
          <Text style={styles.salesValue}>{item.totalSales}</Text>
        </View>
      </View>
    ),
    [
      colorScheme,
      primaryColor.secondaryBlack,
      styles.businessImage,
      styles.businessInfo,
      styles.businessItem,
      styles.businessLeft,
      styles.businessName,
      styles.businessRight,
      styles.locationContainer,
      styles.locationText,
      styles.salesLabel,
      styles.salesValue,
    ],
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationHeader
        title="Personal Analytics"
        description="Track your deals, savings, and partner engagement"
        link={"/(tabs)/favorite" as any}
      />

      {/* States */}
      <View style={styles.stateContainer}>
        {states.map((state: StateType, index: number) => (
          <View key={index.toString()} style={styles.stateCard}>
            <View style={styles.stateTitleImgPair}>
              <Text style={styles.stateTitle}>{state.title}</Text>
              <Image
                source={state.icon as ImageSourcePropType}
                style={styles.stateImg}
                alt={state.title}
              />
            </View>
            <Text style={styles.stateMainText}>{state.mainText}</Text>
          </View>
        ))}
      </View>

      {/* Top Business / Redemption Section */}
      <View style={{ flex: 1, marginTop: 24, borderWidth: 1, height: '100%' }}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "business" && styles.activeTab]}
            onPress={() => setActiveTab("business")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "business" && styles.activeTabText,
              ]}
            >
              Top Business
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "redemption" && styles.activeTab]}
            onPress={() => setActiveTab("redemption")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "redemption" && styles.activeTabText,
              ]}
            >
              Top Redemption
            </Text>
          </TouchableOpacity>
        </View>

        {/* Business List */}
        <FlatList
          data={currentData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemList}
          contentContainerStyle={styles.businessList}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
      borderWidth: 1,
      borderColor: "red",
    },
    stateContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 16,
      marginTop: 28,
    },
    stateCard: {
      width: "48%",
      padding: 16,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#CBEEDC",
      borderRadius: 16,
    },
    stateTitleImgPair: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    stateTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    stateImg: {
      width: 24,
      height: 24,
    },
    stateMainText: {
      fontSize: 28,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginVertical: 8,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    tab: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginRight: 8,
      width: "48%",
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: primaryColor.greenNormal,
    },
    tabText: {
      fontSize: 16,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#999" : "#8F8F8F",
      textAlign: "center",
    },
    activeTabText: {
      color: primaryColor.greenNormal,
      fontWeight: "600",
    },
    businessList: {
      gap: 12,
      backgroundColor: primaryColor.primaryGray,
      padding: 16,
      borderRadius: 16,
    },
    businessItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#fff",
      borderRadius: 12,
    },
    businessLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    businessImage: {
      width: 48,
      height: 48,
      borderRadius: 8,
      marginRight: 12,
    },
    businessInfo: {
      flex: 1,
    },
    businessName: {
      fontSize: 14,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 4,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    locationText: {
      fontSize: 12,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#999" : primaryColor.secondaryBlack,
    },
    businessRight: {
      alignItems: "flex-end",
    },
    salesLabel: {
      fontSize: 12,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#999" : "#8F8F8F",
      marginBottom: 2,
    },
    salesValue: {
      fontSize: 16,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
  });
}
