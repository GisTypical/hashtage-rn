import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import { getProfile } from "../utils/Profile";

interface Props {
  userId: string;
}

const useProfile = ({ userId }: Props) => {
  return useQuery(["profile", userId], () => getProfile(userId), {
    select: (data) => data.data,
  });
};

export default useProfile;
