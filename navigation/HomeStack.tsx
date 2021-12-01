import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../components/AuthProvider";
import Feed from "../screens/Feed";
import Thread from "../screens/Thread";

const Stack = createNativeStackNavigator();

interface Props {}

const HomeStack = (props: Props) => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Stack.Navigator>
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
      <Stack.Screen name="Thread" component={Thread}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
