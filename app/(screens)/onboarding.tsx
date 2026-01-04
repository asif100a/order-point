import OnboardingScreen from "@/screens/OnboardingScreen";
import onboard1 from "@/assets/images/onboarding/onboarding-1.png";
import onboard2 from "@/assets/images/onboarding/onboarding-2.png";
import onboard3 from "@/assets/images/onboarding/onboarding-3.png";
import {
  ColorSchemeTypes,
  OnboardingTypes,
  PrimaryColorTypes,
  ThemeTypes,
} from "@/types";
import { useRef, useState } from "react";
import { router } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import Button from "@/components/ui/buttons/Button";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";

const onboardings: OnboardingTypes[] = [
  {
    title: "Discover Discounts Nearby",
    description:
      "Find the best discounts from shops around you.",
    image: onboard1,
  },
  {
    title: "Get Exclusive Membership Benefits",
    description:
      "Unlock premium deals with membership.",
    image: onboard2,
  },
  {
    title: "Redeem Discounts Instantly",
    description:
      "Tap “Use Discount” and follow the on-screen steps to redeem.",
    image: onboard3,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width } = Dimensions.get("window");

  const { theme, colorScheme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor, width);

  const handleNext = () => {
    if (currentIndex < onboardings.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push("/auth_option");
    }
  };

  const handleIndexChange = (index: number) => {
    flatListRef?.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  // Update the currentIndex when the user swipes
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item }: { item: OnboardingTypes }) => {
    return (
      <OnboardingScreen
        data={item}
        width={width - 32}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <Pressable
        style={styles.skipBtn}
        onPress={() => router.push("/auth_option")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={onboardings}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      {/* Min Info */}
      <View style={styles.btnContainer}>
        {/* Slider points */}
        <View style={styles.sliderPointContainer}>
          {[0, 1, 2].map((key) => (
            <Pressable
              key={key}
              onPress={() => handleIndexChange(key)}
              style={[
                styles.sliderPoint,
                key === currentIndex && styles.sliderPointActive,
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <Button title="Next" onPress={handleNext} style={{marginTop: 24}} />
      </View>
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes,
  width: number
) {
  return StyleSheet.create({
    container: {
      width: width,
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.background,
      paddingHorizontal: 16,
    },
    image: {
      width: "100%",
      height: 640,
    },
    skipBtn: {
      marginTop: 16,
    },
    skipText: {
      color: primaryColor.primaryBlack,
      fontSize: 18,
      fontWeight: 600,
      textAlign: "right",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "transparent",
    },
    description: {
      fontSize: 16,
      fontWeight: "regular",
      textAlign: "center",
      marginTop: 8,
    },
    btnContainer: {
      marginBottom: 64
    },
    sliderPointContainer: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
    },
    sliderPoint: {
      width: 12,
      height: 12,
      backgroundColor: "#A5B9A5",
      borderRadius: "100%",
    },
    sliderPointActive: {
      backgroundColor: "#556D55",
      width: 30,
      borderRadius: 25
    },
  });
}
