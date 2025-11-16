import React from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import colors from "../styles/colors";

const communities = [
  { id: "1", name: "Premier League", type: "League" },
  { id: "2", name: "Liverpool FC", type: "Club" },
  { id: "3", name: "UEFA Champions League", type: "League" },
];

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search games, clubs, or communities..."
        placeholderTextColor={colors.textMuted}
      />
      <FlatList
        data={communities}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 12 },
  search: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Android shadow
  },
  name: { color: colors.text, fontSize: 16, fontWeight: "bold" },
  type: { color: colors.textMuted, fontSize: 14 },
});
