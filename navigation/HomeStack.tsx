import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../components/AuthProvider";
import Feed from "../screens/Feed";
import NewTweet from "../screens/NewTweet";
import addTweetsRoutes from "./addTweetsRoutes";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                handleLogout();
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="NewTweet"
        component={NewTweet}
        options={{ headerTitle: "" }}
      ></Stack.Screen>
      {addTweetsRoutes(Stack)}
      {/* <Stack.Screen name="ImagesPicker" component={ImagesPicker}></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
