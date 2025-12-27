import React from "react";
import AddPhoto from "@/screens/profile/AddPhoto";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function add_photo() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "grey",
      }}
    >
      <AddPhoto />
    </GestureHandlerRootView>
  );
}
