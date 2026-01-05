import React from "react";
import PrivateRoute from "@/routes/PrivateRoute";
import AnalyticsScreen from "@/screens/user/AnalyticsScreen";

export default function Analytics() {
  return (
    <PrivateRoute>
      <AnalyticsScreen />
    </PrivateRoute>
  );
}
