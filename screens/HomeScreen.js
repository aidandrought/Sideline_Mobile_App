import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";
import theme from "../styles/theme";
import { Ionicons } from "@expo/vector-icons"; // install expo/vector-icons if not already

const SCREEN_WIDTH = Dimensions.get("window").width;

const liveData = [
  { id: "1", teams: "Real Madrid vs Barcelona", score: "1–1", minute: "56’", isLive: true },
  { id: "2", teams: "Liverpool vs Man Utd", score: "5–0", minute: "12’", isLive: true },
];

const upcomingData = [
  { id: "3", teams: "Seahawks vs Falcons", time: "12:30 PM" },
  { id: "4", teams: "Lakers vs Pistons", time: "12:30 PM" },
];

const newsData = [
  { id: "5", title: "Haaland Renews Contract" },
  { id: "6", title: "Ronaldo Retires" },
];

const missedData = [
  { id: "7", teams: "Real Madrid vs Barcelona", score: "1–1", final: true },
  { id: "8", teams: "Liverpool vs Man Utd", score: "5–0", final: true },
];

const CARD_HEIGHT = { live: 90, news: 180, missed: 180 };
const SECTION_GAP = theme.spacing.md;
const CARD_LEFT = theme.spacing.sm;

export default function HomeScreen({ navigation }) {
  const renderLive = ({ item }) => (
    <TouchableOpacity
      style={[styles.liveCard, { height: CARD_HEIGHT.live }]}
      onPress={() => navigation.navigate("Chat", { matchId: item.id })}
    >
      <View style={styles.liveHeader}>
        <View style={styles.redDot} />
        <Text style={styles.score}>{item.score}</Text>
        <Text style={styles.minute}>{item.minute}</Text>
      </View>
      <Text style={styles.teams}>{item.teams}</Text>
    </TouchableOpacity>
  );

  const renderUpcoming = ({ item }) => (
    <View style={[styles.liveCard, { height: CARD_HEIGHT.live }]}>
      <Text style={styles.teams}>{item.teams}</Text>
      <Text style={styles.subText}>{item.time}</Text>
    </View>
  );

  const renderNews = ({ item }) => (
    <View
      style={[styles.card, { backgroundColor: colors.card, height: CARD_HEIGHT.news }]}
    >
      <Text style={styles.newsTitle}>{item.title}</Text>

    </View>
  );

  const renderMissed = ({ item }) => (
    <TouchableOpacity style={[styles.card, styles.missedCard, { height: CARD_HEIGHT.missed }]}>
      <Text style={styles.finalScore}>{item.score} | FT</Text>
      <Text style={styles.teams}>{item.teams}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "top"]}>
      {/* 🔹 Search bar with hamburger + search icon */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={colors.text} style={{ marginHorizontal: 8 }} />
        </TouchableOpacity>

        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.textDim}
          style={styles.searchInput}
        />

        <Ionicons name="search" size={24} color={colors.text} style={{ marginHorizontal: 8 }} />
      </View>

      {/* Main content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
      >
        <Text style={styles.sectionTitle}>LIVE</Text>
        <FlatList
          horizontal
          data={liveData}
          renderItem={renderLive}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={{ height: CARD_HEIGHT.live, marginBottom: SECTION_GAP }}
          contentContainerStyle={{ paddingLeft: CARD_LEFT }}
        />

        <Text style={styles.sectionTitle}>Upcoming</Text>
        <FlatList
          horizontal
          data={upcomingData}
          renderItem={renderUpcoming}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={{ height: CARD_HEIGHT.live, marginBottom: SECTION_GAP }}
          contentContainerStyle={{ paddingLeft: CARD_LEFT }}
        />

        <Text style={styles.sectionTitle}>Latest News</Text>
        <FlatList
          horizontal
          data={newsData}
          renderItem={renderNews}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={{ height: CARD_HEIGHT.news, marginBottom: SECTION_GAP }}
          contentContainerStyle={{ paddingLeft: CARD_LEFT }}
        />

        <Text style={styles.sectionTitle}>What You Missed</Text>
        <FlatList
          horizontal
          data={missedData}
          renderItem={renderMissed}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={{ height: CARD_HEIGHT.missed, marginBottom: SECTION_GAP }}
          contentContainerStyle={{ paddingLeft: CARD_LEFT }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  searchBar: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.bg, // ✅ theme surface color
  marginHorizontal: theme.spacing.md, 
  marginBottom: theme.spacing.md,   // ✅ remove huge padding
  marginTop: theme.spacing.sm,      // ✅ tighter top spacing
  borderRadius: 28,
  paddingHorizontal: 10,
  height: 45,                       // ✅ slimmer  
  borderWidth: 1,
  borderColor: colors.border,       // ✅ subtle border to fit theme
},
searchInput: {
  flex: 1,
  color: colors.text,               // ✅ theme text
  fontSize: 18,
  paddingHorizontal: 8,
},

  sectionTitle: {
    color: colors.textMuted,
    fontSize: theme.font.title.size,
    fontWeight: theme.font.title.weight,
    marginBottom: SECTION_GAP / 2,
    paddingLeft: theme.spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    width: 220,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  liveCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    width: 220,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  missedCard: { borderColor: colors.border },
  liveHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.live, marginRight: 6 },
  score: { color: colors.text, fontSize: 18, fontWeight: "700", marginRight: 8 },
  minute: { color: colors.primary, fontSize: 14 },
  teams: { color: colors.text, fontSize: 15, fontWeight: "500" },
  subText: { color: colors.textDim, fontSize: 14, marginTop: 4 },
  newsTitle: { color: colors.text, fontSize: theme.font.cardTitle.size, fontWeight: theme.font.cardTitle.weight },
  finalScore: { color: colors.live, fontSize: 16, fontWeight: "700", marginBottom: 4 },
});
