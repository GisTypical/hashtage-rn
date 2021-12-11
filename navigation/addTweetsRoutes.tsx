import React from "react";
import { Text } from "react-native";
import AppText from "../components/AppText";
import Title from "../components/Title";
import Thread from "../screens/Thread";
import tw from "../utils/tailwind";

const addTweetsRoutes = (Stack: any) => {
  return (
    <>
      <Stack.Screen
        name="Thread"
        component={Thread}
        options={{
          headerTitle: () => <Title text="Thread"></Title>,
        }}
      ></Stack.Screen>
    </>
  );
};

export default addTweetsRoutes;
