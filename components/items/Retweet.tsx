import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { parseDateTime } from "../../utils/parseDate";
import tw from "../../utils/tailwind";
import { RetweetType } from "../../utils/types";
import AppText from "../AppText";
import TweetButtons from "../buttons/TweetButtons";
import UserPictureCircle from "../UserCircle";

interface Props {
  retweet: RetweetType;
  navigation: NativeStackNavigationProp<any>;
}

const Retweet = memo(({ retweet, navigation }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={tailwind`pl-1 border-b border-gray-300`}
      onPress={() => navigation.push("Thread", retweet.post_id.id)}
    >
      <View style={tw`ml-3 mt-2`}>
        <AppText>
          <Text style={tw`text-gray-400 italic`}>
            Retweeted by {retweet.user_id.username}
          </Text>
        </AppText>
      </View>
      <View style={tailwind`flex-row px-2 py-2`}>
        <UserPictureCircle
          author={retweet.post_id.author}
          navigation={navigation}
        />

        {/* Right Side */}
        <View style={tailwind`flex-1 ml-2`}>
          <View style={tailwind`flex-row items-center mt-1 mb-2`}>
            <AppText>
              <Text style={tailwind`font-bold`}>
                {retweet.post_id.author?.username}
              </Text>
            </AppText>
            <AppText>
              <Text style={tailwind`font-bold opacity-60`}>
                {" "}
                • {parseDateTime(retweet.post_id.date!)}
              </Text>
            </AppText>
          </View>

          {/* Retweet Text*/}
          {retweet.post_id.text ? (
            <View style={tw`mb-2 -mt-1`}>
              <AppText>
                <Text style={tailwind`text-base w-full leading-tight`}>
                  {retweet.post_id.text}
                </Text>
              </AppText>
            </View>
          ) : null}

          {retweet.post_id.images?.length ? (
            <View style={tailwind`overflow-visible mb-2`}>
              <Image
                source={{
                  uri: retweet.post_id.images[0].replace(
                    "/upload",
                    "/upload/q_40"
                  ),
                }}
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
});

export default Retweet;
