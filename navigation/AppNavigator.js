// navigation/AppNavigator.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/DiscoverScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import ChatScreen from "../screens/ChatScreen";
import colors from "../styles/colors";
import theme from "../styles/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();




/* 🔹 Custom Drawer */
function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Profile Section */}
      <View style={{ paddingVertical: 50, paddingHorizontal: 8, flexDirection: "row", alignItems: "center" }}>
  <Ionicons name="person-circle-outline" size={40} color={colors.primary} />
  
</View>


      {/* Divider */}
      <View
        style={{
          height: 0,
          backgroundColor: colors.border,
          marginVertical: -8,
        }}
      />

      {/* Drawer Items */}
      {[
        { label: "Settings", route: "Settings" },
        { label: "Upcoming", route: "Upcoming" },
        { label: "Latest News", route: "LatestNews" },
        { label: "What You Missed", route: "WhatYouMissed" },
        { label: "Live", route: "Live" },
      ].map((item, idx) => (
        <TouchableOpacity
  key={idx}
  style={{ flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 }}
  onPress={() => props.navigation.navigate(item.route)}
>
  <Text 
  style={{
    marginLeft: 5,
    color: colors.text,
    fontSize: 18,       // 🔹 make text bigger
    fontWeight: "320",   // 🔹 optional, makes it slightly bolder
  }}
>
  {item.label}
</Text>
</TouchableOpacity>

      ))}
    </View>
  );
}

/* 🔹 Custom Header (for non-Home tabs) */
function CustomHeader({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: theme.spacing.lg,
        paddingTop: insets.top,
        paddingBottom: theme.spacing.sm,
        backgroundColor: colors.bg,
      }}
    >
      {/* Hamburger to open drawer */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-outline" size={32} color={colors.primary} />
      </TouchableOpacity>

      {/* Search */}
      <TouchableOpacity onPress={() => console.log("Search pressed")}>
        <Ionicons name="search-outline" size={28} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

/* 🔹 Bottom Tabs */
function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header:
          route.name === "Home"
            ? () => null
            : (props) => <CustomHeader {...props} />,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopWidth: 0,
          height: 65,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home-outline",
            Explore: "search-outline",
            Communities: "people-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} />
    </Tab.Navigator>
  );
}

/* 🔹 Drawer wraps Tabs */
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerShown: false,
      drawerStyle: {
        width: 220, //width of drawer
      },
     }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

/* 🔹 Final Stack (for Chat) */
export default function AppNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation }) => ({
          header: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: theme.spacing.md,
                paddingTop: insets.top,
                paddingBottom: theme.spacing.sm,
                backgroundColor: colors.bg,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginRight: theme.spacing.md }}
              >
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
