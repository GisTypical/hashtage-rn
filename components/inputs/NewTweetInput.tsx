import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Image, ScrollView, TextInput, View } from "react-native";
import tailwind from "twrnc";

interface Props {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  image: ImageInfo | undefined;
}

const NewTweetInput = ({ text, setText, image }: Props) => {
  const textRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => {
      textRef.current!.focus();
    }, 500);
  }, []);

  return (
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
  );
};
export default NewTweetInput;
