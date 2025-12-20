import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface NotificationData {
  title: string;
  description: string;
  time: string;
}

const NOTIFICATION_DATA: NotificationData[] = [
  {
    title: "New Discount to near you ",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
    time: "1h",
  },
];

export default function NotificationScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [currentId, setCurrentId] = useState<string>("");
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleViewDeleteIcon = (id: string) => {
    setShowDelete(!showDelete);
    setCurrentId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationHeader
        title="Notifications"
        description=""
        link={"/(tabs)" as any}
      />

      <View style={styles.contentContainer}>
        {/* Top Section */}
        <View style={styles.statusAndAction}>
          <Text style={styles.statusText}>TODAY</Text>
          <Pressable>
            <Text style={styles.actionText}>Mark all as read</Text>
          </Pressable>
        </View>

        {/* Notification Cards */}
        <FlatList
          data={NOTIFICATION_DATA}
          keyExtractor={(_, i) => i.toString()}
          style={styles.cardContainer}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handleViewDeleteIcon(index.toString())}>
              <View style={styles.card}>
                {/* calendar */}
                <View style={styles.calendarContainer}>
                  <FontAwesome
                    name="calendar"
                    size={24}
                    color={primaryColor.greenNormal}
                  />
                </View>
                <View style={styles.cardMain}>
                  <View style={styles.textContainer}>
                    <View style={styles.titleAndTime}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  {/* Delete Button */}
                </View>
                  {currentId === index.toString() && showDelete && (
                    <TouchableHighlight style={styles.deleteButton}>
                      <MaterialIcons
                        name="delete-outline"
                        size={32}
                        color="white"
                      />
                    </TouchableHighlight>
                  )}
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    contentContainer: {
      width: "100%",
      height: "auto",
      marginTop: 0,
    },
    statusAndAction: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statusText: {
      fontSize: 14,
      fontWeight: 600,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    actionText: {
      fontSize: 14,
      fontWeight: 500,
      color: primaryColor.greenNormal,
    },
    cardContainer: {
      marginTop: 20,
    },
    card: {
      flexDirection: "row",
      gap: 12,
      padding: 16,
      backgroundColor: primaryColor.secondaryGreen,
      borderRadius: 8,
    },
    calendarContainer: {
      backgroundColor: colorScheme === "dark" ? "#00000040" : "white",
      borderRadius: 50,
      height: 50,
      width: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    cardMain: {
      flex: 1,
      flexDirection: 'row'
    },
    textContainer: {
      flex: 1,
    },
    titleAndTime: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    title: {
      flex: 1,
      fontSize: 16,
      fontWeight: 600,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    time: {
      fontSize: 14,
      fontWeight: 500,
      color: "blue",
      flexShrink: 0,
    },
    description: {
      fontSize: 14,
      fontWeight: 400,
      color: colorScheme === "dark" ? "white" : primaryColor.secondaryBlack,
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 72,
        backgroundColor: '#B50012',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });
}