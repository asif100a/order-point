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
        <View style={styles.contentContainer}>
          <View>
            <Image source={CrownIcon} width={48} height={48} alt="Crown" />
            <Text>$5.00</Text>
          </View>
          {/* Title & Description */}
          <View>
            <Text>Monthly plan</Text>
            <Text>Enjoy exclusive discounts & perks every month.</Text>
          </View>
          {/* Features */}
          <View>
            <Text>Features list</Text>
            <View>
              <Text>
                <Image
                  source={CheckMarkIcon}
                  width={20}
                  height={20}
                  alt="Checkmark"
                />{" "}
                Unlimited access to local discounts & perks
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScreenContainer>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    gradientContainer: {
      position: 'relative',
      height: 500,
      width: "100%",
      marginTop: 16,
      borderRadius: 16,
      padding: 16
    },
    contentContainer: {
      // position: 'absolute',
      // height: "100%",
      backgroundColor: theme.background,
      padding: 16,
      marginTop: 16,
      flexDirection: "column",
    },
  });
}
