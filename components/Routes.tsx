import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AppTabs from "../navigation/AppTabs";
import AuthStack from "../navigation/AuthStack";
import { refreshToken } from "../utils/Auth";
import { AuthContext } from "./AuthProvider";
import ViewCenter from "./ViewCenter";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { user, handleLogin: handleLogin } = useContext(AuthContext);

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
