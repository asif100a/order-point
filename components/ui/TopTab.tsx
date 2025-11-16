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

  return (
    <View style={styles.tabContainer}>
      {tabs.map((t: string) => {
        if (t === active) {
          return <Button key={t} title={t} onPress={() => setActive(t)} />;
        } else {
          return (
            <TouchableOpacity key={t} style={styles.button}>
              <Text style={styles.buttonText}>{t}</Text>
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
      width: "100%",
      flexDirection: "row",
      gap: 4,
    },
    button: {
      width: "100%",
      height: 56,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : 'white'
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}
