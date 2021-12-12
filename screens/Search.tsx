import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, RefreshControl, Text, TextInput, View } from "react-native";
import { useQuery } from "react-query";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import Tweet from "../components/items/Tweet";
import UserPictureCircle from "../components/UserCircle";
import { searchPost } from "../utils/Posts";
import tw from "../utils/tailwind";
import { Post, User } from "../utils/types";

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const Search = ({ navigation }: Props) => {
  const [search, setSearch] = useState("");
  const { data, refetch, isFetching } = useQuery(
    "search",
    () => searchPost(search),
    {
      enabled: false,
    }
  );

  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`flex-row p-2 px-2 border-b-2 border-gray-200`}>
        <TextInput
          style={tw`flex-1 mr-2 font-sans`}
          placeholder="Search for tweets and users."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <YellowButton text="Search" onPress={refetch} />
      </View>
      <View>
        <FlatList
          ListHeaderComponent={
            data?.data.users.length ? (
              // Users list
              <FlatList
                horizontal={true}
                data={data?.data.users}
                showsHorizontalScrollIndicator={false}
                style={tw`py-2 border-b border-gray-200`}
                renderItem={({ item: user }: { item: User }) => (
                  <View
                    key={user.username}
                    style={tw`w-20 items-center justify-center ml-2 mr-2`}
                  >
                    <UserPictureCircle
                      username={user.username}
                    ></UserPictureCircle>
                    <Text
                      style={tw`font-sans-bold text-xs text-center w-full text-black`}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {user.full_name}
                    </Text>
                    <AppText>
                      <Text
                        style={tw`text-xs text-gray-600`}
                      >{`@${user.username}`}</Text>
                    </AppText>
                  </View>
                )}
              ></FlatList>
            ) : null
          }
          data={data?.data.posts}
          renderItem={({ item }) => (
            <Tweet post={item} navigation={navigation} />
          )}
          keyExtractor={(item: Post) => item.id!}
          refreshControl={
            <RefreshControl
              colors={["#f59e0b"]}
              refreshing={isFetching}
            ></RefreshControl>
          }
        ></FlatList>
      </View>
    </View>
  );
};

export default Search;
