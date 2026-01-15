import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const [searches, setSearches] = useState([
    { id: "1", name: "Daily Daawat-Gulshan 1" },
    { id: "2", name: "Daily Daawat-Gulshan 1" },
    { id: "3", name: "Daily Daawat-Gulshan 1" },
  ]);

  const { colorScheme, theme, primaryColor } = useTheme();
  const styles = createStyles({ colorScheme, theme, primaryColor });

  const removeSearch = useCallback(
    (id: string) => {
      setSearches(searches.filter((search) => search.id !== id));
    },
    [searches]
  );

  const clearAll = () => {
    setSearches([]);
  };

  const renderSearchItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.searchItem}>
        <View style={styles.searchLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🍽️</Text>
          </View>
          <Text style={styles.searchName}>{item.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeSearch(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    ),
    [
      removeSearch,
      styles.avatar,
      styles.avatarText,
      styles.removeButton,
      styles.removeIcon,
      styles.searchItem,
      styles.searchLeft,
      styles.searchName,
    ]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
      <TopNavigationHeader link title="Search" description="" />

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by business name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Recent Search Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recent Search</Text>
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Search List */}
        {searches.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recent searches</Text>
          </View>
        ) : (
          <FlatList
            data={searches}
            renderItem={renderSearchItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
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
    },
    contentContainer: {
      padding: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: primaryColor.primaryGray,
      borderRadius: 50,
      paddingHorizontal: 16,
      height: 50,
      width: "100%",
      marginBottom: 24,
    },
    searchIcon: {
      fontSize: 18,
      marginRight: 6,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: "#111827",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#111827",
    },
    clearAll: {
      fontSize: 14,
      fontWeight: 600,
      color: primaryColor.greenNormal,
    },
    listContainer: {
      gap: 12,
    },
    searchItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 8,
    },
    searchLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#E5E7EB",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarText: {
      fontSize: 20,
    },
    searchName: {
      fontSize: 14,
      fontWeight: "500",
      color: "#111827",
      flex: 1,
    },
    removeButton: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      backgroundColor: primaryColor.primaryGray,
      borderRadius: 50,
    },
    removeIcon: {
      fontSize: 16,
      color: "#9CA3AF",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 32,
    },
    emptyText: {
      fontSize: 14,
      color: "#9CA3AF",
    },
  });
};
