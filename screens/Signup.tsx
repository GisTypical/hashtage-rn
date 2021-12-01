import { NavigationProp } from "@react-navigation/core";
import { Formik } from "formik";
import React, { FC } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { useMutation } from "react-query";
import tailwind from "twrnc";
import GreenButton from "../components/buttons/GreenButton";
import ViewCenter from "../components/ViewCenter";
import { register } from "../utils/Auth";
import { SignupSchema } from "../utils/Schema";
import { User } from "../utils/types";

const Signup: FC<{ navigation: NavigationProp<any, any> }> = ({
  navigation,
}) => {
  const mutation = useMutation((user: User) => register(user), {
    onSuccess: () => {
      navigation.navigate("Login");
    },
  });

  return (
    <ViewCenter>
      <Text style={tailwind`text-lg`}>Signup</Text>
      <Formik
        initialValues={{ username: "", full_name: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          Keyboard.dismiss();
          values.username = values.username.toLowerCase();
          mutation.mutate(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <View
            style={tailwind`bg-gray-100 rounded-lg w-3/4 justify-between px-5 py-6 mt-4`}
          >
            {/* Username */}
            <Text style={tailwind`font-bold text-base`}>Username</Text>
            {errors.username && touched.username ? (
              <Text style={tailwind`text-red-500`}>{errors.username}</Text>
            ) : null}
            <TextInput
              style={tailwind`px-2 py-1 bg-gray-200 rounded-lg mt-1`}
              placeholder="e. g. johndoe"
              value={values.username}
              onChangeText={handleChange("username")}
            ></TextInput>

            {/* Full name */}
            <Text style={tailwind`font-bold mt-3 text-base`}>Full name</Text>
            {errors.full_name && touched.full_name ? (
              <Text style={tailwind`text-red-500`}>{errors.full_name}</Text>
            ) : null}
            <TextInput
              style={tailwind`px-2 py-1 bg-gray-200 rounded-lg mt-1`}
              placeholder="e. g. John Doe"
              value={values.full_name}
              onChangeText={handleChange("full_name")}
            ></TextInput>

            {/* Password */}
            <Text style={tailwind`font-bold mt-3 text-base`}>Password</Text>
            {errors.password && touched.password ? (
              <Text style={tailwind`text-red-500`}>{errors.password}</Text>
            ) : (
              <Text style={tailwind`text-gray-500`}>
                More than 4 characters
              </Text>
            )}
            <TextInput
              style={tailwind`px-2 py-1 bg-gray-200 rounded-lg mb-3`}
              value={values.password}
              secureTextEntry={true}
              onChangeText={handleChange("password")}
            ></TextInput>

            <GreenButton
              text={mutation.isLoading ? "Please wait..." : "Signup"}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ViewCenter>
  );
};

export default Signup;
