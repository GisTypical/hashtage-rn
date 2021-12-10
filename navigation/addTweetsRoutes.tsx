import React from "react";
import Thread from "../screens/Thread";

const addTweetsRoutes = (Stack: any) => {
  return (
    <>
      <Stack.Screen name="Thread" component={Thread}></Stack.Screen>
    </>
  );
};

export default addTweetsRoutes;
