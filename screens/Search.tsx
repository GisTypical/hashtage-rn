import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, TextInput, View } from "react-native";
import { useQuery } from "react-query";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import Tweet from "../components/items/Tweet";
import UserPictureCircle from "../components/UserCircle";
import UsersList from "../components/UsersList";
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

  const renderItem = useCallback(
    ({ item }) => <Tweet post={item} navigation={navigation} />,
    []
  );

  return (
    <View style={tw`bg-white flex-1`}>
      <View
        style={tw`absolute z-10 bg-white flex-row p-2 px-2 border-b-2 border-gray-200`}
      >
        <TextInput
          style={tw`flex-1 mr-2 font-sans`}
          placeholder="Search for tweets and users."
          value={search}
          onChangeText={(text) => setSearch(text)}
          returnKeyType="done"
          onSubmitEditing={() => refetch()}
        />
        <YellowButton text="Search" onPress={refetch} />
      </View>
      <View>
        <FlatList
          style={tw`mt-12`}
          ListHeaderComponent={
            data?.data.users.length ? (
              // Users list
              <UsersList users={data.data.users}></UsersList>
            ) : null
          }
          data={data?.data.posts}
          renderItem={renderItem}
          keyExtractor={(item: Post) => item.id!}
          refreshControl={
            <RefreshControl
              colors={["#f59e0b"]}
              refreshing={isFetching}
            ></RefreshControl>
          }
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          windowSize={10}
        ></FlatList>
      </View>
    </View>
  );
};

export default Search;
