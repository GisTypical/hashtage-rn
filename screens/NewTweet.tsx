import { NavigationProp } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { Image } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQueryClient } from "react-query";
import tailwind from "twrnc";
import Fab from "../components/buttons/Fab";
import { createTweet } from "../utils/Posts";
import { Post } from "../utils/types";

interface Props {
  navigation: NavigationProp<any>;
}

const NewTweet = ({ navigation }: Props) => {
  const [image, setImage] = useState<ImageInfo>();
  const [text, setText] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation((post: Post) => createTweet(post), {
    onSuccess: () => {
      queryClient.invalidateQueries("tweets");
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
        name: image.uri.slice(image.uri.lastIndexOf("/") + 1, image.uri.length),
      };
    }
    mutation.mutate(values);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={tailwind`bg-yellow-500 ml-5 py-2 px-4 rounded-lg`}
          onPress={onSubmit}
        >
          <Text style={tailwind`text-black`}>Tweet</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, text, image]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, without storage permissions image upload wont work!");
        }
      }
    })();
  }, []);

  return (
    <View style={tailwind`bg-white flex-1 flex-row`}>
      <View
        style={tailwind`bg-yellow-500 ml-4 w-12 h-12 mt-3 rounded-full justify-center items-center`}
      >
        <Text>{}</Text>
      </View>
      <View style={tailwind`flex-1 mt-2 pt-3`}>
        <TextInput
          textAlignVertical="top"
          multiline={true}
          placeholder="Tell the world what's going on!"
          style={tailwind`flex-1 px-2 py-1 rounded-lg text-base text-left`}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        ></TextInput>
      </View>

      <Fab onPress={pickImage}>
        <Image></Image>
      </Fab>
    </View>
  );
};

export default NewTweet;
