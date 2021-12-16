import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Title from "../components/Title";
import Search from "../screens/Search";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          headerTitle: () => <Title text="Search"></Title>,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default SearchStack;
