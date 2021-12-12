import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
      style={tw`flex-row border-b border-gray-300 ml-1 px-2 py-2`}
      activeOpacity={0.9}
      onPress={() => navigation.push("Thread", post.id)}
    >
      <UserPictureCircle username={post.author?.username} />

      {/* Right Side */}
      <View style={tw`flex-1 ml-2`}>
        {/* Username and date */}
        <View style={tw`flex-row items-center mt-1 mb-2`}>
          <AppText>
            <Text style={tw`font-bold`}>{post.author?.username}</Text>
          </AppText>
          <AppText>
            <Text style={tw`font-bold opacity-60`}>
              {" "}
              • {parseDate(post.date!)}
            </Text>
          </AppText>
        </View>

        {/* Tweet text */}
        {post.text ? (
          <View style={tw`mb-2 -mt-1`}>
            <AppText>
              <Text style={tw`text-base w-full leading-tight`}>
                {post.text}
              </Text>
            </AppText>
          </View>
        ) : null}

        {post.images?.length ? (
          <View style={tw`overflow-visible mb-2`}>
            <Image
              key={post.images[0]}
              source={{ uri: post.images[0] }}
              style={tw`w-full h-[200px] rounded-xl`}
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
