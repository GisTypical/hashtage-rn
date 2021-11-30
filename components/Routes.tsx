import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import AuthStack from "../navigation/AuthStack";
import AppTabs from "../navigation/AppTabs";
import { AuthContext } from "./AuthProvider";

const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppTabs></AppTabs> : <AuthStack></AuthStack>}
    </NavigationContainer>
  );
};

export default Routes;
