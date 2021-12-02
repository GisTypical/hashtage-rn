import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
<<<<<<< Updated upstream
import { House, MagnifyingGlass } from "phosphor-react-native";
=======
>>>>>>> Stashed changes
import React from "react";
import HomeStack from "./HomeStack";

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let weight = focused ? "fill" : "regular";

          if (route.name === "Home") {
            // @ts-ignore
            return <House weight={weight} size={size} color={color} />;
          } else if (route.name === "Search") {
            return (
              // @ts-ignore
              <MagnifyingGlass weight={weight} size={size} color={color} />
            );
          }
<<<<<<< Updated upstream
=======
          // @ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
>>>>>>> Stashed changes
        },
        tabBarActiveTintColor: "#F59E0B",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="Home" component={HomeStack}></Tabs.Screen>
      <Tabs.Screen name="Search" component={Search}></Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default AppTabs;
