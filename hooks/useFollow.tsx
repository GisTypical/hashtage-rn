import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../components/providers/AuthProvider";
import { follow } from "../utils/Follow";
import { UserProfile, Post } from "../utils/types";

const useFollow = () => {
  const queryClient = useQueryClient();
  const { following, setFollowing } = useContext(AuthContext);

  return useMutation((userId: string) => follow(userId), {
    onSuccess: ({ data }) => {
      setFollowing(following! + 1);

      queryClient.setQueryData(["profile", data.user_followed], (data) => {
        let updatedProfile = data as {
          data: { user: UserProfile; posts: Post[] };
        };
        updatedProfile.data.user.isFollower = true;
        updatedProfile.data.user.followers =
          updatedProfile.data.user.followers + 1;
        return updatedProfile;
      });
      queryClient.removeQueries(["tweets"]);
    },
  });
};

export default useFollow;
