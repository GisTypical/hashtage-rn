import { useMutation, useQueryClient } from "react-query";
import { commentTweet } from "../utils/Posts";
import { Post, PostRoot } from "../utils/types";

interface Props {
  post: Post;
}

const useNewComment = ({ post }: Props) => {
  const queryClient = useQueryClient();

  return useMutation((comment: Post) => commentTweet(comment, post.id!), {
    onSuccess: ({ data: newComment }) => {
      queryClient.setQueryData(["tweets", "thread", post.id], (data) => {
        let threadData = data as { data: Post };
        threadData.data.children = [
          ...threadData.data.children!,
          newComment.comment,
        ];
        threadData.data.comments_count!++;
        return threadData;
      });
      /**
       * Check if it has parent
       */
      if (post.parent) {
        /**
         * Update the counter inside comment on parent thread data
         */
        queryClient.invalidateQueries(["tweets", "thread", post.parent.id]);
      } else {
        queryClient.setQueryData(["tweets"], (data) => {
          let allTweetsData = data as { data: PostRoot };
          allTweetsData.data.posts = allTweetsData.data.posts.map(
            (tweet: Post) => {
              if (tweet.id === post.id) {
                tweet.comments_count!++;
              }
              return tweet;
            }
          );

          return allTweetsData;
        });

        queryClient.setQueryData(["tweets", post.author?.id], (data) => {
          let allTweetsData = data as { data: PostRoot };
          allTweetsData.data.posts = allTweetsData.data.posts.map(
            (tweet: Post) => {
              if (tweet.id === post.id) {
                tweet.comments_count!++;
              }
              return tweet;
            }
          );

          return allTweetsData;
        });
      }
    },
  });
};

export default useNewComment;
