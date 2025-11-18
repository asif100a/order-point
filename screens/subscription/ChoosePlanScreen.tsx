import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import TopTab from "@/components/ui/TopTab";
import CrownIcon from "@/assets/images/choosePlan/crown.png";
import CheckMarkIcon from "@/assets/icons/check_mark.png";
import plan_overlap_1 from "@/assets/icons/plan_overlap_1.png";
import plan_overlap_2 from "@/assets/icons/plan_overlap_2.png";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/buttons/Button";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline";
import { useRouter } from "expo-router";

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

export default function ChoosePlanScreen() {
  const router = useRouter();
  const [active, setActive] = useState<tabType>("monthly");

  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handlePayment = () => {
    router.push("/subscription/payment");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
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
        <View>
          {/* <Image
            source={plan_overlap_1}
            width={260}
            height={150}
            style={styles.overLapImg1}
          />
          <Image
            source={plan_overlap_1}
            width={260}
            height={150}
            style={styles.overLapImg2}
          /> */}

          <MainContent
            styles={styles}
            data={active === "monthly" ? PLANS[0] : PLANS[1]}
          />
        </View>
      </LinearGradient>

      {/* Buttons */}
      <Button title="Payment Now" onPress={handlePayment} />
      <ButtonOutline
        title="Skip"
        onPress={() => router.push("/subscription/payment")}
      />
    </SafeAreaView>
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
        <Text style={styles.description}>{data.description}</Text>
      </View>

      {/* Features */}
      <View>
        <Text style={styles.featureTitle}>Features list</Text>

        <View style={styles.featureContainer}>
          <FlatList
            data={data.features}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              return (
                <View style={styles.feature}>
                  <Image
                    source={CheckMarkIcon}
                    width={20}
                    height={20}
                    alt="Checkmark"
                  />
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              );
            }}
          />
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
    mainContainer: {
      padding: 16,
      backgroundColor: theme.background,
      height: "100%",
    },
    gradientContainer: {
      position: "relative",
      height: "auto",
      width: "100%",
      marginTop: 16,
      borderRadius: 16,
      padding: 16,
      zIndex: 1,
    },
    overLapImg1: {
      position: "absolute",
      zIndex: 10,
      top: 100,
      right: 0,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "white",
    },
    overLapImg2: {
      width: 260,
      height: 150,
      top: 0,
      right: 0,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "white",
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
    feature: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 6,
    },
    featureText: {
      fontSize: 14,
    },
  });
}
