import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";


export default function LivePill({ label = "LIVE" }) {
return (
<View style={styles.pill}>
<View style={styles.dot} />
<Text style={styles.txt}>{label}</Text>
</View>
);
}


const styles = StyleSheet.create({
pill: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(230,57,70,0.15)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.live, marginRight: 6 },
txt: { color: colors.live, fontSize: 12, fontWeight: "700" },
});