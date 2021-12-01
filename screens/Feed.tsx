import { NavigationProp } from "@react-navigation/native";
import React, { FC } from "react";
import { ActivityIndicator, FlatList, LogBox, Text, View } from "react-native";
import { useQuery } from "react-query";
import tw from "twrnc";
import Fab from "../components/buttons/Fab";
import PostItem from "../components/items/PostItem";
import { getPosts } from "../utils/Posts";

LogBox.ignoreAllLogs(); // ignore all logs
export const Feed: FC<{ navigation: NavigationProp<any> }> = ({
  navigation,
}) => {
  const { data, isLoading, error } = useQuery("todos", getPosts);

  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-white`}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={data?.data.posts}
        renderItem={({ item }) => (
          <PostItem post={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Fab />
    </View>
  );
};

export default Feed;
