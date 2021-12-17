import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { NavigationProp } from "@react-navigation/native";
import dayjs from "dayjs";
import { Formik, FormikProps } from "formik";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Platform, ScrollView, Text, TextInput, View } from "react-native";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import Title from "../components/Title";
import useEditUser from "../hooks/useEditUser";
import { EditUserSchema } from "../utils/Schema";
import tw from "../utils/tailwind";
import { UserProfile } from "../utils/types";

interface Props {
  route: {
    params: UserProfile;
  };
  navigation: NavigationProp<any>;
}

const EditUser = ({ route: { params }, navigation }: Props) => {
  const { mutate, isLoading } = useEditUser({ navigation });
  const [show, setShow] = useState(false);
  const formRef = useRef<FormikProps<UserProfile>>(null);

  const onChange = (event: Event, date: Date | undefined) => {
    const currentDate = date || date;
    setShow(Platform.OS === "ios");
    formRef.current?.setFieldValue(
      "birthday",
      dayjs(date).format("DD/MM/YYYY")
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <YellowButton
          text={!isLoading ? "Done" : "Editing..."}
          onPress={() => {
            formRef.current?.handleSubmit();
          }}
        ></YellowButton>
      ),
    });
  }, [navigation, formRef, isLoading]);

  return (
    <View style={tw`bg-white flex-1`}>
      <ScrollView>
        <Formik
          validationSchema={EditUserSchema}
          innerRef={formRef}
          initialValues={{
            username: params.username,
            full_name: params.full_name,
            bio: params.bio!,
            address: params.address!,
            birthday: dayjs(params.birthday).add(1, "day").format("DD/MM/YYYY"),
            password: "",
            id: "",
            following: 0,
            followers: 0,
            isFollower: false,
          }}
          onSubmit={(values: UserProfile) => mutate(values)}
        >
          {({ values, handleChange, errors }) => (
            <View style={tw`mt-4 mx-4`}>
              <Title text="Profile"></Title>
              {/* Username */}
              <AppText>
                <Text style={tw`text-base`}>Username</Text>
              </AppText>
              {errors.username ? (
                <AppText>
                  <Text style={tw`text-red-500`}>{errors.username}</Text>
                </AppText>
              ) : null}
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mb-1 font-sans`}
                value={values.username}
                onChangeText={handleChange("username")}
              ></TextInput>
              {/* Fullname */}
              <AppText>
                <Text style={tw`text-base`}>Fullname</Text>
              </AppText>
              {errors.full_name ? (
                <AppText>
                  <Text style={tw`text-red-500`}>{errors.full_name}</Text>
                </AppText>
              ) : null}
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mb-1 font-sans`}
                value={values.full_name}
                onChangeText={handleChange("full_name")}
              ></TextInput>
              {/* Bio */}
              <AppText>
                <Text style={tw`text-base`}>Bio</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-2 bg-gray-200 rounded-lg mb-1 font-sans`}
                value={values.bio}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                onChangeText={handleChange("bio")}
              ></TextInput>
              {/* Address */}
              <AppText>
                <Text style={tw`text-base`}>Address</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mb-1 font-sans`}
                value={values.address}
                onChangeText={handleChange("address")}
              ></TextInput>
              {/* Birthday */}
              <AppText>
                <Text style={tw`text-base`}>Birthday</Text>
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg mb-1 font-sans`}
                value={values.birthday}
                onPressIn={() => {
                  setShow(true);
                }}
                pointerEvents="none"
                showSoftInputOnFocus={false}
              ></TextInput>

              <View style={tw`border-t-2 mt-4 pt-2 border-gray-300`}>
                <Title text="Security"></Title>
                {/* Password */}
                <AppText>
                  <Text style={tw`text-base`}>Password</Text>
                </AppText>
                {errors.password ? (
                  <AppText>
                    <Text style={tw`text-red-500`}>{errors.password}</Text>
                  </AppText>
                ) : null}
                <TextInput
                  style={tw`px-2 py-1 bg-gray-200 rounded-lg mb-1 font-sans`}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry={true}
                ></TextInput>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dayjs(params.birthday).add(1, "day").toDate()}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default EditUser;
