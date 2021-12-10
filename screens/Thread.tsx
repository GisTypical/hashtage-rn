import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import React, { forwardRef, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import tailwind from "twrnc";
import TweetButtons from "../components/buttons/TweetButtons";
import Tweet from "../components/items/Tweet";
import NewComment from "../components/NewComment";
import ThreadTweet from "../components/ThreadTweet";
import ViewCenter from "../components/ViewCenter";
import { commentTweet, getThread } from "../utils/Posts";
import { Post } from "../utils/types";

interface Props {
  route: {
    params: string;
  };
  navigation: NativeStackNavigationProp<any, any>;
}

const Thread = ({ route, navigation }: Props) => {
  const replyRef = useRef<TextInput>(null);
  const { data, isLoading } = useQuery(`thread/${route.params}`, () =>
    getThread(route.params)
  );

  const setReplyFocus = () => {
    if (!replyRef.current!.isFocused()) {
      replyRef.current!.focus();
    }
  };

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator size="large" color="#000" />
      </ViewCenter>
    );
  }

  return (
    <View style={tailwind`bg-white flex-1`}>
      <View style={tailwind`bg-white flex-1 mb-9`}>
        <FlatList
          ListHeaderComponent={
            // Thread Tweet
            <ThreadTweet navigation={navigation} post={data?.data}>
              <View
                style={tailwind`flex-row items-center p-3 border-t border-b border-gray-200 justify-between`}
              >
                <TweetButtons onReply={setReplyFocus} post={data?.data} />
              </View>
            </ThreadTweet>
          }
          data={data?.data.children}
          keyExtractor={(item: Post) => item.id!}
          renderItem={({ item }) => (
            <Tweet post={item} navigation={navigation} />
          )}
        ></FlatList>
      </View>
      <NewComment ref={replyRef} postId={route.params} />
    </View>
  );
};

export default Thread;
