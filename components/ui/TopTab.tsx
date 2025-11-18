import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes } from "@/types";
import Button from "./buttons/Button";

export default function TopTab({
  tabs,
  active,
  setActive,
}: {
  tabs: string[];
  active: string,
  setActive: Dispatch<SetStateAction<string>>,
}) {
  const { theme, primaryColor, colorScheme } = useTheme();
  const styles = createStyle({ primaryColor, colorScheme });

  const toCapitalize = (text: string) => {
    return text?.slice(0, 1).toUpperCase() + text.slice(1)
  }

  return (
    <View style={styles.tabContainer}>
      {tabs.map((t: string) => {
        if (t === active) {
          return <Button key={t} title={toCapitalize(t)} onPress={() => setActive(t)} style={{width: '48%', marginTop: 0}} />;
        } else {
          return (
            <TouchableOpacity onPress={() => setActive(t)} key={t} style={styles.button}>
              <Text style={styles.buttonText}>{toCapitalize(t)}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}

function createStyle({ primaryColor, colorScheme }: { primaryColor: PrimaryColorTypes; colorScheme: ColorSchemeTypes }) {
  return StyleSheet.create({
    tabContainer: {
      flexDirection: "row",
      gap: 12,
      backgroundColor: '#F3F3F5',
      padding: 8,
      borderRadius: 40
    },
    button: {
      width: "48%",
      height: 56,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : 'white'
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}
