import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { parseDate, parseDateTime } from "../utils/parseDate";
import tw from "../utils/tailwind";
import { UserProfile } from "../utils/types";
import AppText from "./AppText";
import YellowButton from "./buttons/YellowButton";
import UserPictureCircle from "./UserCircle";

interface Props {
  user: UserProfile;
}

const UserInfo = ({ user }: Props) => {
  return (
    <View style={tw`px-2 py-6`}>
      <View style={tw`flex-row items-center justify-between mx-2`}>
        <UserPictureCircle author={user} disabled={true}></UserPictureCircle>
        <YellowButton
          text="Follow"
          onPress={() => console.log("follow")}
        ></YellowButton>
      </View>
      <View style={tw`mb-2`}>
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
        <View style={tw`my-1`}>
          <AppText>
            <Text style={tw`text-base text-black`}>{user.bio}</Text>
          </AppText>
        </View>
      ) : null}
      <View style={tw`flex-row items-center`}>
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
      <View style={tw`flex-row items-center`}>
        <Ionicons style={tw`mr-1`} name="gift-outline" size={17} color="gray" />
        <AppText>
          <Text style={tw`text-gray-600`}>Born {parseDate(user.birthday)}</Text>
        </AppText>
      </View>
      <View style={tw`flex-row mt-1`}>
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
