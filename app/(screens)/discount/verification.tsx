import { View } from "react-native";
import React from "react";
import SuccessPage from "@/components/ui/page/SuccessPage";

export default function verification() {
  return (
    <View>
      <SuccessPage
        headerTitle="Verification"
        headerDescription=""
        title="Congratulations! 🎉"
        description="You've successfully verified your membership and please show this screen when you go to checkout"
        navigationLink={"/(tabs)" as any}
        onButtonClick={() => {}}
        buttonText="Redeemed"
        extraDescription={true}
      />
    </View>
  );
}
