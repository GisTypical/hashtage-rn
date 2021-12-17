import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Image } from "react-native";
import YellowButton from "../components/buttons/YellowButton";
import { AuthContext } from "../components/providers/AuthProvider";
import Feed from "../screens/Feed";
import tw from "../utils/tailwind";
const Stack = createNativeStackNavigator();

interface Props {
  navigation: NavigationProp<any>;
}

const HomeStack = ({ navigation }: Props) => {
  const { handleLogout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerLeft: () => (
            <YellowButton
              text="Profile"
              onPress={() => navigation.navigate("Profile", user)}
            ></YellowButton>
          ),
          headerTitle: () => (
            <Image
              style={tw`h-13 w-13`}
              source={require("../assets/adaptive-icon.png")}
            />
          ),
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
