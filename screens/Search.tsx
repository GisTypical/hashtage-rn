import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { useQuery } from "react-query";
import tailwind from "twrnc";
import YellowButton from "../components/buttons/YellowButton";
import Tweet from "../components/items/Tweet";
import UserPictureCircle from "../components/UserCircle";
import ViewCenter from "../components/ViewCenter";
import { searchPost } from "../utils/Posts";
import { Post, User } from "../utils/types";

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const Search = ({ navigation }: Props) => {
  const [search, setSearch] = useState("");
  const { data, isLoading, refetch } = useQuery(
    "search",
    () => searchPost(search),
    {
      enabled: false,
    }
  );

  return (
    <View style={tailwind`bg-white flex-1`}>
      <View style={tailwind`flex-row p-2 px-2 border-b-2 border-gray-200`}>
        <TextInput
          style={tailwind`flex-1 mr-2`}
          placeholder="Search for tweets and users."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <YellowButton text="Search" onPress={refetch} />
      </View>
      {isLoading ? (
        <ViewCenter>
          <ActivityIndicator color="#000" size="large" />
        </ViewCenter>
      ) : (
        <View>
          <FlatList
            ListHeaderComponent={
              data?.data.users.length ? (
                <FlatList
                  horizontal={true}
                  data={data?.data.users}
                  showsHorizontalScrollIndicator={false}
                  style={tailwind`py-2 border-b border-gray-200`}
                  renderItem={({ item: user }: { item: User }) => (
                    <View
                      key={user.username}
                      style={tailwind`w-20 items-center justify-center ml-2 mr-2`}
                    >
                      <UserPictureCircle
                        username={user.username}
                      ></UserPictureCircle>
                      <Text
                        style={tailwind`text-xs text-center w-full text-black mt-1 font-bold`}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {user.full_name}
                      </Text>
                      <Text
                        style={tailwind`text-xs text-gray-600`}
                      >{`@${user.username}`}</Text>
                    </View>
                  )}
                ></FlatList>
              ) : null
            }
            data={data?.data.posts}
            keyExtractor={(item: Post) => item.id!}
            renderItem={({ item }) => (
              <Tweet post={item} navigation={navigation} />
            )}
          ></FlatList>
        </View>
      )}
    </View>
  );
};

export default Search;
