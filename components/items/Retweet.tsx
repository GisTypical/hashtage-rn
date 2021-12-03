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
    <View>
      <Text style={tailwind`ml-3 mt-2 text-gray-400 italic`}>
        Retweeted by {retweet.user_id.username}
      </Text>
      <TouchableOpacity
        style={tailwind`flex-row border-b border-gray-300 px-2 py-2`}
        activeOpacity={0.9}
        onPress={() => navigation.push("Thread", retweet.post_id._id.$oid)}
      >
        <UserPictureCircle username={retweet.post_id.author?.$oid} />

        {/* Right Side */}
        <View style={tailwind`flex-1 ml-2`}>
          <View style={tailwind`flex-row items-center mt-1`}>
            <Text style={tailwind`font-bold`}>
              {retweet.post_id.author?.$oid}
            </Text>
            <Text style={tailwind`font-bold opacity-60`}>
              {" "}
              • {parseDate(retweet.post_id.date.$date.toString())}
            </Text>
          </View>
          <Text style={tailwind`text-base w-full`}>{retweet.post_id.text}</Text>

          <View style={tailwind`overflow-visible my-2`}>
            {retweet.post_id.img_path ? (
              <Image
                source={{ uri: retweet.post_id.img_path }}
                style={tailwind`w-full h-[200px] rounded-xl`}
              />
            ) : null}
          </View>

          {/* Touchable icons */}
          {/* <TweetButtons post={retweet.post_id._id.$oid} /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Retweet;
