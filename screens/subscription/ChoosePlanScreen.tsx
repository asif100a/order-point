import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
// import CrownIcon from "@/assets/images/choosePlan/crown.png";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Button from "@/components/ui/buttons/Button";

export type tabType = "monthly" | "yearly";

interface PlanType {
  title: string;
  subtitle: string;
  price: number;
  period: string;
  badge?: string;
  features: string[];
  colors: string[];
  textColor: string;
}

const PLANS: PlanType[] = [
  {
    title: "$59",
    period: "yearly",
    subtitle: "Billed annually. Save $10 per year",
    price: 59.0,
    badge: "BEST VALUE",
    colors: ["#6B8F6B", "#7FA87F"],
    textColor: "white",
    features: [
      "Unlimited access to exclusive SaveKey discounts",
      "Redeem discounts directly in the app",
      "Valid at participating Wisconsin small businesses",
      "New deals added regularly",
      "Cancel anytime",
    ],
  },
  {
    title: "$6",
    period: "monthly",
    subtitle: "Pay monthly, cancel anytime",
    price: 6.0,
    colors: ["#FFFFFF", "#FFFFFF"],
    textColor: "#333333",
    features: [
      "Unlimited access to exclusive SaveKey discounts",
      "Redeem discounts directly in the app",
      "Valid at participating Wisconsin small businesses",
      "New deals added regularly",
      "Cancel anytime",
    ],
  },
];

export default function ChoosePlanScreen() {
  const router = useRouter();
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handlePayment = (plan: PlanType) => {
    router.push("/subscription/payment");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TopNavigationHeader
        title="Choose your plan"
        description="Get access to exclusive SaveKey discounts"
        link={"/profile/add_photo" as any}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        {PLANS.map((item, i: number) => (
          <View key={i.toString()} style={styles.planWrapper}>
            <LinearGradient
              colors={item.colors}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[
                styles.gradientContainer,
                i === 1 && styles.whitePlanContainer,
              ]}
            >
              <View style={styles.contentContainer}>
                {/* Header with Price and Badge */}
                <View style={styles.headerRow}>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: item.textColor }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.period, { color: item.textColor }]}>
                      / {item.period}
                    </Text>
                  </View>
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>

                {/* Subtitle */}
                <Text style={[styles.subtitle, { color: item.textColor }]}>
                  {item.subtitle}
                </Text>

                {/* Features Title */}
                <Text style={[styles.featureTitle, { color: item.textColor }]}>
                  What you get
                </Text>

                {/* Features List */}
                <View style={styles.featureContainer}>
                  {item.features.map((feature, index) => (
                    <View key={index} style={styles.feature}>
                      <Feather
                        name="check-circle"
                        size={20}
                        color={item.textColor === "white" ? "white" : "#6B8F6B"}
                      />
                      <Text
                        style={[styles.featureText, { color: item.textColor }]}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Purchase Button */}
                {i === 0 ? (
                  <TouchableOpacity
                    style={[styles.purchaseButton]}
                    onPress={() => handlePayment(item)}
                  >
                    <Text style={[styles.purchaseButtonText]}>
                      Purchase Plan
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Button title="Purchase Plan" />
                )}
              </View>
            </LinearGradient>
          </View>
        ))}
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
    mainContainer: {
      padding: 16,
      backgroundColor: theme.background,
      height: "100%",
    },
    planWrapper: {
      marginTop: 16,
    },
    gradientContainer: {
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    whitePlanContainer: {
      borderWidth: 1,
      borderColor: "#E5E5E5",
    },
    contentContainer: {
      flexDirection: "column",
      gap: 16,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    price: {
      fontSize: 40,
      fontWeight: "700",
    },
    period: {
      fontSize: 18,
      fontWeight: "400",
      marginLeft: 4,
    },
    badge: {
      backgroundColor: "white",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#6B8F6B",
    },
    subtitle: {
      fontSize: 15,
      fontWeight: "400",
      marginTop: -8,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 4,
    },
    featureContainer: {
      gap: 10,
    },
    feature: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    featureText: {
      fontSize: 14,
      fontWeight: "400",
      flex: 1,
      lineHeight: 20,
    },
    purchaseButton: {
      borderRadius: 30,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 8,
      backgroundColor: "white",
    },
    purchaseButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#6B8F6B",
    },
  });
}
