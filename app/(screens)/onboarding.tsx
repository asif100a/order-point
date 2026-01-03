import OnboardingScreen from "@/screens/OnboardingScreen";
import onboard1 from "@/assets/images/onboarding/onboarding-1.png";
import onboard2 from "@/assets/images/onboarding/onboarding-2.png";
import onboard3 from "@/assets/images/onboarding/onboarding-3.png";
import { OnboardingTypes } from "@/types";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { Dimensions, FlatList, View, ViewToken } from "react-native";

const onboardings: OnboardingTypes[] = [
  {
    title: "Discover Local Savings",
    description:
      "Unlock exclusive discounts and perks at your favorite local businesses. Save more while supporting your community—all in one app.",
    image: onboard1,
  },
  {
    title: "Easy Membership Access",
    description:
      "Choose a plan that fits you best. Get your digital membership with a unique QR code for instant discount validation.",
    image: onboard2,
  },
  {
    title: "Manage & Stay Updated",
    description:
      "Track your perks, receive real-time updates, and enjoy a smooth, secure shopping experience every time you use the app.",
    image: onboard3,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width } = Dimensions.get("window");

  const handleNext = () => {
    if (currentIndex < onboardings.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      })
    } else {
      router.push("/choose_role");
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
        handleNext={handleNext}
        onChangeIndex={handleIndexChange}
        currentIndex={currentIndex}
        width={width}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
    </View>
  );
}
