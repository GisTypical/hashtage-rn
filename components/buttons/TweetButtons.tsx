import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import tailwind from "twrnc";
import { deleteRetweet, retweet, like, dislike } from "../../utils/Posts";
import tw from "../../utils/tailwind";
import { Post } from "../../utils/types";
import AppText from "../AppText";

interface Props {
  post: Post;
  onReply: () => void;
}

const TweetButtons = ({ post, onReply }: Props) => {
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [retweetCount, setRetweetCount] = useState(0);
  const queryClient = useQueryClient();
  const { mutate: retweetMutation } = useMutation(() => retweet(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { mutate: unretweet } = useMutation(() => deleteRetweet(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { mutate: likeMutation } = useMutation(() => like(post.id!), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { mutate: dislikeMutation } = useMutation(() => dislike(post.id!), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    setIsRetweeted(post.didRetweet!);
    setRetweetCount(post.retweets_count!);
  }, [post.didRetweet, post.retweets_count]);

  function onRetweet() {
    isRetweeted ? unretweet() : retweetMutation();
    setIsRetweeted(!isRetweeted);
    setRetweetCount(!isRetweeted ? retweetCount + 1 : retweetCount - 1);
  }

  function onLikeButton() {
    !post.didLike ? likeMutation() : dislikeMutation();
    // setIsRetweeted(!isRetweeted);
    // setRetweetCount(!isRetweeted ? retweetCount + 1 : retweetCount - 1);
  }
  return (
    <View
      style={tailwind`flex-row w-full justify-between items-center px-6 border-gray-200`}
    >
      {/* Reply */}
      <TouchableOpacity
        onPress={onReply}
        style={tailwind`flex-row items-center`}
      >
        <Ionicons
          style={tw`mr-2`}
          name="ios-chatbox-outline"
          size={24}
          color="black"
        />
        <AppText>{post.comments_count}</AppText>
      </TouchableOpacity>
      {/* Retweet */}
      <TouchableOpacity
        style={tailwind`flex-row items-center`}
        onPress={onRetweet}
      >
        <AntDesign
          style={tw`mr-2`}
          name="retweet"
          size={24}
          color={!isRetweeted ? "#000" : "#F59E0B"}
        />
        <AppText>
          <Text
            style={tailwind.style(
              `ml-2`,
              !isRetweeted ? "text-black" : "text-yellow-500"
            )}
          >
            {retweetCount}
          </Text>
        </AppText>
      </TouchableOpacity>
      {/* Like */}
      <TouchableOpacity
        style={tailwind`flex-row items-center`}
        onPress={() => onLikeButton()}
      >
        <AntDesign
          style={tailwind`mr-2`}
          name={!post.didLike ? "hearto" : "heart"}
          size={24}
          color={!post.didLike ? "black" : "#F59E0B"}
        />
        <AppText>
          <Text
            style={tw.style(!post.didLike ? "text-black" : "text-yellow-500")}
          >
            {post.likes_count}
          </Text>
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default TweetButtons;
