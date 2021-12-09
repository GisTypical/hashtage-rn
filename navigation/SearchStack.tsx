import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Search from "../screens/Search";
import addTweetsRoutes from "./addTweetsRoutes";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen name="SearchScreen" component={Search}></Stack.Screen>
      {addTweetsRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default SearchStack;
