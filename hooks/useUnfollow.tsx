import { useMutation, useQueryClient } from "react-query";
import { unfollow } from "../utils/Follow";
import { Post, User, UserProfile } from "../utils/types";

const useUnfollow = () => {
  const queryClient = useQueryClient();
  return useMutation((userId: string) => unfollow(userId), {
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["profile", data.user_unfollowed], (data) => {
        let updatedProfile = data as {
          data: { user: UserProfile; posts: Post[] };
        };
        updatedProfile.data.user.isFollower = false;
        updatedProfile.data.user.followers =
          updatedProfile.data.user.followers - 1;
        return updatedProfile;
      });
    },
  });
};

export default useUnfollow;
