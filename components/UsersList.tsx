import React from "react";
import { View, Text, FlatList } from "react-native";
import tw from "../utils/tailwind";
import { User } from "../utils/types";
import AppText from "./AppText";
import UserPictureCircle from "./UserCircle";

interface Props {
  users: User[];
}

const UsersList = ({ users }: Props) => {
  return (
    <FlatList
      horizontal={true}
      data={users}
      showsHorizontalScrollIndicator={false}
      style={tw`py-2 border-b border-gray-200`}
      renderItem={({ item: user }: { item: User }) => (
        <View
          key={user.username}
          style={tw`w-20 items-center justify-center ml-2 mr-2`}
        >
          <UserPictureCircle username={user.username}></UserPictureCircle>
          <Text
            style={tw`font-sans-bold text-xs text-center w-full text-black`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {user.full_name}
          </Text>
          <AppText>
            <Text style={tw`text-xs text-gray-600`}>{`@${user.username}`}</Text>
          </AppText>
        </View>
      )}
    ></FlatList>
  );
};

export default UsersList;
