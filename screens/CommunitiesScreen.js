import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import SectionHeader from "../components/SectionHeader";


const communities = [
{ id: "c1", name: "Liverpool", league: "Premier League", members: 12834 },
{ id: "c2", name: "Premier League", league: "League Hub", members: 320401 },
{ id: "c3", name: "Seattle Sounders", league: "MLS", members: 8421 },
];


export default function CommunitiesScreen() {
return (
<View style={styles.container}>
<SectionHeader title="Your Communities" />
<FlatList
data={communities}
keyExtractor={(i) => i.id}
renderItem={({ item }) => (
<TouchableOpacity style={styles.comm}>
<Text style={styles.name}>{item.name}</Text>
<Text style={styles.meta}>{item.league} • {Intl.NumberFormat().format(item.members)} members</Text>
</TouchableOpacity>
)}
contentContainerStyle={{ padding: 12 }}
/>


<SectionHeader title="League Hubs" />
<View style={{ padding: 12 }}>
<Text style={styles.meta}>News • Posts • Tables/Stats</Text>
<Text style={[styles.meta, { marginTop: 4 }]}>(Hook here later to a free football API for scores/lineups/live stats)</Text>
</View>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: colors.bg },
comm: { backgroundColor: colors.card, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
name: { color: colors.text, fontWeight: "800", fontSize: 16 },
meta: { color: colors.textMuted },
});