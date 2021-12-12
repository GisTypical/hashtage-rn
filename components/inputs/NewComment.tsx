import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import React, { forwardRef, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { commentTweet } from "../../utils/Posts";
import tw from "../../utils/tailwind";
import { Post, PostRoot } from "../../utils/types";

interface Props {
  postId: string;
}

const NewComment = forwardRef(
  ({ postId }: Props, ref: React.LegacyRef<TextInput>) => {
    const [text, setText] = useState<string>("");
    const [image, setImage] = useState<ImageInfo>();
    const queryClient = useQueryClient();
    const mutation = useMutation((post: Post) => commentTweet(post, postId), {
      onSuccess: ({ data: newComment }) => {
        queryClient.setQueryData(["tweets", "thread", postId], (data) => {
          let oldData = data as { data: Post };
          oldData.data.children = [
            ...oldData.data.children!,
            newComment.comment,
          ];
          return data;
        });
        queryClient.invalidateQueries();
        setText("");
        setImage(undefined);
      },
    });

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
          name: image.uri.slice(
            image.uri.lastIndexOf("/") + 1,
            image.uri.length
          ),
        };
      }
      mutation.mutate(values);
    };

    return (
      <View
        style={tw`absolute flex-row bg-white border-t border-gray-200 w-full bottom-0 p-2`}
      >
        <TextInput
          style={tw`flex-1 font-sans ${
            text.length >= 200 && text.length < 280
              ? "text-yellow-500"
              : text.length >= 280
              ? "text-red-500"
              : "text-black"
          }`}
          placeholder="Reply this tweet!"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          value={text}
          onChangeText={(text) => setText(text)}
          ref={ref}
        ></TextInput>
        {mutation.isLoading ? (
          <View style={tw`mx-1 w-10 h-7 justify-center items-center`}>
            <ActivityIndicator color="#000"></ActivityIndicator>
          </View>
        ) : (
          <TouchableOpacity
            style={tw`mx-1 w-10 h-7 justify-center items-center`}
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
    );
  }
);

export default NewComment;
