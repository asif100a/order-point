import OnboardingScreen from "@/screens/OnboardingScreen";
import onboard1 from "@/assets/images/onboarding/onboarding-1.png";
import onboard2 from "@/assets/images/onboarding/onboarding-2.png";
import onboard3 from "@/assets/images/onboarding/onboarding-3.png";
import { OnboardingTypes } from "@/types";
import { useState } from "react";
import { router } from "expo-router";

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
  // const router = router

  const handleNext = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/choose_role");
    }
  };

  return (
    <OnboardingScreen
      data={onboardings[currentIndex]}
      handleNext={handleNext}
      onChangeIndex={setCurrentIndex}
      currentIndex={currentIndex}
    />
  );
}
