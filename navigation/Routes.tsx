import {
  Karla_400Regular,
  Karla_400Regular_Italic,
  Karla_500Medium,
  Karla_500Medium_Italic,
  Karla_700Bold,
  Karla_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/karla";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import ViewCenter from "../components/ViewCenter";
import { refreshToken } from "../utils/Auth";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { user, handleLogin } = useContext(AuthContext);

  /**
   * Load fonts
   */
  let [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_400Regular_Italic,
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
        handleLogin(data.accessToken);
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
      {user ? <AppTabs></AppTabs> : <AuthStack></AuthStack>}
      <StatusBar style="auto"></StatusBar>
    </NavigationContainer>
  );
};

export default Routes;
