import user1 from "@/assets/images/chooseRole/user1.png";
import user2 from "@/assets/images/chooseRole/user2.png";
import Button from "@/components/ui/buttons/Button";
import Logo from "@/components/ui/Logo";
import useTheme from "@/hooks/useTheme";
import {
  ColorSchemeTypes,
  PrimaryColorTypes,
  ThemeTypes,
  WidgetTypes,
} from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const widgets: WidgetTypes[] = [
  {
    id: "1",
    title: "Member",
    description: "Select how you want to get started",
    icon: user1,
  },
  {
    id: "2",
    title: "Local Business",
    description: "Select how you want to get started",
    icon: user2,
  },
];

const ChooseRoleScreen = () => {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [activeWidgetIndex, setActiveWidgetIndex] = useState<number>(1);

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleNext = async () => {
    try {
      if (activeWidgetIndex === 1) {
        await AsyncStorage.setItem("userRole", "user");
      } else {
        await AsyncStorage.setItem("userRole", "business");
      }
      router.push("/auth_option");
    } catch (error) {
      console.error('❌ Failed to set user role: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.text, styles.title]}>Choose your role</Text>
        <Text style={styles.description}>
          Select how you want to get started
        </Text>

        {/* Widget */}
        <View style={styles.widgetContainer}>
          <FlatList
            data={widgets}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({
              item,
            }: {
              item: WidgetTypes;
              index: number;
            }) => (
              <TouchableOpacity
                onPress={() => setActiveWidgetIndex(parseInt(item.id))}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.widget,
                    activeWidgetIndex === parseInt(item.id)
                      ? styles.activeWidget
                      : null,
                  ]}
                >
                  <Image source={item.icon} style={styles.icon} />
                  <Text style={[styles.text, styles.widgetTitle]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.text, styles.widgetDescription]}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <Button title="Next" onPress={handleNext} style={{ marginTop: 40 }} />
      </View>
    </View>
  );
};

export default ChooseRoleScreen;

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  const screenWidth = Dimensions.get('window').width;
  const containerPadding = 32; // 16px left + 16px right
  const gap = 16; // gap between widgets
  const widgetWidth = (screenWidth - containerPadding - gap) / 2;

  return StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: theme.background,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 80,
    },
    logoContainer: {
      alignItems: "center",
      paddingTop: 40,
    },
    logo: {
      width: 344,
      height: 92,
    },
    contentContainer: {
      marginTop: 40,
    },
    text: {
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
    },
    title: {
      fontSize: 32,
      fontWeight: "semibold",
    },
    description: {
      fontSize: 16,
      fontWeight: "regular",
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
    },
    widgetContainer: {
      width: "100%",
      marginTop: 20,
    },
    widget: {
      width: widgetWidth,
      height: 152,
      borderColor: "#dff7eaff",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 12,
      backgroundColor: "#eff7f775",
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    activeWidget: {
      backgroundColor: "#EEF9F4",
      borderColor: primaryColor.greenNormal,
    },
    icon: {
      width: 38,
      height: 38,
      marginBottom: 10,
    },
    widgetTitle: {
      fontSize: 18,
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
      marginTop: 12,
      textAlign: "center",
    },
    widgetDescription: {
      fontSize: 14,
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
      marginTop: 8,
      textAlign: "center",
    },
  });
}