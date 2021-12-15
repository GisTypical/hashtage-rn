import React from "react";
import Title from "../components/Title";
import Thread from "../screens/Thread";

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
