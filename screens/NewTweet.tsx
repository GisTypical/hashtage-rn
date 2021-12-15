import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import AppText from "../components/AppText";
import Fab from "../components/buttons/Fab";
import NewTweetInput from "../components/inputs/NewTweetInput";
import UserPictureCircle from "../components/UserCircle";
import useNewTweet from "../hooks/useNewTweet";
import tw from "../utils/tailwind";
import { Post } from "../utils/types";

interface Props {
  navigation: NavigationProp<any>;
}

const NewTweet = ({ navigation }: Props) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<ImageInfo>();
  const { mutate, isLoading } = useNewTweet({ navigation });

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
    if (!image && (text.length === 0 || text.length >= 280)) {
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
          style={tw`bg-yellow-500 ml-5 py-2 px-4 rounded-lg ${
            !image && (text.length === 0 || text.length >= 280)
              ? "bg-opacity-50"
              : ""
          }`}
          onPress={onSubmit}
          disabled={!image && (text.length === 0 || text.length >= 280)}
        >
          <Text style={tw`text-yellow-900`}>
            <AppText>{isLoading ? "Please wait..." : "Tweet"}</AppText>
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
  }, []);

  return (
    <View style={tw`bg-white flex-1 flex-row`}>
      <View style={tw`ml-1 mx-2 mt-2 w-14 py-2 items-center justify-between`}>
        <UserPictureCircle disabled={true}></UserPictureCircle>
        <View style={tw`mb-5`}>
          <AppText>
            <Text
              style={tw`text-xs font-bold ${
                text.length >= 200 && text.length < 280
                  ? "text-yellow-500"
                  : text.length >= 280
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              {`${text.length}/280`}
            </Text>
          </AppText>
        </View>
      </View>

      <NewTweetInput text={text} setText={setText} image={image} />

      <Fab onPress={pickImage}>
        <Ionicons
          name="ios-image-outline"
          size={24}
          style={tw`text-yellow-900`}
        />
      </Fab>
    </View>
  );
};

export default NewTweet;
