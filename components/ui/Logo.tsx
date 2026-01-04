import { Image, StyleSheet, View } from "react-native";
import React from "react";

import LOGO from "@/assets/images/logo.png";

export default function Logo({ style = {} }) {
  return (
    <View style={style}>
      <Image source={LOGO} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 110,
    height: 110,
  },
});
