import {
  Karla_500Medium,
  Karla_500Medium_Italic,
  Karla_700Bold,
  Karla_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/karla";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import { AuthContext } from "../components/providers/AuthProvider";
import Title from "../components/Title";
import ViewCenter from "../components/ViewCenter";
import EditUser from "../screens/EditUser";
import NewTweet from "../screens/NewTweet";
import Profile from "../screens/Profile";
import Thread from "../screens/Thread";
import { refreshToken } from "../utils/Auth";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { user, handleLogin } = useContext(AuthContext);

  /**
   * Load fonts
   */
  let [fontsLoaded] = useFonts({
    Karla_500Medium,
    Karla_500Medium_Italic,
    Karla_700Bold,
    Karla_700Bold_Italic,
  });

  /**
   * Check if user is logged in
   */
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await refreshToken();
        await AsyncStorage.setItem("accessToken", data.accessToken);
        handleLogin(data.accessToken, data.following);
      } catch ({ response }) {
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading || !fontsLoaded) {
    return (
      <ViewCenter>
        <AppLoading />
      </ViewCenter>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator
          initialRouteName="AppTabs"
          screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
        >
          <Stack.Screen name="AppTabs" component={AppTabs}></Stack.Screen>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="NewTweet"
            component={NewTweet}
            options={{ headerTitle: "", headerShown: true }}
          ></Stack.Screen>
          <Stack.Screen
            name="Thread"
            component={Thread}
            options={{
              headerTitle: () => <Title text="Thread"></Title>,
              headerShown: true,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="EditUser"
            component={EditUser}
            options={{
              headerTitle: () => <Title text="Edit Profile"></Title>,
              headerShown: true,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <AuthStack></AuthStack>
      )}
      <StatusBar style="auto"></StatusBar>
    </NavigationContainer>
  );
};
export default Routes;
