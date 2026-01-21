import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface DealType {
  id: string;
  title: string;
  used: number;
  totalUses: number;
  location: string;
  image: string;
}

const SERVICES = [
  "Wedding Photography",
  "Event Coverage",
  "Photo Editing",
  "Albums & Prints",
  "Portrait Sessions",
];

const DEALS: DealType[] = [
  {
    id: "1",
    title: "Cappuccino Coffee",
    used: 1,
    totalUses: 5,
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400",
  },
  {
    id: "2",
    title: "Cappuccino Coffee",
    used: 1,
    totalUses: 5,
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400",
  },
];

export default function Gallery() {
  const router = useRouter();
  const { colorScheme, theme, primaryColor } = useTheme();
  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={["#556D55", "#76A976"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradientHeader}
          />

          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200",
              }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Business Name */}
        <Text style={styles.businessName}>Coffee Haven</Text>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About:</Text>
          <Text style={styles.aboutText}>
            I have a 4 years old golden retriever. {"I've"} taken good care of
            him since he was 8 weeks old. {"He's"} very playful and super
            friendly to any dogs and people. My dog is particularly adept at
            fostering positive interactions, demonstrating a calm and
            considerate demeanor with small dogs
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information:</Text>

          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Phone:</Text>
            <Text style={styles.contactValue}>+880213 5646</Text>
          </View>

          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Email:</Text>
            <Text style={styles.contactValue}>yourmail@.com</Text>
          </View>

          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Location</Text>
            <Text style={styles.contactValue}>Mohakhali, Dhaka</Text>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services:</Text>
          <View style={styles.servicesContainer}>
            {SERVICES.map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* All Deals Section */}
        <View style={styles.dealsSection}>
          <View style={styles.dealsTitleRow}>
            <Text style={styles.dealsTitle}>All deal</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dealsGrid}>
            {DEALS.map((deal) => (
              <View key={deal.id} style={styles.dealCard}>
                <Image source={{ uri: deal.image }} style={styles.dealImage} />
                <Text style={styles.dealTitle}>{deal.title}</Text>

                <View style={styles.dealInfo}>
                  <Text style={styles.dealInfoLabel}>Used:</Text>
                  <Text style={styles.dealInfoValue}>
                    {deal.used}/{deal.totalUses} times this month
                  </Text>
                </View>

                <View style={styles.dealInfo}>
                  <Text style={styles.dealInfoLabel}>Location</Text>
                  <Text style={styles.dealInfoValue}>{deal.location}</Text>
                </View>

                <TouchableOpacity style={styles.useDiscountButton}>
                  <Text style={styles.useDiscountText}>Use Discount</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
      backgroundColor: theme.background,
    },
    headerContainer: {
      position: "relative",
      alignItems: "center",
      marginBottom: 60,
    },
    gradientHeader: {
      width: "100%",
      height: 120,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    profileImageContainer: {
      position: "absolute",
      bottom: -50,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "white",
      padding: 4,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    profileImage: {
      width: "100%",
      height: "100%",
      borderRadius: 56,
    },
    businessName: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 24,
    },
    section: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 12,
    },
    aboutText: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      color: colorScheme === "dark" ? "#CCCCCC" : "#666666",
      backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#F5F5F7",
      padding: 12,
      borderRadius: 8,
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === "dark" ? "#2C2C2E" : "#E5E5E5",
    },
    contactLabel: {
      fontSize: 15,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#999999" : "#666666",
    },
    contactValue: {
      fontSize: 15,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    servicesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    serviceTag: {
      backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#E5E5E5",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    serviceText: {
      fontSize: 13,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : "#333333",
    },
    dealsSection: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    dealsTitleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    dealsTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: "500",
      color: primaryColor.greenNormal || "#6B8F6B",
    },
    dealsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    dealCard: {
      width: "48%",
      backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#FFFFFF",
      borderRadius: 12,
      padding: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    dealImage: {
      width: "100%",
      height: 120,
      borderRadius: 8,
      marginBottom: 8,
    },
    dealTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 8,
    },
    dealInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    dealInfoLabel: {
      fontSize: 12,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#999999" : "#666666",
    },
    dealInfoValue: {
      fontSize: 12,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      flex: 1,
      textAlign: "right",
    },
    useDiscountButton: {
      backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#E8F5E9",
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 8,
    },
    useDiscountText: {
      fontSize: 14,
      fontWeight: "600",
      color: primaryColor.greenNormal || "#6B8F6B",
    },
  });
}
