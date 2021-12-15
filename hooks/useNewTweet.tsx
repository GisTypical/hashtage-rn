import { NavigationProp } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import { createTweet } from "../utils/Posts";
import { Post, PostRoot } from "../utils/types";

interface Props {
  navigation: NavigationProp<any>;
}

const useNewTweet = ({ navigation }: Props) => {
  const queryClient = useQueryClient();

  return useMutation((post: Post) => createTweet(post), {
    onSuccess: ({ data: newTweetData }) => {
      queryClient.setQueryData(["tweets"], (data) => {
        let oldData = data as { data: PostRoot };
        oldData.data.posts = [newTweetData.post, ...oldData.data.posts!];
        return data;
      });
      navigation.goBack();
    },
  });
};

export default useNewTweet;
