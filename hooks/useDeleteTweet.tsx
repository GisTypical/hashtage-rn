import { NavigationProp } from "@react-navigation/native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import { useMutation, useQueryClient } from "react-query";
import { deleteTweet } from "../utils/Posts";
import { Post, PostRoot } from "../utils/types";

interface Props {
  actionSheetRef: React.MutableRefObject<ActionSheet | null>;
  navigation: NavigationProp<any>;
  post: Post;
}

const useDeleteTweet = ({ actionSheetRef, navigation, post }: Props) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteTweet(post.id), {
    onSuccess: () => {
      actionSheetRef.current?.hide();
      navigation.goBack();

      /**
       * Check if it has a parent, for deletion from UI
       */
      if (post.parent) {
        /**
         * If it has a parent delete tweet from parent cache
         */
        queryClient.invalidateQueries(["tweets", "thread", post.parent?.id]);
      } else {
        /**
         * If it is from root (doesn't have a parent) delete tweet from feed cache
         */
        queryClient.setQueryData(["tweets"], (data) => {
          let allTweetsData = data as { data: PostRoot };
          allTweetsData.data.posts = allTweetsData.data.posts.filter(
            (childPost: Post) => childPost.id !== post.id
          );

          return allTweetsData;
        });

        queryClient.setQueryData(["profile", post.author?.id], (data) => {
          let profileTweetsData = data as { data: PostRoot };
          profileTweetsData.data.posts = profileTweetsData.data.posts.filter(
            (childPost: Post) => childPost.id !== post.id
          );
          return profileTweetsData;
        });
      }
      queryClient.removeQueries(["tweets", "thread", post.id]);
    },
  });
};

export default useDeleteTweet;
