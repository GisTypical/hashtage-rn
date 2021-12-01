import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../components/AuthProvider";
import ViewCenter from "../components/ViewCenter";

const AppTabs = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <ViewCenter>
      <Text>You've logged in!</Text>
      <Button title="logout" onPress={() => handleLogout()}></Button>
    </ViewCenter>
  );
};

export default AppTabs;
