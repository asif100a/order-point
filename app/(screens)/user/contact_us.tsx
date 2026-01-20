import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import EmailInputField from "@/components/ui/form/EmailInputField";
import TextInputField from "@/components/ui/form/TextInputField";
import TextAreaField from "@/components/ui/form/TextAreaField";
import Button from "@/components/ui/buttons/Button";
import Feather from "@expo/vector-icons/Feather";
import { useCreateSupportMutation } from "@/store/api/supportApi";
import Toast from "react-native-toast-message";
import useAuth from "@/hooks/useAuth";
import LoaderUI from "@/components/ui/loader/LoaderUI";

export default function ContactUs() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const { user, isAuthLoading } = useAuth();
  const styles = createStyles({ colorScheme, theme, primaryColor });

  const [createSupport, { isLoading: isSupportLoading }] =
    useCreateSupportMutation();

  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCreateSupport = async () => {
    const newData = {
      author: user?._id,
      email,
      subject,
      messages: message,
    };

    try {
      const res = await createSupport(newData).unwrap();
      // ✅ Check for error in the response
      if ("error" in res) {
        // Handle different error types
        const err = res.error as {
          status?: number;
          message?: string;
          data?: { message: string };
        };
        const errorMessage =
          "status" in err && err.status != null
            ? `Error: ${err.status} ${err.message || err?.data?.message}`
            : "Unknown error";

        return Toast.show({
          type: "error",
          text1: "Sending support message Failed",
          text2: errorMessage,
        });
      }

      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Support message sent successfully",
        });
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error("❌ Error while sending support message: ", error);
    }
  };

  if (isAuthLoading) return <LoaderUI />;

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationHeader title="Contact Us" description="" link />

      {/* Content */}
      <View>
        <Text style={styles.title}>Get in Touch</Text>
        <Text style={styles.description}>{"We'd"} love to hear from you! </Text>

        {/* Contact Form */}
        <View style={styles.form}>
          <EmailInputField
            label="Email Address"
            value={email}
            onEmailChange={setEmail}
          />

          <TextInputField
            label="Subject"
            value={subject}
            onTextChange={setSubject}
          />

          <TextAreaField
            label="Message"
            value={message}
            onTextChange={setMessage}
          />

          <Button
            title="Send Message"
            onPress={handleCreateSupport}
            loading={isSupportLoading}
          />
        </View>

        <View style={styles.bottomInfo}>
          <View style={styles.info}>
            {/* Icon */}
            <Feather name="mail" size={16} color="black" />
            <Text>support@savekey.com</Text>
          </View>
          <View style={styles.info}>
            {/* Icon */}
            <Feather name="phone" size={16} color="black" />
            <Text>+8801 65324 655</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = ({
  theme,
  colorScheme,
  primaryColor,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    title: {
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 6,
    },
    description: {
      color: colorScheme === "dark" ? "white" : primaryColor.secondaryBlack,
      fontSize: 16,
      fontWeight: 400,
    },
    form: {
      marginTop: 32,
    },
    bottomInfo: {
      marginTop: 32,
    },
    info: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    },
    infoText: {
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      fontSize: 16,
      fontWeight: 500,
    },
  });
};
