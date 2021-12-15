import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import UserInfo from "../components/UserInfo";
import ViewCenter from "../components/ViewCenter";
import useProfile from "../hooks/useProfile";
import tw from "../utils/tailwind";

interface Props {
  route: {
    params: string;
  };
}

const Profile = ({ route }: Props) => {
  const { data, isLoading } = useProfile({ userId: route.params });

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator size="large" color="#f59e0b" />
      </ViewCenter>
    );
  }

  return (
    <View style={tw`bg-white flex-1`}>
      <UserInfo user={data.user} />
    </View>
  );
};

export default Profile;
