import {
  ChatCircle,
  ArrowsClockwise,
  Heart,
  DotsThreeVertical,
  Trash,
} from "phosphor-react-native";
import React, { RefObject, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tailwind from "twrnc";
import { parseDate } from "../utils/parseDate";
import { Post } from "../utils/types";
import UserPictureCircle from "./UserCircle";
import ActionSheet from "react-native-actions-sheet";
import { useMutation, useQueryClient } from "react-query";
import { deleteTweet } from "../utils/Posts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  post: Post;
  navigation: NativeStackNavigationProp<any>;
}

const ThreadTweet = ({ post, navigation }: Props) => {
  const actionSheetRef = useRef<ActionSheet | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(() => deleteTweet(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("tweets");
      navigation.navigate("Feed");
    },
  });
  return (
    <View>
      <View style={tailwind`flex-row items-center`}>
        <UserPictureCircle username={post.author?.username} />
        <View style={tailwind`flex-4 px-2 mt-2`}>
          <Text style={tailwind`font-bold`}>{post.author?.full_name}</Text>
          <Text>{post.author?.username}</Text>
        </View>
        <TouchableOpacity
          style={tailwind`mr-4 flex-1 items-end`}
          onPress={() => actionSheetRef.current?.setModalVisible()}
        >
          <DotsThreeVertical size={22} />
        </TouchableOpacity>
      </View>

      <Text style={tailwind`mt-2 pl-4 text-lg`}>{post.text}</Text>
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

      {/* Touchable icons */}
      <View
        style={tailwind`flex-row items-center p-3 border-t border-b border-gray-200 justify-between`}
      >
        <TouchableOpacity style={tailwind`flex-row items-center`}>
          <ChatCircle size={24} />
          <Text style={tailwind`ml-2`}>{post.retweets_count || "Reply"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind`flex-row items-center`}>
          <ArrowsClockwise size={24} />
          <Text style={tailwind`ml-2`}>{post.retweets_count || "Retweet"}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={tailwind`flex-row items-center`}>
          <Heart size={24} />
          <Text style={tailwind`ml-2`}>Like</Text>
        </TouchableOpacity> */}
      </View>
      <ActionSheet ref={actionSheetRef}>
        <View style={tailwind`h-16 w-full justify-center`}>
          <TouchableOpacity
            onPress={() => {
              mutation.mutate();
            }}
          >
            <View style={tailwind`flex-row ml-5 py-4`}>
              <Trash size={24} color="rgb(239, 68, 68)" />
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
