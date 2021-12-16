import { NavigationProp } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import { UserProfile } from "../utils/types";
import { editUser } from "../utils/User";

interface Props {
  navigation: NavigationProp<any>;
}

const useEditUser = ({ navigation }: Props) => {
  const queryClient = useQueryClient();
  return useMutation((values: UserProfile) => editUser(values), {
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["profile", data.user.id], (oldData) => {
        navigation.goBack();
        let newUserProfile = oldData as { data: { user: UserProfile } };
        newUserProfile.data.user = data.user;
        return newUserProfile;
      });
    },
  });
};

export default useEditUser;
