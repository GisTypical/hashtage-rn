import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { parseDate } from "../../utils/parseDate";
import { RetweetType } from "../../utils/types";
import TweetButtons from "../buttons/TweetButtons";
import UserPictureCircle from "../UserCircle";

interface Props {
  retweet: RetweetType;
  navigation: NativeStackNavigationProp<any>;
}

const Retweet = ({ retweet, navigation }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={tailwind`ml-1`}
      onPress={() => navigation.push("Thread", retweet.post_id.id)}
    >
      <Text style={tailwind`ml-3 mt-2 text-gray-400 italic`}>
        Retweeted by {retweet.user_id.username}
      </Text>
      <View style={tailwind`flex-row border-b border-gray-300 px-2 py-2`}>
        <UserPictureCircle username={retweet.post_id.author?.username} />

        {/* Right Side */}
        <View style={tailwind`flex-1 ml-2`}>
          <View style={tailwind`flex-row items-center mt-1`}>
            <Text style={tailwind`font-bold`}>
              {retweet.post_id.author?.username}
            </Text>
            <Text style={tailwind`font-bold opacity-60`}>
              {" "}
              • {parseDate(retweet.post_id.date!)}
            </Text>
          </View>
          {retweet.post_id.text ? (
            <Text style={tailwind`text-base w-full`}>
              {retweet.post_id.text}
            </Text>
          ) : null}

          {retweet.post_id.images?.length ? (
            <View style={tailwind`overflow-visible my-2`}>
              <Image
                source={{ uri: retweet.post_id.images[0] }}
                style={tailwind`w-full h-[200px] rounded-xl`}
              />
            </View>
          ) : null}

          {/* Touchable icons */}
          <TweetButtons
            onReply={() => {
              navigation.push("Thread", retweet.post_id.id);
            }}
            post={retweet.post_id}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Retweet;
