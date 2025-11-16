// screens/ChatScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
} from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../styles/colors";

// ✅ Reaction Picker Component
const ReactionPicker = ({ onSelect }) => {
  const EMOJIS = ["❤️", "😂", "🔥", "👍", "👎", "👏", "😢"];
  return (
    <View style={styles.picker}>
      {EMOJIS.map((emoji) => (
        <TouchableOpacity key={emoji} onPress={() => onSelect(emoji)}>
          <Text style={styles.emoji}>{emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function ChatScreen({ route }) {
  const { matchId } = route.params || {};
  const insets = useSafeAreaInsets();

  // ✅ Dummy match data
  const [match] = useState({
    home: "Real Madrid",
    away: "Barcelona",
    scoreHome: 2,
    scoreAway: 1,
    minute: 67,
  });

  const [tab, setTab] = useState("chat"); // chat | stats | lineup
  const [messages, setMessages] = useState([
    {
      id: "1",
      user: "Fan123",
      text: "GOAL!!! 🔥🔥🔥",
      minute: "12:34",
      me: false,
      reactions: {},
    },
    {
      id: "2",
      user: "You",
      text: "Unbelievable strike!",
      minute: "13:28",
      me: true,
      reactions: {},
    },
  ]);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [activePicker, setActivePicker] = useState(null);
  const inputRef = useRef(null);

  // ✅ Dummy lineups
  const [lineups] = useState({
    home: {
      team: "Real Madrid",
      formation: "4-3-3",
      starting: {
        GK: ["Courtois"],
        DEF: ["Carvajal", "Militão", "Alaba", "Mendy"],
        MID: ["Modric", "Kroos", "Valverde"],
        FWD: ["Vinícius Jr", "Benzema", "Rodrygo"],
      },
      subs: ["Lunin", "Nacho", "Camavinga", "Asensio", "Ceballos", "Hazard"],
    },
    away: {
      team: "Barcelona",
      formation: "4-3-3",
      starting: {
        GK: ["Ter Stegen"],
        DEF: ["Koundé", "Araujo", "Christensen", "Alba"],
        MID: ["Pedri", "Busquets", "De Jong"],
        FWD: ["Dembélé", "Lewandowski", "Fati"],
      },
      subs: ["Pena", "Piqué", "Gavi", "Torres", "Roberto", "Depay"],
    },
  });

  const getTime = () => {
    const now = new Date();
    const min = String(now.getMinutes()).padStart(2, "0");
    const sec = String(now.getSeconds()).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const send = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      user: "You",
      text: input,
      minute: getTime(),
      me: true,
      reactions: {},
      replyTo,
    };
    setMessages([...messages, newMsg]);
    setInput("");
    setReplyTo(null);
  };

  const handleReply = (msg) => {
    setReplyTo(msg.user);
    setInput(`@${msg.user} `);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const toggleHeartReaction = (msgId) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? {
              ...m,
              reactions: {
                ...m.reactions,
                "❤️": m.reactions["❤️"] ? 0 : 1,
              },
            }
          : m
      )
    );
  };

  const addReaction = (msgId, emoji) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? {
              ...m,
              reactions: {
                ...m.reactions,
                [emoji]: (m.reactions[emoji] || 0) + 1,
              },
            }
          : m
      )
    );
  };

  const renderReactions = (reactions) => (
    <View style={styles.reactionsRow}>
      {Object.entries(reactions)
        .filter(([_, count]) => count > 0)
        .map(([emoji, count]) => (
          <View key={emoji} style={styles.reactionBubble}>
            <Text style={styles.reactionText}>
              {emoji} {count}
            </Text>
          </View>
        ))}
    </View>
  );

  const renderItem = ({ item }) => {
    const isMe = item.me;

    return (
      <View
        style={[
          styles.msgRow,
          { justifyContent: isMe ? "flex-end" : "flex-start" },
        ]}
      >
        {!isMe && (
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.avatar}
          />
        )}

        <View
          style={[
            styles.otherContainer,
            { alignItems: isMe ? "flex-end" : "flex-start" },
          ]}
        >
          {!isMe && <Text style={styles.user}>{item.user}</Text>}

          <TapGestureHandler
            numberOfTaps={2}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) toggleHeartReaction(item.id);
            }}
          >
            <LongPressGestureHandler
              minDurationMs={400}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) setActivePicker(item.id);
              }}
            >
              <View>
                <View
                  style={[
                    styles.bubble,
                    isMe ? styles.me : styles.other,
                    isMe ? styles.meShape : styles.otherShape,
                  ]}
                >
                  {item.replyTo && (
                    <Text style={styles.replyText}>
                      Replying to @{item.replyTo}
                    </Text>
                  )}
                  <Text style={styles.msg}>{item.text}</Text>
                </View>

                {activePicker === item.id && (
                  <ReactionPicker
                    onSelect={(emoji) => {
                      addReaction(item.id, emoji);
                      setActivePicker(null);
                    }}
                  />
                )}
              </View>
            </LongPressGestureHandler>
          </TapGestureHandler>

          {renderReactions(item.reactions)}

          <View style={styles.metaRow}>
            <Text style={styles.time}>{item.minute}</Text>
            {!isMe && (
              <TouchableOpacity onPress={() => handleReply(item)}>
                <Text style={styles.replyButton}>Reply</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  // ✅ Lineup Renderer
  const renderTeam = (team, align = "top") => (
    <View style={styles.teamBlock}>
      <Text style={styles.formationText}>
        {team.team} – {team.formation}
      </Text>
      <View style={styles.pitchHalf}>
        {Object.entries(team.starting).map(([role, players]) => (
          <View key={role} style={styles.lineRow}>
            {players.map((p) => (
              <View key={p} style={styles.playerBubble}>
                <Text style={styles.playerText}>{p}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.subsTitle}>Substitutes</Text>
      <View style={styles.subsRow}>
        {team.subs.map((s) => (
          <View key={s} style={styles.subBubble}>
            <Text style={styles.playerText}>{s}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <TouchableWithoutFeedback onPress={() => setActivePicker(null)}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          {/* ✅ Match Header */}
          <View style={styles.matchHeader}>
            <Text style={styles.matchTeams}>
              {match.home} {match.scoreHome} - {match.scoreAway} {match.away}
            </Text>
            <Text style={styles.matchMeta}>{match.minute}' minute</Text>

            {/* ✅ Tab Switcher */}
            <View style={styles.tabRow}>
              {["chat", "stats", "lineup"].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTab(t)}
                  style={[styles.tabButton, tab === t && styles.tabActive]}
                >
                  <Text
                    style={[styles.tabText, tab === t && styles.tabTextActive]}
                  >
                    {t.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ✅ Tab Content */}
          {tab === "chat" && (
            <>
              <FlatList
                data={messages}
                keyExtractor={(i) => i.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 8 }}
              />

              {replyTo && (
                <View style={styles.replyBanner}>
                  <Text style={styles.replyBannerText}>
                    Replying to @{replyTo}
                  </Text>
                  <TouchableOpacity onPress={() => setReplyTo(null)}>
                    <Text style={styles.cancelReply}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.composerWrap}>
                <View style={styles.composer}>
                  <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="Send a message"
                    placeholderTextColor={colors.textMuted}
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={send}
                    multiline
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity style={styles.send} onPress={send}>
                    <Text style={styles.sendText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          {tab === "stats" && (
            <ScrollView style={{ padding: 12 }}>
              <Text style={styles.statsLine}>⚽ 45’ - Goal by Benzema</Text>
              <Text style={styles.statsLine}>🟨 50’ - Yellow Card: Busquets</Text>
              <Text style={styles.statsLine}>🔁 60’ - Substitution: Modric IN</Text>
            </ScrollView>
          )}

          {tab === "lineup" && (
            <ScrollView style={{ padding: 12 }}>
              <View style={styles.pitch}>
                {renderTeam(lineups.home, "top")}
                <View style={styles.halfwayLine} />
                {renderTeam(lineups.away, "bottom")}
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1, backgroundColor: colors.bg },

  matchHeader: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  matchTeams: { color: colors.textLiveTeams, fontWeight: "700", fontSize: 16 },
  matchMeta: { color: colors.textMuted, fontSize: 14, marginTop: 2 },

  tabRow: { flexDirection: "row", marginTop: 10 },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: colors.text, fontWeight: "600", marginRight: 4 },
  tabTextActive: { color: colors.bg },

  // Chat stuff
  msgRow: { flexDirection: "row", alignItems: "flex-start", marginVertical: 6 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  otherContainer: { maxWidth: "75%", flexShrink: 1 },

  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    maxWidth: "100%",
  },
  me: { backgroundColor: colors.primary },
  other: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  meShape: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  otherShape: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 4,
  },

  user: { color: colors.textLive, fontWeight: "700", marginBottom: 2 },
  msg: { color: colors.textLive, fontSize: 15, lineHeight: 20 },
  replyText: { fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  time: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  replyButton: { fontSize: 12, color: colors.primary, marginLeft: 10 },

  reactionsRow: { flexDirection: "row", marginTop: 2 },
  reactionBubble: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  reactionText: { color: colors.textLive, fontSize: 12 },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },

  replyBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  replyBannerText: { color: colors.textLive, flex: 1 },
  cancelReply: { color: colors.live, fontWeight: "800", marginLeft: 8 },

  composerWrap: {
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 25,
    backgroundColor: colors.bg,
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 6,
  },
  input: { flex: 1, color: colors.text, paddingHorizontal: 8, fontSize: 15 },
  send: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 6,
  },
  sendText: { color: colors.bg, fontWeight: "800" },

  picker: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: 6,
    borderRadius: 20,
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  emoji: { fontSize: 22, marginHorizontal: 6 },

  statsLine: { color: colors.text, fontSize: 15, marginVertical: 6 },

  // Lineup stuff
  pitch: {
    backgroundColor: "#1b5e20",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  pitchHalf: { marginVertical: 12 },
  halfwayLine: {
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 12,
  },
  teamBlock: { marginBottom: 20, alignItems: "center" },
  formationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  lineRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  playerBubble: {
    backgroundColor: "#2e7d32",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "#fff",
  },
  playerText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  subsTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
  },
  subsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  subBubble: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 4,
  },
});
