import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactNode, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { useMutation, useQueryClient } from "react-query";
import tailwind from "twrnc";
import { parseDate } from "../utils/parseDate";
import { deleteTweet } from "../utils/Posts";
import { Post } from "../utils/types";
import TweetButtons from "./buttons/TweetButtons";
import UserPictureCircle from "./UserCircle";

interface Props {
  post: Post;
  navigation: NativeStackNavigationProp<any>;
  children: ReactNode;
}

const ThreadTweet = ({ post, navigation, children }: Props) => {
  const actionSheetRef = useRef<ActionSheet | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(() => deleteTweet(post.id), {
    onSuccess: () => {
      post.didRetweet = true;
      actionSheetRef.current?.hide();
      queryClient.invalidateQueries();
      navigation.goBack();
    },
  });

  return (
    <View>
      <View style={tailwind`flex-row items-center px-2 my-3`}>
        <UserPictureCircle username={post.author?.username} />
        <View style={tailwind`flex-4 px-2 mt-2`}>
          <Text style={tailwind`font-bold`}>{post.author?.full_name}</Text>
          <Text>{post.author?.username}</Text>
        </View>
        {post.isAuthor ? (
          <TouchableOpacity
            style={tailwind`mr-4 flex-1 items-end`}
            onPress={() => actionSheetRef.current?.setModalVisible()}
          >
            <Ionicons name="md-reorder-three-outline" size={24} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>

      {post.text ? (
        <Text style={tailwind`text-base w-full`}>{post.text}</Text>
      ) : null}

      <View style={tailwind`mx-4`}>
        {post.images?.length ? (
          <Image
            source={{ uri: post.images[0] }}
            style={tailwind`w-full h-[200px] my-3 rounded-2xl`}
          ></Image>
        ) : null}
        <Text style={tailwind`font-bold text-sm opacity-60 mb-2`}>
          {parseDate(post.date!)}
        </Text>
      </View>

      {children}

      <ActionSheet ref={actionSheetRef}>
        <View style={tailwind`h-16 w-full justify-center`}>
          <TouchableOpacity
            onPress={() => {
              mutation.mutate();
            }}
          >
            <View style={tailwind`flex-row ml-5 py-4`}>
              <Ionicons
                name="trash-outline"
                size={24}
                color="rgb(239, 68, 68)"
              />
              <Text style={tailwind`ml-5 text-red-500 text-base`}>
                Delete Tweet
              </Text>
              {mutation.isLoading ? (
                <ActivityIndicator
                  style={tailwind`flex-1`}
                  color="#000"
                ></ActivityIndicator>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
};

export default ThreadTweet;
