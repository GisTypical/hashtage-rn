import React from "react";
import NewTweet from "../screens/NewTweet";
import Thread from "../screens/Thread";

const addTweetsRoutes = (Stack: any) => {
  return (
    <>
      <Stack.Screen name="Thread" component={Thread}></Stack.Screen>
      <Stack.Screen
        name="NewTweet"
        component={NewTweet}
        options={{ headerTitle: "" }}
      ></Stack.Screen>
    </>
  );
};

export default addTweetsRoutes;
