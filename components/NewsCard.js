import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";


export default function NewsCard({ title }) {
return (
<View style={styles.card}>
<Text numberOfLines={3} style={styles.title}>{title}</Text>
</View>
);
}


const styles = StyleSheet.create({
card: { backgroundColor: colors.cardAlt, borderRadius: 16, padding: 12, width: 220, marginHorizontal: 8 },
title: { color: colors.text, fontSize: 15, fontWeight: "600" },
});