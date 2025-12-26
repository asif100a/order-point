import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Picker } from "@react-native-picker/picker";

export default function FavoriteCategoriesChart({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  const { primaryColor, colorScheme } = useTheme();

  const styles = createStyles(primaryColor, colorScheme);

  const data = [
    { value: 15, color: "#177AD5" },
    { value: 30, color: "#79D2DE" },
    { value: 26, color: "#ED6665" },
    { value: 40, color: "#8F80F3" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.titleDropdownPair}>
        <Text style={styles.title}>Favorite Categories</Text>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) =>
            setSelected(itemValue)
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Python" value="py" />
        </Picker>
      </View>

      <View style={styles.chartContainer}>
        <PieChart data={data} />

        <View
          style={{
            marginTop: 24,
            flexDirection: "column",
            gap: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#177AD5",
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: "gray",
                }}
              >
                Category 1
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#79D2DE",
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: "gray",
                }}
              >
                Category 2
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#ED6665",
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: "gray",
                }}
              >
                Category 3
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#8F80F3",
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: "gray",
                }}
              >
                Category 4
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function createStyles(
  primaryColor: PrimaryColorTypes,
  colorScheme: ColorSchemeTypes
) {
  return StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: primaryColor.primaryGray,
      borderRadius: 16,
    },
    titleDropdownPair: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 500,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    chartContainer: {
      marginHorizontal: "auto",
    },
  });
}
