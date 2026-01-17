import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FAQType = {
  id: number;
  question: string;
  answer: string;
};

const ChevronRight = () => (
  <View
    style={{
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 16, color: "#666" }}>›</Text>
  </View>
);

const FAQApp = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<FAQType | null>(
    null,
  );

  const faqData: FAQType[] = [
    {
      id: 1,
      question: "How does SaveKey work?",
      answer:
        "SaveKey connects you to local businesses offering exclusive deals and discounts. Simply sign up, choose your plan, and start redeeming offers in-store using your unique QR code.",
    },
    {
      id: 2,
      question: "How do I redeem a deal?",
      answer:
        "SaveKey connects you to local businesses offering exclusive deals and discounts. Simply sign up, choose your plan, and start redeeming offers in-store using your unique QR code.",
    },
    {
      id: 3,
      question: "Can I use a deal more than once?",
      answer:
        "SaveKey connects you to local businesses offering exclusive deals and discounts. Simply sign up, choose your plan, and start redeeming offers in-store using your unique QR code.",
    },
    {
      id: 4,
      question: "What happens if my QR code expires?",
      answer:
        "SaveKey connects you to local businesses offering exclusive deals and discounts. Simply sign up, choose your plan, and start redeeming offers in-store using your unique QR code.",
    },
    {
      id: 5,
      question: "What's included in the Monthly and Annual plans?",
      answer:
        "SaveKey connects you to local businesses offering exclusive deals and discounts. Simply sign up, choose your plan, and start redeeming offers in-store using your unique QR code.",
    },
    {
      id: 6,
      question: "How do I upgrade, downgrade, or cancel my plan?",
      answer:
        "SaveKey connects you to local businesses offering exclusive deals and discounts. Simply sign up, choose your plan, and start redeeming offers in-store using your unique QR code.",
    },
  ];

  const { colorScheme, primaryColor } = useTheme();

  const styles = createStyles({ colorScheme, primaryColor });

  const FAQList = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={{ padding: 16 }}>
        <TopNavigationHeader title="FAQ" description="" link />
      </View>

      {/* FAQ Items */}
      <ScrollView style={styles.content}>
        {faqData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.faqItem}
            onPress={() => setSelectedQuestion(item)}
          >
            <Text style={styles.faqText}>
              {item.id}. {item.question}
            </Text>
            <ChevronRight />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  const QuestionDetail = ({ question }: { question: FAQType }) => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedQuestion(null)}
        >
          <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
      </View>

      {/* Question and Answers */}
      <ScrollView style={styles.detailContent}>
        <Text style={styles.questionTitle}>
          {question.id}. {question.question}
        </Text>

        {[1, 2, 3, 4, 5, 6].map((block) => (
          <Text key={block} style={styles.answerText}>
            {question.answer}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <View style={styles.appContainer}>
      {selectedQuestion ? (
        <QuestionDetail question={selectedQuestion} />
      ) : (
        <FAQList />
      )}
    </View>
  );
};

const createStyles = ({
  colorScheme,
  primaryColor,
}: {
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) => {
  return StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: "#fff",
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
    },
    backButton: {
      padding: 8,
      borderRadius: "50%",
      backgroundColor:
        colorScheme === "dark" ? "white" : primaryColor.primaryGray,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: "600",
      color: "#303030",
      marginLeft: 16,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    faqItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#f9fafb",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 8,
    },
    faqText: {
      fontSize: 14,
      color: "#374151",
      flex: 1,
      paddingRight: 16,
    },
    detailContent: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    questionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 24,
    },
    answerText: {
      fontSize: 14,
      color: "#6b7280",
      lineHeight: 22,
      marginBottom: 16,
    },
  });
};

export default FAQApp;
