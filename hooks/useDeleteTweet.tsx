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
        queryClient.setQueryData(
          ["tweets", "thread", post.parent?.id],
          (data) => {
            let parentThreadData = data as { data: Post };
            parentThreadData.data.children =
              parentThreadData.data.children?.filter(
                (childPost: Post) => childPost.id !== post.id
              );
            // Decrease comments count
            parentThreadData.data.comments_count!--;

            // Update grandparent for the comment count
            queryClient.invalidateQueries([
              "tweets",
              "thread",
              parentThreadData.data.parent?.id,
            ]);
            return parentThreadData;
          }
        );
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
      }
      queryClient.removeQueries(["tweets", "thread", post.id]);
    },
  });
};

export default useDeleteTweet;
