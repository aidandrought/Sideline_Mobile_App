import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";


const EMOJIS = ["🔥", "👏", "😮", "😭", "💀", "💯"];


export default function ReactionBar({ onReact }) {
return (
<View style={styles.row}>
{EMOJIS.map((e) => (
<TouchableOpacity key={e} onPress={() => onReact?.(e)} style={styles.btn}>
<Text style={styles.txt}>{e}</Text>
</TouchableOpacity>
))}
</View>
);
}


const styles = StyleSheet.create({
row: { flexDirection: "row", alignItems: "center" },
btn: { paddingHorizontal: 6, paddingVertical: 4 },
txt: { fontSize: 18 },
});