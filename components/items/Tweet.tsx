import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowsClockwise, ChatCircle, Heart } from "phosphor-react-native";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { parseDate } from "../../utils/parseDate";
import { Post } from "../../utils/types";
import UserPictureCircle from "../UserCircle";

interface Props {
  post: Post;
  navigation: NativeStackNavigationProp<any, any>;
}

export const Tweet: FC<Props> = ({ post, navigation }) => {
  return (
    <TouchableOpacity
      style={tailwind`flex-row border-b border-gray-300`}
      activeOpacity={0.9}
      onPress={() => navigation.push("Thread", post.id)}
    >
      <UserPictureCircle username={post.author?.username} />

      {/* Right Side */}
      <View style={tailwind`flex-1 px-2 my-2`}>
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
        <View style={tailwind`flex-row items-center mr-3 justify-between`}>
          <TouchableOpacity style={tailwind`flex-row items-center`}>
            <ChatCircle size={24} />
            <Text style={tailwind`ml-2`}>{post.retweets_count || "Reply"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tailwind`flex-row items-center`}>
            <ArrowsClockwise size={24} />
            <Text style={tailwind`ml-2`}>
              {post.retweets_count || "Retweet"}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={tailwind`flex-row items-center`}>
            <Heart size={24} />
            <Text style={tailwind`ml-2`}>Like</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Tweet;
