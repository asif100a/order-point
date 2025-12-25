import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useGetUserQuery } from "@/store/api/authApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading, isError, error } = useGetUserQuery();
  console.log("User: ", user)

  useEffect(() => {
    if (isError) {
      console.error("❌ Error while getting the user profile: ", error);
    }
  }, [error, isError]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  if (user?.id) return <View>{children}</View>;
  return <Redirect href={"/sign-in" as any} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
