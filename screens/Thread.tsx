import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { Image } from "phosphor-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import tailwind from "twrnc";
import Tweet from "../components/items/Tweet";
import ThreadTweet from "../components/ThreadTweet";
import ViewCenter from "../components/ViewCenter";
import { commentTweet, getThread } from "../utils/Posts";
import { Post } from "../utils/types";

interface Props {
  route: {
    params: string;
  };
  navigation: NativeStackNavigationProp<any, any>;
}

const Thread = ({ route, navigation }: Props) => {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<ImageInfo>();
  const { data, isLoading } = useQuery(`thread/${route.params}`, () =>
    getThread(route.params)
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (post: Post) => commentTweet(post, route.params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`thread/${route.params}`);
        setText("");
        setImage(undefined);
      },
    }
  );

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator size="large" color="#000" />
      </ViewCenter>
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const onSubmit = () => {
    if (text.length === 0 && text.length >= 280) {
      return;
    }

    const values: Post = {
      text,
    };

    if (image) {
      values.imagesUp = {
        uri: image.uri,
        name: image.uri.slice(image.uri.lastIndexOf("/") + 1, image.uri.length),
      };
    }
    mutation.mutate(values);
  };

  return (
    <View style={tailwind`bg-white flex-1`}>
      <ScrollView
        nestedScrollEnabled={true}
        style={tailwind`bg-white flex-1 mb-9`}
      >
        <ThreadTweet post={data?.data}></ThreadTweet>
        {data?.data.children.map((tweet: Post) => (
          <Tweet key={tweet.id} post={tweet} navigation={navigation} />
        ))}
      </ScrollView>
      <View style={tailwind`absolute bg-gray-100 w-full bottom-0 py-1 px-3 `}>
        <View style={tailwind`flex-row items-center`}>
          <TextInput
            style={tailwind`flex-1`}
            placeholder="Reply with a tweet!"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            value={text}
            onChangeText={(text) => setText(text)}
          ></TextInput>
          {mutation.isLoading ? (
            <View style={tailwind`mx-1 w-10 h-7 justify-center items-center`}>
              <ActivityIndicator color="#000"></ActivityIndicator>
            </View>
          ) : (
            <TouchableOpacity
              style={tailwind`mx-1 w-10 h-7 justify-center items-center`}
              onPress={pickImage}
            >
              <Image color={image ? "#F59E0B" : "#000"}></Image>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Thread;
