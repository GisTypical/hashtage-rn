import { useMutation, useQueryClient } from "react-query";
import { follow } from "../utils/Follow";
import { UserProfile, Post } from "../utils/types";

const useFollow = () => {
  const queryClient = useQueryClient();
  return useMutation((userId: string) => follow(userId), {
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["profile", data.user_followed], (data) => {
        let updatedProfile = data as {
          data: { user: UserProfile; posts: Post[] };
        };
        updatedProfile.data.user.isFollower = true;
        updatedProfile.data.user.followers =
          updatedProfile.data.user.followers + 1;
        return updatedProfile;
      });
    },
  });
};

export default useFollow;
