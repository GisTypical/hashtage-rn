import { ArrowsClockwise, Heart } from "phosphor-react-native";
import React, { FC, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import tailwind from "twrnc";
import { parseDate } from "../../utils/parseDate";
import { Post } from "../../utils/types";

interface Props {
  post: Post;
}

export const PostItem: FC<Props> = ({ post }) => {
  return (
    <TouchableOpacity
      style={tailwind`flex-row border-b border-gray-300`}
      activeOpacity={0.9}
    >
      <View
        style={tailwind`bg-yellow-500 ml-4 w-12 h-12 mt-3 rounded-full justify-center items-center`}
      >
        <Text>{post.author.username.charAt(0).toLocaleUpperCase()}</Text>
      </View>

      {/* Right Side */}
      <View style={tailwind`flex-1 px-2 my-2`}>
        <View style={tailwind`flex-row items-center`}>
          <Text style={tailwind`font-bold text-base`}>
            {post.author.username}
          </Text>
          <Text style={tailwind`font-bold text-sm opacity-60`}>
            {" "}
            • {parseDate(post.date)}
          </Text>
        </View>
        <Text style={tailwind`text-base w-full`}>{post.text}</Text>

        <ScrollView horizontal={true}>
          {post.images.map((img) => (
            <Image
              source={{ uri: img }}
              style={tailwind`w-[200px] h-[200px] mr-3 rounded-xl`}
            />
          ))}
        </ScrollView>

        {/* Touchable icons */}
        <View style={tailwind`flex-row py-2 items-center`}>
          <TouchableOpacity style={tailwind`flex-1 flex-row items-center`}>
            <ArrowsClockwise size={24} />
            <Text style={tailwind`ml-2`}>{post.retweets_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind`flex-1 flex-row items-center`}
            onLongPress={() => {
              alert("long");
            }}
          >
            <Heart size={24} />
            <Text style={tailwind`ml-2`}>Likes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;