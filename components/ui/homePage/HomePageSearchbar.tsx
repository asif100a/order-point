import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import TextInputField from "../form/TextInputField";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import CategoryImg1 from "@/assets/images/category/category1.png";
import CategoryImg2 from "@/assets/images/category/category2.png";
import Entypo from "@expo/vector-icons/Entypo";

interface SearchData {
  id: string;
  title: string;
  image: string;
}

const SEARCH_DATA: SearchData[] = [
  { id: "1", title: "Daily Daawat-Gulshan 1", image: CategoryImg1 },
  { id: "2", title: "Daily Daawat-Gulshan 2", image: CategoryImg2 },
  { id: "3", title: "Daily Daawat-Gulshan 1", image: CategoryImg1 },
  { id: "4", title: "Daily Daawat-Gulshan 2", image: CategoryImg2 },
];

export default function HomePageSearchbar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [filteredItems, setFilteredItems] = useState<SearchData[]>(SEARCH_DATA);

  const styles = createStyles(theme, colorScheme, primaryColor);

  const handleDeleteItem = (id: string) => {
    const filtered = filteredItems.filter((item: SearchData) => item.id !== id);
    setFilteredItems(filtered);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInputField
        label=""
        placeholder="🔍 Looking for..."
        value={searchTerm}
        onTextChange={setSearchTerm}
      />

      {/* Suggestion Dropdown */}
      {searchTerm.trim()?.length > 0 && (
        <View style={styles.suggestionDropdown}>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: { item: SearchData }) => (
              <View style={styles.listItem}>
                <Pressable style={styles.imgTitle}>
                  <Image
                    source={item.image}
                    width={32}
                    height={32}
                    style={styles.img}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </Pressable>

                <TouchableOpacity
                  onPress={() => handleDeleteItem(item.id)}
                  style={styles.crossButton}
                >
                  <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    inputContainer: {
      position: "relative",
    },
    suggestionDropdown: {
      position: "absolute",
      top: 80,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: 6,
      borderRadius: 8,
      backgroundColor: "white",
      //   IOS Shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      // Android Shadow
      elevation: 8,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    imgTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    img: {
      width: 32,
      height: 32,
      borderRadius: 50,
    },
    title: {
      fontSize: 16,
      fontWeight: "normal",
    },
    crossButton: {
      backgroundColor: primaryColor.primaryGray,
      padding: 3,
      borderRadius: 50,
    },
  });
}
