import { View, Text } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import TopTab from "@/components/ui/TopTab";

export type tabType = "monthly" | "yearly";

const TABS: tabType[] = ["monthly", "yearly"];

export default function ChoosePlan() {
  const [active, setActive] = useState<tabType>("monthly");

  return (
    <ScreenContainer>
      <TopNavigationHeader
        title="Choose your plan"
        description=""
        link={"/profile/add_photo" as any}
      />
      {/* Tab */}
      <TopTab tabs={TABS} active={active} setActive={setActive as any} />
    </ScreenContainer>
  );
}
