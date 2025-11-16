import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import LivePill from "./LivePill";


export default function MatchCard({ match, onPress }) {
const { teams, score, minute, isLive, kickoff } = match;
return (
<TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
<View style={styles.row}>
{isLive ? (
<LivePill />
) : (
<Text style={styles.kickoff}>{kickoff}</Text>
)}
<Text style={styles.score}>{score}</Text>
{isLive && <Text style={styles.minute}>{minute}</Text>}
</View>
<Text numberOfLines={2} style={styles.teams}>{teams}</Text>
</TouchableOpacity>
);
}


const styles = StyleSheet.create({
card: {
backgroundColor: colors.card,
borderRadius: 16,
padding: 12,
width: 220,
marginHorizontal: 8,
},
row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
score: { color: colors.text, fontWeight: "800", fontSize: 18, marginLeft: 8, marginRight: 6 },
minute: { color: colors.info, fontSize: 13 },
kickoff: { color: colors.textDim, fontSize: 13 },
teams: { color: colors.text, fontSize: 15, fontWeight: "600" },
});