import { View, Text, Modal, StyleSheet, Image } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import useTheme from "@/hooks/useTheme";
import { PrimaryColorTypes } from "@/types";
import SuccessIcon from "@/assets/images/common/success_checkmark.png";

export default function ReceiptDownloadModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ primaryColor });

  return (
    <View>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View style={styles.iconContainer}>
              <Image
                source={SuccessIcon}
                alt="Success"
                width={80}
                height={80}
                style={styles.icon}
              />
            </View>

            <Text style={styles.title}>Total Payment</Text>
            <Text style={styles.price}>$125.00</Text>

            {/* Payment Info */}
            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Text style={styles.infoText}>Date</Text>
                <Text style={styles.infoText}>20 Jun 2025</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Transaction ID</Text>
                <Text style={styles.infoText}>#WN326541</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Account</Text>
                <Text style={styles.infoText}>#WN326541</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Subscription</Text>
                <Text style={styles.infoText}>Month</Text>
              </View>
              {/* Divider */}
              <View style={styles.divider} />
              {/* Total */}
              <View style={styles.info}>
                <Text style={styles.total}>Total Payment</Text>
                <Text style={styles.total}>$50.00</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function createStyles({ primaryColor }: { primaryColor: PrimaryColorTypes }) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBox: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      elevation: 5,
    },
    iconContainer: {
      position: "relative",
      paddingBottom: 24,
    },
    icon: {
      position: 'absolute',
      top: -60, 
      left: '38%',
    },
    title: {
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 8,
      textAlign: "center",
    },
    price: {
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 24,
      textAlign: "center",
    },
    infoContainer: {
      width: "100%",
      height: "auto",
    },
    info: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    infoText: {
      fontSize: 16,
      fontWeight: "normal",
    },
    divider: {
      width: "100%",
      height: 1,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: primaryColor.primaryBlack,
      marginBottom: 24,
    },
    total: {
      fontSize: 18,
      fontWeight: "500",
    },
  });
}
