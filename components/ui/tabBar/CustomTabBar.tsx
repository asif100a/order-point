import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { UserRole } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomTabBarProps extends BottomTabBarProps {
  userRole?: UserRole;
}

export function CustomTabBar({
  state,
  descriptors,
  navigation,
  userRole,
}: CustomTabBarProps) {
  // Define which routes are visible for each role
  const getVisibleRoutes = () => {
    return state.routes.filter((route) => {
      const routeName = route.name;

      // Common routes visible to all
      if (routeName === "index" || routeName === "account") {
        return true;
      }

      // User-specific routes
      if (userRole === "user") {
        return routeName === "favorite" || routeName === "analytics";
      }

      // Business-specific routes
      if (userRole === "business") {
        return routeName === "deals" || routeName === "insights";
      }

      return false;
    });
  };

  const visibleRoutes = getVisibleRoutes();

  return (
    <View style={styles.tabBarContainer}>
      {visibleRoutes.map((route) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        // Get the original index from state.routes to check if focused
        const routeIndex = state.routes.findIndex((r) => r.key === route.key);
        const isFocused = state.index === routeIndex;

        const onPress = () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <View style={styles.tabContent}>
              {/* Top indicator bar for active tab */}
              {isFocused && <View style={styles.activeIndicator} />}

              {/* Icon */}
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? "#556D55" : "#999",
                  size: 24,
                })}

              {/* Label */}
              <View style={styles.labelContainer}>
                {typeof label === "string" ? (
                  <Text
                    style={[
                      styles.label,
                      { color: isFocused ? "#000" : "#999" },
                    ]}
                  >
                    {label}
                  </Text>
                ) : typeof label === "function" ? (
                  label({
                    focused: isFocused,
                    color: isFocused ? "#000" : "#999",
                    position: "below-icon",
                    children: route.name,
                  })
                ) : (
                  <Text
                    style={[
                      styles.label,
                      { color: isFocused ? "#000" : "#999" },
                    ]}
                  >
                    {route.name}
                  </Text>
                )}
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    height: 65,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    top: -10,
    width: 60,
    height: 6,
    backgroundColor: "#76A976",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  labelContainer: {
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});
