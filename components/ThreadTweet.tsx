import { ChatCircle, ArrowsClockwise, Heart } from "phosphor-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { parseDate } from "../utils/parseDate";
import { Post } from "../utils/types";
import UserPictureCircle from "./UserCircle";

interface Props {
  post: Post;
}

const ThreadTweet = ({ post }: Props) => {
  return (
    <View>
      <View style={tailwind`flex-row items-center`}>
        <UserPictureCircle username={post.author?.username} />
        <View style={tailwind`px-2 mt-2`}>
          <Text style={tailwind`font-bold`}>{post.author?.full_name}</Text>
          <Text>{post.author?.username}</Text>
        </View>
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
    </View>
  );
};

export default ThreadTweet;
