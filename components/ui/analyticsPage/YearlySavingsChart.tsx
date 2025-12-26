import useTheme from "@/hooks/useTheme";
import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const barData = [
  {
    value: 40,
    label: "Jan",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#79D2DE",
  },
  { value: 20, frontColor: "#ED6665" },
  {
    value: 50,
    label: "Feb",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#79D2DE",
  },
  { value: 40, frontColor: "#ED6665" },
  {
    value: 75,
    label: "Mar",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#79D2DE",
  },
  { value: 25, frontColor: "#ED6665" },
  {
    value: 30,
    label: "Apr",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#79D2DE",
  },
  { value: 20, frontColor: "#ED6665" },
  {
    value: 60,
    label: "May",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#79D2DE",
  },
  { value: 40, frontColor: "#ED6665" },
  {
    value: 65,
    label: "Jun",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#79D2DE",
  },
  { value: 30, frontColor: "#ED6665" },
];

export default function YearlySavingsChart() {
  const { primaryColor, colorScheme } = useTheme();

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 30 }}>
        <Text
          style={
            {
              color:
                colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "start",
            } as object
          }
        >
          Yearly Savings
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 24,
          }}
        >
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
                width: 60,
                height: 16,
                color: "gray",
              }}
            >
              Point 01
            </Text>
          </View>
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
                width: 60,
                height: 16,
                color: "gray",
              }}
            >
              Point 02
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: primaryColor.primaryGray,
        paddingBottom: 40,
        borderRadius: 10,
        paddingHorizontal: 16,
      }}
    >
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={3}
        maxValue={75}
      />
    </View>
  );
}
