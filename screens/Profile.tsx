import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import Tweet from "../components/items/Tweet";
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
  const { data, isLoading } = useProfile({ userId: route.params });

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
        ListHeaderComponent={<UserInfo user={data.user} />}
        data={data.posts}
        renderItem={({ item }) => (
          <Tweet
            navigation={navigation}
            post={{ ...item, author: data.user }}
          ></Tweet>
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={4}
      ></FlatList>
    </View>
  );
};

export default Profile;
