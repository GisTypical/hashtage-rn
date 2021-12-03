import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { parseDate } from "../../utils/parseDate";
import { Post } from "../../utils/types";
import TweetButtons from "../buttons/TweetButtons";
import UserPictureCircle from "../UserCircle";

interface Props {
  post: Post;
  navigation: NativeStackNavigationProp<any, any>;
}

export const Tweet: FC<Props> = ({ post, navigation }) => {
  return (
    <TouchableOpacity
      style={tailwind`flex-row border-b border-gray-300 px-2 py-2`}
      activeOpacity={0.9}
      onPress={() => navigation.push("Thread", post.id)}
    >
      <UserPictureCircle username={post.author?.username} />

      {/* Right Side */}
      <View style={tailwind`flex-1 ml-2`}>
        <View style={tailwind`flex-row items-center mt-1`}>
          <Text style={tailwind`font-bold`}>{post.author?.username}</Text>
          <Text style={tailwind`font-bold opacity-60`}>
            {" "}
            • {parseDate(post.date!)}
          </Text>
        </View>
        <Text style={tailwind`text-base w-full`}>{post.text}</Text>

        <View style={tailwind`overflow-visible my-2`}>
          {post.images?.length ? (
            <Image
              key={post.images[0]}
              source={{ uri: post.images[0] }}
              style={tailwind`w-full h-[200px] rounded-xl`}
            />
          ) : null}
        </View>

        {/* Touchable icons */}
        <TweetButtons post={post} />
      </View>
    </TouchableOpacity>
  );
};

export default Tweet;
