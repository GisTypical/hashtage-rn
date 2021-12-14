import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  LogBox,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { useQuery } from "react-query";
import Fab from "../components/buttons/Fab";
import Retweet from "../components/items/Retweet";
import Tweet from "../components/items/Tweet";
import ViewCenter from "../components/ViewCenter";
import { getPosts } from "../utils/Posts";
import tw from "../utils/tailwind";
import { Post } from "../utils/types";

LogBox.ignoreLogs(["Setting a timer"]);

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

export const Feed: FC<Props> = ({ navigation }) => {
  const { data, isLoading, isRefetching, refetch } = useQuery(
    ["tweets"],
    getPosts
  );

  const renderItem = useCallback((item) => {
    if (item.user_id) {
      return <Retweet key={item.id} retweet={item} navigation={navigation} />;
    } else {
      return <Tweet key={item.id} post={item} navigation={navigation} />;
    }
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator size="large" color="#f59e0b" />
      </ViewCenter>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#f59e0b"]}
            refreshing={isRefetching}
            onRefresh={refetch}
          ></RefreshControl>
        }
      >
        {data?.data.posts.map((post: Post) => renderItem(post))}
      </ScrollView>
      <Fab onPress={() => navigation.push("NewTweet")}>
        <AntDesign name="plus" size={24} color="rgb(120, 53, 15)" />
      </Fab>
    </View>
  );
};

export default Feed;
