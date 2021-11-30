import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthStack from "./navigation/AuthStack";
import Details from "./screens/Details";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack></AuthStack>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Details" component={Details}></Stack.Screen>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
