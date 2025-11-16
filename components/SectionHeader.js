import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import theme from "../styles/theme"; // ✅ use theme spacing

export default function SectionHeader({ title, action }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: theme.spacing.md, // was hardcoded 16
    marginTop: theme.spacing.sm,        // was 16 → much tighter
    marginBottom: theme.spacing.xs,     // add bottom space so text doesn't crowd
  },
  title: {
    color: colors.textMuted,
    fontSize: 13,
    letterSpacing: 1,
    fontWeight: "700",
  },
});
