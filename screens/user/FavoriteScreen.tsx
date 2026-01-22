import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { CategoryType } from "@/app/(screens)/favorite";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfirmModal from "@/app/modals/ConfirmModal";

export default function FavoriteScreen({
  categories,
}: {
  categories: CategoryType[];
}) {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TopNavigationHeader title="Favorite" description="" link />

        {/* Category Cards */}
        <View>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  {/* Left: Image */}
                  <Image
                    source={item.image as ImageSourcePropType}
                    style={styles.image}
                    alt={item.title}
                  />

                  {/* Middle: Content */}
                  <View style={styles.middleContent}>
                    {/* Title */}
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>

                    {/* Discount Tag */}
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>{item.discount}</Text>
                    </View>

                    {/* Usage Info */}
                    <View style={styles.usageInfo}>
                      <Text style={styles.usageLabel}>
                        {"You've"} used this discount:
                      </Text>
                      <Text style={styles.usageValue}>2/5</Text>
                    </View>

                    {/* Location */}
                    <View style={styles.locationContainer}>
                      <Text style={styles.locationLabel}>Location:</Text>
                      <Text style={styles.locationValue} numberOfLines={1}>
                        {item.location || "Mohakhali, Dhaka"}
                      </Text>
                    </View>
                  </View>

                  {/* Right: Delete Button */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    activeOpacity={0.7}
                    onPress={() => setShowDeleteModal(true)}
                  >
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={24}
                      color="#FF3B30"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>

      {/* Modal */}
      <ConfirmModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        title="Are you sure?"
        description="Do you want to delete from favorite list"
      />
    </>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes,
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingBottom: 28,
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#FFFFFF",
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: primaryColor.borderColor,
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
    },
    image: {
      width: 72,
      height: 72,
      borderRadius: 8,
      flexShrink: 0,
    },
    middleContent: {
      flex: 1,
      gap: 6,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 2,
    },
    discountTag: {
      alignSelf: "flex-start",
      backgroundColor: "#FFF3F0",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    discountText: {
      fontSize: 12,
      fontWeight: "500",
      color: "#FF6B4A",
    },
    usageInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    usageLabel: {
      fontSize: 13,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#999" : "#666666",
    },
    usageValue: {
      fontSize: 13,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
    },
    locationLabel: {
      fontSize: 13,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#999" : "#666666",
    },
    locationValue: {
      fontSize: 13,
      fontWeight: "500",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      flex: 1,
    },
    deleteButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FFE5E5",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    },
  });
}
