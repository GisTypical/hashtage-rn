import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import tailwind from "twrnc";
import TweetButtons from "../components/buttons/TweetButtons";
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
  const replyRef = useRef<TextInput>(null);
  const [image, setImage] = useState<ImageInfo>();
  const { data, isLoading } = useQuery(`thread/${route.params}`, () =>
    getThread(route.params)
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (post: Post) => commentTweet(post, route.params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        setText("");
        setImage(undefined);
      },
    }
  );

  const setReplyFocus = () => {
    if (!replyRef.current!.isFocused()) {
      replyRef.current!.focus();
    }
  };

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
      <View style={tailwind`bg-white flex-1 mb-9`}>
        <FlatList
          ListHeaderComponent={
            <ThreadTweet navigation={navigation} post={data?.data}>
              <View
                style={tailwind`flex-row items-center p-3 border-t border-b border-gray-200 justify-between`}
              >
                <TweetButtons onReply={setReplyFocus} post={data?.data} />
              </View>
            </ThreadTweet>
          }
          data={data?.data.children}
          keyExtractor={(item: Post) => item.id!}
          renderItem={({ item }) => (
            <Tweet post={item} navigation={navigation} />
          )}
        ></FlatList>
      </View>
      <View
        style={tailwind`absolute flex-row bg-white border-t border-gray-200 w-full bottom-0 p-2`}
      >
        <TextInput
          style={tailwind`flex-1`}
          placeholder="Reply this tweet!"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          value={text}
          onChangeText={(text) => setText(text)}
          ref={replyRef}
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
            <Ionicons
              name="ios-image-outline"
              size={24}
              color={image ? "#F59E0B" : "#000"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Thread;
