import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import TopTab from "@/components/ui/TopTab";
import CrownIcon from "@/assets/images/choosePlan/crown.png";
import CheckMarkIcon from "@/assets/icons/check_mark.png";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { LinearGradient } from "expo-linear-gradient";

export type tabType = "monthly" | "yearly";

interface PlanType {
  title: string;
  description: string;
  price: number;
  features: string[];
}

const TABS: tabType[] = ["monthly", "yearly"];

const PLANS: PlanType[] = [
  {
    title: "Monthly plan",
    description: "Enjoy exclusive discounts & perks every month.",
    price: 5.0,
    features: [
      "Unlimited access to local discounts & perks",
      "Digital membership card with QR code",
      "Instant discount validation at partner shops",
      "Notifications for new offers & updates",
      "Manage your subscription anytime",
    ],
  },
  {
    title: "Yearly plan",
    description: "Enjoy exclusive discounts & perks every year.",
    price: 50.0,
    features: [
      "Unlimited access to local discounts & perks",
      "Digital membership card with QR code",
      "Instant discount validation at partner shops",
      "Notifications for new offers & updates",
      "Manage your subscription anytime",
    ],
  },
];

export default function ChoosePlan() {
  const [active, setActive] = useState<tabType>("monthly");

  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title="Choose your plan"
        description=""
        link={"/profile/add_photo" as any}
      />
      {/* Tab */}
      <TopTab tabs={TABS} active={active} setActive={setActive as any} />

      <LinearGradient
        colors={["#1CD77A", "#0BF3E7"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientContainer}
      >
        <MainContent
          styles={styles}
          data={active === "monthly" ? PLANS[0] : PLANS[1]}
        />
      </LinearGradient>
    </ScreenContainer>
  );
}

export function MainContent({ styles, data }: { styles: any; data: PlanType }) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.imgPrice}>
        <Image source={CrownIcon} width={48} height={48} alt="Crown" />
        <Text style={styles.price}>${data.price}</Text>
      </View>
      {/* Title & Description */}
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>
         {data.description}
        </Text>
      </View>
      {/* Features */}
      <View>
        <Text style={styles.featureTitle}>Features list</Text>
        <View style={styles.featureContainer}>
          <Image
            source={CheckMarkIcon}
            width={20}
            height={20}
            alt="Checkmark"
          />{" "}
          <Text style={styles.feature}>
            Unlimited access to local discounts & perks
          </Text>
        </View>
      </View>
    </View>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    gradientContainer: {
      position: "relative",
      height: "auto",
      width: "100%",
      marginTop: 16,
      borderRadius: 16,
      padding: 16,
    },
    contentContainer: {
      backgroundColor: "transparent",
      padding: 16,
      marginTop: 16,
      flexDirection: "column",
      gap: 16,
    },
    imgPrice: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    price: {
      fontSize: 26,
      fontWeight: "semibold",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    title: {
      fontSize: 24,
      fontWeight: "semibold",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    description: {
      fontSize: 16,
      fontWeight: "normal",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginTop: 2,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: "medium",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 6,
    },
    featureContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    feature: {
      fontSize: 14,
    },
  });
}
