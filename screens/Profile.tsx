import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import Tweet from "../components/items/Tweet";
import { AuthContext } from "../components/providers/AuthProvider";
import UserInfo from "../components/UserInfo";
import ViewCenter from "../components/ViewCenter";
import useProfile from "../hooks/useProfile";
import tw from "../utils/tailwind";

interface Props {
  route: {
    params: string;
  };
  navigation: NativeStackNavigationProp<any, any>;
}

const Profile = ({ route, navigation }: Props) => {
  const { data, isLoading, refetch, isRefetching } = useProfile({
    userId: route.params,
  });
  const { user } = useContext(AuthContext);

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator size="large" color="#f59e0b" />
      </ViewCenter>
    );
  }

  return (
    <View style={tw`bg-white`}>
      <FlatList
        ListHeaderComponent={
          <UserInfo
            user={data.user}
            currentUserId={user!}
            navigation={navigation}
          />
        }
        data={data.posts}
        renderItem={({ item }) => (
          <Tweet
            navigation={navigation}
            post={{ ...item, author: data.user }}
          ></Tweet>
        )}
        refreshControl={
          <RefreshControl
            colors={["#f59e0b"]}
            refreshing={isRefetching}
            onRefresh={refetch}
          ></RefreshControl>
        }
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={4}
      ></FlatList>
    </View>
  );
};

export default Profile;
