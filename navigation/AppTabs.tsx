import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import tw from "../utils/tailwind";
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Search") {
            iconName = "search";
          }

          // You can return any component that you like here!
          // @ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F59E0B",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: tw`font-sans`,
      })}
    >
      <Tabs.Screen name="Home" component={HomeStack}></Tabs.Screen>
      <Tabs.Screen name="Search" component={SearchStack}></Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default AppTabs;
