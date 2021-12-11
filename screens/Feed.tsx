import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import {
  ActivityIndicator,
  FlatList,
  LogBox,
  RefreshControl,
  View,
} from "react-native";
import { useQuery } from "react-query";
import Fab from "../components/buttons/Fab";
import Retweet from "../components/items/Retweet";
import Tweet from "../components/items/Tweet";
import ViewCenter from "../components/ViewCenter";
import { getPosts } from "../utils/Posts";
import tw from "../utils/tailwind";

LogBox.ignoreLogs(["Setting a timer"]);

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

export const Feed: FC<Props> = ({ navigation }) => {
  const { data, isLoading, isRefetching, refetch } = useQuery(
    ["tweets"],
    getPosts
  );

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator size="large" color="#000" />
      </ViewCenter>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={data?.data.posts}
        renderItem={({ item }) =>
          item.user_id ? (
            <Retweet retweet={item} navigation={navigation}></Retweet>
          ) : (
            <Tweet post={item} navigation={navigation} />
          )
        }
        keyExtractor={({ id }) => id}
        refreshControl={
          <RefreshControl
            colors={["#f59e0b"]}
            refreshing={isRefetching}
            onRefresh={refetch}
          ></RefreshControl>
        }
      />
      <Fab onPress={() => navigation.push("NewTweet")}>
        <AntDesign name="plus" size={24} color="black" />
      </Fab>
    </View>
  );
};

export default Feed;
