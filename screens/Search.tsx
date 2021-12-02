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
import ViewCenter from "../components/ViewCenter";
import { searchPost } from "../utils/Posts";

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
          placeholder="Search for any Tweet!"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <YellowButton text="Search" onPress={refetch} />
      </View>
      {isLoading ? (
        <ViewCenter>
          <ActivityIndicator color="#000" />
        </ViewCenter>
      ) : (
        <FlatList
          data={data?.data.posts}
          renderItem={({ item }) => (
            <Tweet post={item} navigation={navigation} />
          )}
          keyExtractor={({ id }) => id}
        />
      )}
    </View>
  );
};

export default Search;
