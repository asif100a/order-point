import React, { useState } from "react";
import SuccessPage from "@/components/ui/page/SuccessPage";
import { View } from "react-native";
import ReceiptDownloadModal from "@/app/modals/ReceiptDownloadModal";

export default function PaymentSuccessScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View>
      <SuccessPage
        headerTitle=""
        headerDescription=""
        title="Your payment is Successful"
        description="Your subscription is now active.
You can now start enjoying exclusive discounts
and perks."
        buttonText="Download Receipt"
        onButtonClick={() => setModalVisible(true)}
        navigationLink={"/subscription/payment" as any}
        backToHomeBtn
      />

      {/* Modal */}
      <ReceiptDownloadModal
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </View>
  );
}
