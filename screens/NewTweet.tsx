import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQueryClient } from "react-query";
import tailwind from "twrnc";
import Fab from "../components/buttons/Fab";
import UserPictureCircle from "../components/UserCircle";
import { createTweet } from "../utils/Posts";
import { Post } from "../utils/types";

interface Props {
  navigation: NavigationProp<any>;
}

const NewTweet = ({ navigation }: Props) => {
  const textRef = useRef<TextInput>(null);
  const [image, setImage] = useState<ImageInfo>();
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((post: Post) => createTweet(post), {
    onSuccess: () => {
      queryClient.invalidateQueries("tweets");
      navigation.goBack();
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
    if (text.length === 0 || text.length >= 280) {
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
    mutate(values);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={tailwind`bg-yellow-500 ml-5 py-2 px-4 rounded-lg ${
            text.length === 0 || text.length >= 280 ? "bg-opacity-50" : ""
          }`}
          onPress={onSubmit}
          disabled={text.length === 0 || text.length >= 280}
        >
          <Text style={tailwind`text-black`}>
            {isLoading ? "Please wait..." : "Tweet"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, text, image, isLoading]);

  useEffect(() => {
    const askPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, without storage permissions image upload wont work!");
        }
      }
    };
    askPermissions();
    setTimeout(() => {
      if (!textRef.current?.focus()) {
        textRef.current?.focus();
      }
    }, 100);
  }, []);

  return (
    <View style={tailwind`bg-white flex-1 flex-row`}>
      <View
        style={tailwind`ml-1 mt-2 px-2 py-2 place-items-center justify-between`}
      >
        <UserPictureCircle username={""}></UserPictureCircle>
        <Text
          style={tailwind`text-xs font-bold ${
            text.length >= 200 && text.length < 280
              ? "text-yellow-500"
              : text.length >= 280
              ? "text-red-500"
              : "text-black"
          }`}
        >
          {`${text.length}/280`}
        </Text>
      </View>
      <ScrollView style={tailwind`flex-1 mt-2 pt-3`}>
        <TextInput
          ref={textRef}
          textAlignVertical="top"
          multiline={true}
          placeholder="Tell the world what's going on!"
          style={tailwind.style(
            `px-2 py-1 rounded-lg text-base text-left justify-center`,
            image?.uri ? "" : "flex-1"
          )}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        ></TextInput>
        {image?.uri ? (
          <View style={tailwind`flex-1 mx-2 mt-1`}>
            <Image
              style={tailwind`w-full h-[200px] rounded-xl`}
              source={{ uri: image.uri }}
            ></Image>
          </View>
        ) : null}
      </ScrollView>

      <Fab onPress={pickImage}>
        <Ionicons name="ios-image-outline" size={24} color="black" />
      </Fab>
    </View>
  );
};

export default NewTweet;
