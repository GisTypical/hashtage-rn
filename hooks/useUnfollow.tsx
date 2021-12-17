import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../components/providers/AuthProvider";
import { unfollow } from "../utils/Follow";
import { Post, UserProfile } from "../utils/types";

const useUnfollow = () => {
  const queryClient = useQueryClient();
  const { following, setFollowing } = useContext(AuthContext);
  return useMutation((userId: string) => unfollow(userId), {
    onSuccess: ({ data }) => {
      setFollowing(following! - 1);

      queryClient.setQueryData(["profile", data.user_unfollowed], (data) => {
        let updatedProfile = data as {
          data: { user: UserProfile; posts: Post[] };
        };
        updatedProfile.data.user.isFollower = false;
        updatedProfile.data.user.followers =
          updatedProfile.data.user.followers - 1;
        return updatedProfile;
      });
      queryClient.removeQueries(["tweets"]);
    },
  });
};

export default useUnfollow;
