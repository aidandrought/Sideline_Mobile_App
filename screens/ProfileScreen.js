import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";


export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
});
