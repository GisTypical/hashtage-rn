import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

export interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const Home: FC<HomeScreenProps> = ({ navigation }) => {
  const [counter, setCounter] = useState<number>(0);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://192.168.100.9:3000/db")
      .then((response) => {
        setData(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.error(err);
        setData("err");
      });
  }, []);

  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <Text>Counter: {counter}</Text>
      <TouchableOpacity
        style={tw`bg-green-400 px-4 py-2 rounded-lg`}
        activeOpacity={0.7}
        onPress={() => {
          setCounter(counter + 1);
        }}
      >
        <Text>Add to the counter!</Text>
      </TouchableOpacity>
      <StatusBar style="auto"></StatusBar>
      <Text>{data}</Text>
      <Button
        title="Go to details"
        onPress={() => {
          navigation.navigate("Details", data);
        }}
      ></Button>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Home;
