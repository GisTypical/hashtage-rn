import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import tailwind from "twrnc";
import { deleteRetweet, retweet } from "../../utils/Posts";
import { Post } from "../../utils/types";

interface Props {
  post: Post;
}

const TweetButtons = ({ post }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: retweetMutation } = useMutation(() => retweet(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("tweets");
    },
  });
  const { mutate: unRetweet } = useMutation(() => deleteRetweet(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("tweets");
    },
  });
  return (
    <View
      style={tailwind`flex-row items-center px-3 border-gray-200 justify-between`}
    >
      <View style={tailwind`flex-row items-center`}>
        <Ionicons name="ios-chatbox-outline" size={24} color="black" />
        <Text style={tailwind`ml-2`}>{post.comments_count || "Reply"}</Text>
      </View>
      <TouchableOpacity
        style={tailwind`flex-row items-center`}
        onPress={() => {
          post.didRetweet ? unRetweet() : retweetMutation();
        }}
      >
        <AntDesign
          name="retweet"
          size={24}
          color={post.didRetweet ? "#F59E0B" : "#000"}
        />
        <Text
          style={tailwind.style(
            `ml-2`,
            post.didRetweet ? "text-yellow-500" : "text-black"
          )}
        >
          {post.retweets_count || "Retweet"}
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
