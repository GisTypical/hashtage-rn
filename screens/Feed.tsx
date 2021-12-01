import { NavigationProp } from "@react-navigation/native";
import { Plus } from "phosphor-react-native";
import React, { FC } from "react";
import { ActivityIndicator, FlatList, LogBox, View } from "react-native";
import { useQuery } from "react-query";
import tw from "twrnc";
import Fab from "../components/buttons/Fab";
import Tweet from "../components/items/Tweet";
import ViewCenter from "../components/ViewCenter";
import { sortByTime } from "../utils/parseDate";
import { getPosts } from "../utils/Posts";

LogBox.ignoreAllLogs(); // ignore all logs
export const Feed: FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { data, isLoading } = useQuery("tweets", getPosts);

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
        renderItem={({ item }) => <Tweet post={item} navigation={navigation} />}
        keyExtractor={({ id }) => id}
      />
      <Fab onPress={() => navigation.navigate("NewTweet")}>
        <Plus />
      </Fab>
    </View>
  );
};

export default Feed;
