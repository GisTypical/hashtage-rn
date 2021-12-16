import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useFollow from "../hooks/useFollow";
import useUnfollow from "../hooks/useUnfollow";
import { parseDate } from "../utils/parseDate";
import tw from "../utils/tailwind";
import { UserProfile } from "../utils/types";
import AppText from "./AppText";
import YellowButton from "./buttons/YellowButton";
import UserPictureCircle from "./UserCircle";

interface Props {
  user: UserProfile;
}

const UserInfo = ({ user }: Props) => {
  const { mutate: followMutate } = useFollow();
  const { mutate: unfollowMutate } = useUnfollow();

  const onClick = () => {
    if (!user.isFollower) {
      followMutate(user.id);
    } else {
      unfollowMutate(user.id);
    }
  };

  return (
    <View style={tw`px-2 pt-6 border-b-2 border-gray-200`}>
      <View style={tw`flex-row items-center justify-between mx-2`}>
        <UserPictureCircle author={user} disabled={true}></UserPictureCircle>
        <YellowButton
          text={!user.isFollower ? "Follow" : "Following"}
          onPress={() => onClick()}
        ></YellowButton>
      </View>
      <View style={tw`my-1`}>
        <AppText>
          <Text style={tw`font-bold text-base`}>{user.full_name}</Text>
        </AppText>
        <AppText>
          <Text style={tw`text-base text-gray-600 leading-none`}>
            @{user.username}
          </Text>
        </AppText>
      </View>

      {/* Bio */}
      {user.bio ? (
        <View style={tw`mb-2`}>
          <AppText>
            <Text style={tw`text-base text-black`}>{user.bio}</Text>
          </AppText>
        </View>
      ) : null}

      {/* Location */}
      {user.address ? (
        <View style={tw`flex-row items-center mb-1`}>
          <Ionicons
            style={tw`mr-1`}
            name="location-outline"
            size={17}
            color="gray"
          />
          <AppText>
            <Text style={tw`text-gray-600`}>{user.address}</Text>
          </AppText>
        </View>
      ) : null}

      {/* Birthday */}
      {user.birthday ? (
        <View style={tw`flex-row items-center`}>
          <Ionicons
            style={tw`mr-1`}
            name="gift-outline"
            size={17}
            color="gray"
          />
          <AppText>
            <Text style={tw`text-gray-600`}>
              Born {parseDate(user.birthday)}
            </Text>
          </AppText>
        </View>
      ) : null}
      <View style={tw`flex-row mt-1 mb-2`}>
        <View style={tw`mr-5`}>
          <AppText>
            <Text style={tw`text-base font-bold`}>{user.followers} </Text>
            <Text>{user.followers === 1 ? "Follower" : "Followers"}</Text>
          </AppText>
        </View>
        <AppText>
          <Text style={tw`text-base font-bold`}>{user.following} </Text>
          <Text>Follows</Text>
        </AppText>
      </View>
    </View>
  );
};

export default UserInfo;
