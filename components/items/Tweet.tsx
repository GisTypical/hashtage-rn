import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, memo } from "react";
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

const Tweet: FC<Props> = memo(({ post, navigation }) => {
  return (
    <TouchableOpacity
      style={tw`pl-1 border-b border-gray-300`}
      activeOpacity={0.9}
      onPress={() => navigation.push("Thread", post.id)}
    >
      {post.parent?.author ? (
        <TouchableOpacity
          style={tw`flex-row ml-3 mt-2`}
          onPress={() => navigation.push("Thread", post.parent?.id)}
        >
          <Ionicons
            style={tw`mr-2`}
            name="ios-chatbox-outline"
            size={17}
            color="gray"
          />
          <AppText>
            <Text style={tw`flex-row items-center text-gray-400 italic`}>
              Replying to {post.parent.author?.username}
            </Text>
          </AppText>
        </TouchableOpacity>
      ) : null}
      <View style={tw`flex-row  px-2 py-2`}>
        <UserPictureCircle author={post.author} navigation={navigation} />

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

          {/* Image */}
          {post.images?.length ? (
            <View style={tw`overflow-visible mb-2`}>
              <Image
                key={post.images[0]}
                source={{
                  uri: post.images[0].replace("/upload", "/upload/q_40"),
                }}
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
      </View>
    </TouchableOpacity>
  );
});

export default Tweet;
