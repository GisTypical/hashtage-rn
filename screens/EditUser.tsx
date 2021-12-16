import { NavigationProp } from "@react-navigation/native";
import { Formik, FormikProps, useFormikContext } from "formik";
import React, { useLayoutEffect } from "react";
import { useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../components/AppText";
import Title from "../components/Title";
import useEditUser from "../hooks/useEditUser";
import { parseDate } from "../utils/parseDate";
import tw from "../utils/tailwind";
import { UserProfile } from "../utils/types";

interface Props {
  route: {
    params: UserProfile;
  };
  navigation: NavigationProp<any>;
}

const EditUser = ({ route: { params }, navigation }: Props) => {
  const { mutate } = useEditUser({ navigation });
  const formRef = useRef<
    FormikProps<{
      username: string;
      full_name: string;
      bio: string;
      address: string;
      birthday: string;
      password: string;
    }>
  >();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={tw`bg-yellow-500 ml-5 py-2 px-4 rounded-lg`}
          onPress={() => {
            formRef.current?.handleSubmit();
          }}
        >
          <Text style={tw`text-yellow-900`}>
            <AppText>Done</AppText>
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, formRef]);

  return (
    <View style={tw`bg-white flex-1`}>
      <ScrollView>
        <Formik
          innerRef={formRef}
          initialValues={{
            username: params.username,
            full_name: params.full_name,
            bio: params.bio!,
            address: params.address!,
            birthday: parseDate(params.birthday!).slice(5, 14),
            password: "",
          }}
          onSubmit={(values) => mutate(values)}
        >
          {({ values, handleChange }) => (
            <View style={tw`mt-4 mx-4`}>
              <Title text="Public"></Title>
              <AppText>
                <Text style={tw`text-base`}>Username</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mt-1 font-sans`}
                value={values.username}
                onChangeText={handleChange("username")}
              ></TextInput>
              <AppText>
                <Text style={tw`text-base`}>Fullname</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mt-1 font-sans`}
                value={values.full_name}
                onChangeText={handleChange("full_name")}
              ></TextInput>
              <AppText>
                <Text style={tw`text-base`}>Bio</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mt-1 font-sans`}
                value={values.bio}
                onChangeText={handleChange("bio")}
              ></TextInput>
              <AppText>
                <Text style={tw`text-base`}>Address</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mt-1 font-sans`}
                value={values.address}
                onChangeText={handleChange("address")}
              ></TextInput>
              <AppText>
                <Text style={tw`text-base`}>Birthday</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mt-1 font-sans`}
                value={values.birthday}
                onChangeText={handleChange("birthday")}
              ></TextInput>

              <View style={tw`border-t-2 mt-4 pt-2 border-gray-300`}>
                <Title text="Security"></Title>
                <AppText>
                  <Text style={tw`text-base`}>Password</Text>
                </AppText>
                <TextInput
                  style={tw`px-2 py-1 bg-gray-200 rounded-lg mt-1 font-sans`}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry={true}
                ></TextInput>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditUser;
