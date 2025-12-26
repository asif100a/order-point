import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import walletGreenIcon from "@/assets/icons/wallet-green.png";
import redeemIcon from "@/assets/icons/redeem.png";
import visitPlaceIcon from "@/assets/icons/visit-place.png";
import dollarPurpleIcon from "@/assets/icons/dollar-purple.png";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import VisitPatternChart from "@/components/ui/analyticsPage/VisitPatternChart";

type StateType = {
  title: string;
  description: string;
  icon: string;
  mainText: number;
  isCurrency: boolean;
  progress?: number;
};

type RedemptionCategoryType = {
  label: string;
  value: number;
};

const states: StateType[] = [
  {
    title: "Total Saved",
    description: "This Month",
    mainText: 245,
    icon: walletGreenIcon,
    isCurrency: true,
    progress: 6,
  },
  {
    title: "Deal Redeem",
    description: "This Month",
    mainText: 35,
    icon: redeemIcon,
    isCurrency: false,
  },
  {
    title: "Total Visit",
    description: "This Month",
    mainText: 720,
    icon: visitPlaceIcon,
    isCurrency: false,
    progress: 6,
  },
  {
    title: "Avg. Saving",
    description: "This Month",
    mainText: 27,
    icon: dollarPurpleIcon,
    isCurrency: false,
  },
];

const redemptionCategory: RedemptionCategoryType[] = [
  { label: "Food & Dining", value: 58 },
  { label: "Gym & Wellness", value: 26 },
  { label: "Retail", value: 10 },
  { label: "Entertainment", value: 6 },
];

export default function AnalyticsScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title="Personal Analytics"
        description="Track your deals, savings, and partner engagement"
        link={"/(tabs)/favorite" as any}
      />

      {/* States */}
      <View style={styles.stateContainer}>
        {states.map((state: StateType) => (
          <View key={state.title} style={styles.stateCard}>
            <View style={styles.stateTitleImgPair}>
              <Text style={styles.stateTitle}>{state.title}</Text>
              <Image
                source={state.icon as ImageSourcePropType}
                style={styles.stateImg}
                alt={state.title}
              />
            </View>
            <Text style={styles.stateMainText}>
              {state.isCurrency && "$"}
              {state.mainText}
            </Text>
            <View style={styles.stateProgressDescriptionPair}>
              {state.progress && (
                <View style={styles.stateProgress}>
                  <MaterialCommunityIcons
                    name="chart-line-variant"
                    size={18}
                    color={primaryColor.greenNormal}
                  />
                  <Text style={styles.stateProgressText}>
                    {state.progress}%
                  </Text>
                </View>
              )}
              <Text style={styles.stateDescription}>{state.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Redemption by Category */}
      <View style={styles.redemptionContainer}>
        <Text style={styles.redemptionTitle}>Redemption by Category</Text>
        {redemptionCategory.map(
          (cat: RedemptionCategoryType, index: number) => (
            <>
              <View key={cat.label} style={styles.redemptionCategory}>
                <Text style={styles.redemptionCategoryText}>{cat.label}</Text>
                <Text style={styles.redemptionCategoryText}>{cat.value}%</Text>
              </View>
              {redemptionCategory.length !== index + 1 && (
                <View style={styles.redemptionDivider} />
              )}
            </>
          )
        )}
      </View>

      {/* Overview in Charts */}
      <View style={styles.overviewSection}>
        <Text style={styles.overviewTitle}>Overview</Text>

        {/* Weekly Visit Pattern:: Chart */}
        <VisitPatternChart />
      </View>
    </ScreenContainer>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
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
      borderColor: primaryColor.greenNormal,
      borderRadius: 16,
    },
    stateTitleImgPair: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    stateTitle: {
      fontSize: 16,
      fontWeight: 500,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    stateImg: {
      width: 24,
      height: 24,
    },
    stateMainText: {
      fontSize: 28,
      fontWeight: 600,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginVertical: 8,
    },
    stateProgressDescriptionPair: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    stateProgress: {
      padding: 4,
      paddingHorizontal: 8,
      backgroundColor: primaryColor.secondaryGreen,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
    },
    stateProgressText: {
      fontSize: 14,
      fontWeight: 500,
      color: primaryColor.greenNormal,
    },
    stateDescription: {
      fontSize: 14,
      fontWeight: 400,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    redemptionContainer: {
      padding: 16,
      backgroundColor: primaryColor.primaryGray,
      borderRadius: 16,
      marginTop: 28,
    },
    redemptionTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 16,
    },
    redemptionCategory: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    redemptionCategoryText: {
      fontSize: 16,
      fontWeight: 500,
      color: colorScheme === "dark" ? "white" : "#505050",
    },
    redemptionDivider: {
      width: "100%",
      height: 1,
      backgroundColor: primaryColor.secondaryBlack,
      marginVertical: 16,
    },
    overviewSection: {
      width: "100%",
      height: "auto",
      marginTop: 18,
      paddingBottom: 36
    },
    overviewTitle: {
      fontSize: 22,
      fontWeight: 600,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 20,
    },
    chartContainer: {
      padding: 16,
      borderRadius: 16,
      marginBottom: 28,
    },
  });
}
