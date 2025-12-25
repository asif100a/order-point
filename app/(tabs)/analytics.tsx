import { Text } from "react-native";
import React from "react";
import PrivateRoute from "@/routes/PrivateRoute";

export default function Analytics() {
  return (
    <PrivateRoute>
      <Text>Analytics</Text>
    </PrivateRoute>
  );
}
