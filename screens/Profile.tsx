import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useContext, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import Retweet from "../components/items/Retweet";
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
  const { user, handleLogout } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (data) {
      navigation.setOptions({
        headerRight: () =>
          user === data.user.id ? (
            <TouchableOpacity
              onPress={() => {
                handleLogout();
              }}
            >
              <AppText>Logout</AppText>
            </TouchableOpacity>
          ) : null,
      });
    }
  }, [handleLogout, user, data]);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.post_id) {
        return (
          <Retweet
            retweet={{ id: item.id, post_id: item.post_id, user_id: data.user }}
            navigation={navigation}
          />
        );
      } else {
        return (
          <Tweet
            navigation={navigation}
            post={{ ...item, author: data.user }}
          ></Tweet>
        );
      }
    },
    [data]
  );

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator size="large" color="#f59e0b" />
      </ViewCenter>
    );
  }

  return (
    <View style={tw`bg-white flex-1`}>
      <FlatList
        ListHeaderComponent={
          <UserInfo
            user={data.user}
            currentUserId={user!}
            navigation={navigation}
          />
        }
        data={data.posts}
        renderItem={renderItem}
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
