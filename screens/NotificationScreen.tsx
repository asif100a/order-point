import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableHighlight,
  Animated,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DeleteNotificationModal from "@/app/modals/DeleteNotificationModal";

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
  {
    title: "New Discount to near you ",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
    time: "1h",
  },
  {
    title: "New Discount to near you ",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
    time: "1h",
  },
  {
    title: "New Discount to near you ",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
    time: "1h",
  },
];

const NotificationItem = ({
  item,
  index,
  currentId,
  showDelete,
  handleViewDeleteIcon,
  styles,
  primaryColor,
  setShowDeleteModal,
}: {
  item: NotificationData;
  index: number;
  currentId: string;
  showDelete: boolean;
  handleViewDeleteIcon: (id: string) => void;
  styles: any;
  primaryColor: PrimaryColorTypes;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const slideAmin = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    if (currentId === index.toString() && showDelete) {
      Animated.timing(slideAmin, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAmin, {
        toValue: 80,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentId, showDelete, index, slideAmin]);

  return (
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
        <Animated.View
          style={[
            styles.deleteButton,
            {
              transform: [{ translateX: slideAmin }],
            },
          ]}
        >
          <TouchableHighlight
            style={styles.deleteButton}
            onPress={() => setShowDeleteModal(true)}
            underlayColor="#9A0010"
          >
            <MaterialIcons name="delete-outline" size={32} color="white" />
          </TouchableHighlight>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default function NotificationScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [currentId, setCurrentId] = useState<string>("");
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleViewDeleteIcon = (id: string) => {
    if (currentId === id && showDelete) {
      setShowDelete(false);
      setCurrentId("");
    } else {
      setShowDelete(true);
      setCurrentId(id);
    }
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
            <NotificationItem
              item={item}
              index={index}
              currentId={currentId}
              showDelete={showDelete}
              handleViewDeleteIcon={handleViewDeleteIcon}
              styles={styles}
              primaryColor={primaryColor}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        />
      </View>

      {/* Display modal */}
      <DeleteNotificationModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
      />
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
      marginBottom: 12,
      overflow: "hidden",
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
      flexDirection: "row",
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
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 80,
      backgroundColor: "#B50012",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
