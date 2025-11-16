import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";


export default function SearchBar({ placeholder = "Search", value, onChangeText, onMenuPress, onSearchPress }) {
return (
<View style={styles.wrap}>
<Ionicons name="menu" size={22} color={colors.textMuted} onPress={onMenuPress} />
<TextInput
style={styles.input}
placeholder={placeholder}
placeholderTextColor={colors.textMuted}
value={value}
onChangeText={onChangeText}
returnKeyType="search"
/>
<Ionicons name="search" size={20} color={colors.textMuted} onPress={onSearchPress} />
</View>
);
}


const styles = StyleSheet.create({
wrap: {
flexDirection: "row",
alignItems: "center",
backgroundColor: colors.card,
marginHorizontal: 12,
marginTop: 10,
borderRadius: 14,
paddingHorizontal: 12,
height: 44,
},
input: {
flex: 1,
color: colors.text,
paddingHorizontal: 8,
},
});