import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useCallback } from "react";
import {
  ActivityIndicator,
  LogBox,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import Fab from "../components/buttons/Fab";
import Retweet from "../components/items/Retweet";
import Tweet from "../components/items/Tweet";
import ViewCenter from "../components/ViewCenter";
import useFeed from "../hooks/useFeed";
import tw from "../utils/tailwind";
import { Post } from "../utils/types";

LogBox.ignoreLogs(["Setting a timer"]);

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

export const Feed: FC<Props> = ({ navigation }) => {
  const { data, isLoading, isRefetching, refetch } = useFeed();

  const renderItem = useCallback((item) => {
    if (item.user_id) {
      return <Retweet key={item.id} retweet={item} navigation={navigation} />;
    } else {
      return <Tweet key={item.id} post={item} navigation={navigation} />;
    }
  }, []);

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
