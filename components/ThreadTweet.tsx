import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactNode, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import tailwind from "twrnc";
import useDeleteTweet from "../hooks/useDeleteTweet";
import { parseDateTime } from "../utils/parseDate";
import tw from "../utils/tailwind";
import { Post } from "../utils/types";
import AppText from "./AppText";
import UserPictureCircle from "./UserCircle";

interface Props {
  post: Post;
  navigation: NativeStackNavigationProp<any>;
  children: ReactNode;
}

const ThreadTweet = ({ post, navigation, children }: Props) => {
  const actionSheetRef = useRef<ActionSheet | null>(null);
  const mutation = useDeleteTweet({ actionSheetRef, navigation, post });
  return (
    <View>
      <View style={tailwind`flex-row items-center px-2 my-3`}>
        <UserPictureCircle author={post.author} navigation={navigation} />
        <View style={tailwind`flex-1 px-2 mt-2`}>
          <AppText>
            <Text style={tw`font-bold`}>{post.author?.full_name}</Text>
          </AppText>
          <AppText>{`@${post.author?.username}`}</AppText>
        </View>
        {post.isAuthor ? (
          <TouchableOpacity
            style={tailwind`mr-4 flex-1 items-end`}
            onPress={() => actionSheetRef.current?.setModalVisible()}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Thread Tweet Text */}
      {post.text ? (
        <View style={tw`ml-4 mr-2 mb-2`}>
          <AppText>
            <Text style={tailwind`text-xl w-full`}>{post.text}</Text>
          </AppText>
        </View>
      ) : null}

      <View style={tailwind`mx-4 mb-2`}>
        {post.images?.length ? (
          <Image
            source={{ uri: post.images[0].replace("/upload", "/upload/q_40") }}
            style={tailwind`w-full h-[200px] mb-2 rounded-2xl`}
          ></Image>
        ) : null}
        <AppText>
          <Text style={tailwind`font-bold text-sm opacity-60`}>
            {parseDateTime(post.date!)}
          </Text>
        </AppText>
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
              <View style={tw`ml-3`}>
                <AppText>
                  <Text style={tailwind`text-red-500 text-base`}>
                    Delete Tweet
                  </Text>
                </AppText>
              </View>
              {mutation.isLoading ? (
                <ActivityIndicator
                  style={tailwind`flex-1`}
                  color="rgb(239, 68, 68)"
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
