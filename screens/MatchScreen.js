import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const colors = {
  background: "#0a0a0a",
  text: "#fff",
  card: "#1c1c1c",
  border: "#333",
  primary: "#2e7d32",
};

export default function MatchScreen() {
  const [tab, setTab] = useState("chat");

  const homeLineup = {
    formation: "4-3-3",
    starting: {
      GK: ["Courtois"],
      DEF: ["Carvajal", "Militão", "Alaba", "Mendy"],
      MID: ["Modric", "Kroos", "Valverde"],
      FWD: ["Vinícius Jr", "Benzema", "Rodrygo"],
    },
    subs: ["Lunin", "Nacho", "Camavinga", "Asensio", "Ceballos"],
  };

  const awayLineup = {
    formation: "4-2-3-1",
    starting: {
      GK: ["ter Stegen"],
      DEF: ["Koundé", "Araújo", "Christensen", "Alba"],
      MID: ["Busquets", "Pedri", "Gavi"],
      FWD: ["Raphinha", "Lewandowski", "Dembélé"],
    },
    subs: ["Iñaki Peña", "Balde", "Fati", "Torres", "Kessié"],
  };

  const renderLine = (players, reverse = false) => (
    <View
      style={[
        styles.lineRow,
        reverse && { flexDirection: "row-reverse" }, // mirror away team
      ]}
    >
      {players.map((p) => (
        <View key={p} style={styles.playerBubble}>
          <Text style={styles.playerText}>{p}</Text>
        </View>
      ))}
    </View>
  );

  const renderTeam = (team, reverse = false) => (
    <View style={{ flex: 1 }}>
      {Object.entries(team.starting).map(([role, players]) =>
        renderLine(players, reverse)
      )}
    </View>
  );

  const renderLineup = () => (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.formationText}>Home Formation: {homeLineup.formation}</Text>
      <Text style={styles.formationText}>Away Formation: {awayLineup.formation}</Text>

      {/* Pitch */}
      <View style={styles.pitch}>
        {/* Home team (top) */}
        {renderTeam(homeLineup, false)}

        {/* Halfway line */}
        <View style={styles.halfwayLine} />

        {/* Away team (bottom, mirrored) */}
        {renderTeam(awayLineup, true)}
      </View>

      {/* Benches */}
      <Text style={styles.subsTitle}>Home Substitutes</Text>
      <View style={styles.subsRow}>
        {homeLineup.subs.map((s) => (
          <View key={s} style={styles.subBubble}>
            <Text style={styles.playerText}>{s}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subsTitle}>Away Substitutes</Text>
      <View style={styles.subsRow}>
        {awayLineup.subs.map((s) => (
          <View key={s} style={styles.subBubble}>
            <Text style={styles.playerText}>{s}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          onPress={() => setTab("chat")}
          style={[styles.tabButton, tab === "chat" && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === "chat" && styles.tabTextActive]}>
            CHAT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("stats")}
          style={[styles.tabButton, tab === "stats" && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === "stats" && styles.tabTextActive]}>
            STATS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("lineup")}
          style={[styles.tabButton, tab === "lineup" && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === "lineup" && styles.tabTextActive]}>
            LINEUP
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab content */}
      <ScrollView style={{ flex: 1 }}>
        {tab === "chat" && (
          <Text style={{ color: colors.text, padding: 16 }}>
            Chat messages will appear here...
          </Text>
        )}
        {tab === "stats" && (
          <Text style={{ color: colors.text, padding: 16 }}>
            Stats content goes here...
          </Text>
        )}
        {tab === "lineup" && renderLineup()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: "#aaa", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  formationText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 8,
  },
  pitch: {
    backgroundColor: "#1b5e20",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 12,
    margin: 12,
    paddingVertical: 20,
  },
  halfwayLine: {
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginVertical: 12,
  },
  lineRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  playerBubble: {
    backgroundColor: "#2e7d32",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  playerText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  subsTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
    marginLeft: 12,
  },
  subsRow: { flexDirection: "row", flexWrap: "wrap", padding: 8 },
  subBubble: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 4,
  },
});
