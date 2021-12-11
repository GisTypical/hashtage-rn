import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { parseDate } from "../../utils/parseDate";
import tw from "../../utils/tailwind";
import { Post } from "../../utils/types";
import AppText from "../AppText";
import TweetButtons from "../buttons/TweetButtons";
import UserPictureCircle from "../UserCircle";

interface Props {
  post: Post;
  navigation: NativeStackNavigationProp<any, any>;
}

export const Tweet: FC<Props> = ({ post, navigation }) => {
  return (
    <TouchableOpacity
      style={tailwind`flex-row border-b border-gray-300 ml-1 px-2 py-2`}
      activeOpacity={0.9}
      onPress={() => navigation.push("Thread", post.id)}
    >
      <UserPictureCircle username={post.author?.username} />

      {/* Right Side */}
      <View style={tailwind`flex-1 ml-2`}>
        <View style={tailwind`flex-row items-center mt-1`}>
          <AppText>
            <Text style={tailwind`font-bold`}>{post.author?.username}</Text>
          </AppText>
          <AppText>
            <Text style={tailwind`font-bold opacity-60`}>
              {" "}
              • {parseDate(post.date!)}
            </Text>
          </AppText>
        </View>
        {post.text ? (
          <AppText mb={true}>
            <Text style={tailwind`text-base w-full`}>{post.text}</Text>
          </AppText>
        ) : null}

        {post.images?.length ? (
          <View style={tailwind`overflow-visible my-2`}>
            <Image
              key={post.images[0]}
              source={{ uri: post.images[0] }}
              style={tailwind`w-full h-[200px] rounded-xl`}
            />
          </View>
        ) : null}
        {/* Touchable icons */}
        <TweetButtons
          onReply={() => {
            navigation.push("Thread", post.id);
          }}
          post={post}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Tweet;
