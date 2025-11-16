import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

const ChatBubble = ({ text, sender }) => {
  const isMe = sender === "me";
  return (
    <View
      style={[
        styles.bubble,
        { alignSelf: isMe ? "flex-end" : "flex-start", backgroundColor: isMe ? colors.primary : colors.gray }
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: "75%",
  },
  text: {
    color: "#fff",
  },
});

export default ChatBubble;
