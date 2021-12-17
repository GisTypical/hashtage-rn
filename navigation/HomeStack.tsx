import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import { AuthContext } from "../components/providers/AuthProvider";
import Feed from "../screens/Feed";

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
          headerTitle: () => (
            <YellowButton
              text="Profile"
              onPress={() => navigation.navigate("Profile", user)}
            ></YellowButton>
          ),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
