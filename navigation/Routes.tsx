import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";
import { refreshToken } from "../utils/Auth";
import { AuthContext } from "../components/AuthProvider";
import ViewCenter from "../components/ViewCenter";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { user, handleLogin: handleLogin } = useContext(AuthContext);

  /**
   * Check if user is logged in
   */
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await refreshToken();
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
        <ActivityIndicator size="large" color="#000" />
      </ViewCenter>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs></AppTabs> : <AuthStack></AuthStack>}
    </NavigationContainer>
  );
};

export default Routes;