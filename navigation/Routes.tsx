import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";
import { refreshToken } from "../utils/Auth";
import { AuthContext } from "../components/providers/AuthProvider";
import ViewCenter from "../components/ViewCenter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { user, handleLogin } = useContext(AuthContext);

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

  if (loading) {
    return (
      <ViewCenter>
        <AppLoading />
      </ViewCenter>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs></AppTabs> : <AuthStack></AuthStack>}
      <StatusBar></StatusBar>
    </NavigationContainer>
  );
};

export default Routes;
