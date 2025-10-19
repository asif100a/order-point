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
import { router } from "expo-router";
import React, { useState } from "react";
import {
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

  const handleNext = () => {
    router.push("/auth_option");
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
            showsHorizontalScrollIndicator={false} // To hide the scroll indicator
            style={{ gap: 6 }}
            renderItem={({
              item,
              index,
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
                    index === 0 ? { marginRight: 8 } : { marginLeft: 8 },
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
        {/* Next Button */}
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
      width: 344, // Adjusted logo size
      height: 92, // Adjusted logo size
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
      flexDirection: "row",
    },
    widget: {
      width: 160, // Fixed width for each widget
      height: 152,
      borderColor: "#dff7eaff",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 12,
      backgroundColor: "#eff7f775",
      padding: 16,
      marginTop: 20,
      alignItems: "center", // Center content horizontally
      justifyContent: "center", // Center content vertically
    },
    activeWidget: {
      backgroundColor: "#EEF9F4", // Highlight active widget (change as needed)
      borderColor: primaryColor.greenNormal,
    },
    icon: {
      width: 38,
      height: 38,
      marginBottom: 10, // Added margin to separate icon from text
    },
    widgetTitle: {
      fontSize: 18,
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
      marginTop: 12,
      textAlign: "center", // Center-align the title
    },
    widgetDescription: {
      fontSize: 14,
      color: colorScheme === "dark" ? theme.text : primaryColor.primaryBlack,
      marginTop: 8,
      textAlign: "center", // Center-align the description
    },
  });
}
