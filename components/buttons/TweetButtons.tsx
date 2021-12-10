import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import tailwind from "twrnc";
import { deleteRetweet, retweet } from "../../utils/Posts";
import { Post } from "../../utils/types";

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
  const { mutate: unRetweet } = useMutation(() => deleteRetweet(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    setIsRetweeted(post.didRetweet!);
    setRetweetCount(post.retweets_count!);
  }, [post.didRetweet, post.retweets_count]);

  function onRetweet() {
    isRetweeted ? unRetweet() : retweetMutation();
    setIsRetweeted(!isRetweeted);
    setRetweetCount(!isRetweeted ? retweetCount + 1 : retweetCount - 1);
  }
  return (
    <View
      style={tailwind`flex-row w-full items-center px-4 border-gray-200 justify-between`}
    >
      {/* Reply */}
      <TouchableOpacity
        onPress={onReply}
        style={tailwind`flex-row items-center`}
      >
        <Ionicons name="ios-chatbox-outline" size={24} color="black" />
        <Text style={tailwind`ml-2`}>{post.comments_count}</Text>
      </TouchableOpacity>
      {/* Retweet */}
      <TouchableOpacity
        style={tailwind`flex-row items-center`}
        onPress={onRetweet}
      >
        <AntDesign
          name="retweet"
          size={24}
          color={isRetweeted ? "#F59E0B" : "#000"}
        />
        <Text
          style={tailwind.style(
            `ml-2`,
            isRetweeted ? "text-yellow-500" : "text-black"
          )}
        >
          {retweetCount}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={tailwind`flex-row items-center`}>
      <Heart size={24} />
      <Text style={tailwind`ml-2`}>Like</Text>
    </TouchableOpacity> */}
    </View>
  );
};

export default TweetButtons;
