import { NavigationProp } from "@react-navigation/core";
import { Formik } from "formik";
import React, { FC } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import Title from "../components/Title";
import ViewCenter from "../components/ViewCenter";
import useSignup from "../hooks/useSignup";
import { SignupSchema } from "../utils/Schema";
import tw from "../utils/tailwind";

interface Props {
  navigation: NavigationProp<any>;
}

const Signup: FC<Props> = ({ navigation }) => {
  const mutation = useSignup({ navigation });

  return (
    <ViewCenter>
      <Title text="Signup"></Title>
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
            style={tw`bg-gray-100 rounded-lg w-3/4 justify-between px-5 py-6 mt-4`}
          >
            {/* Username */}
            <AppText>
              <Text style={tw`font-bold text-base`}>Username</Text>
            </AppText>
            {errors.username && touched.username ? (
              <AppText>
                <Text style={tw`text-red-500`}>{errors.username}</Text>
              </AppText>
            ) : null}
            <TextInput
              style={tw`px-2 py-1 bg-gray-200 rounded-lg mt-1 font-sans`}
              placeholder="e. g. johndoe"
              value={values.username}
              onChangeText={handleChange("username")}
            ></TextInput>

            {/* Full name */}
            <AppText>
              <Text style={tw`font-bold mt-3 text-base`}>Full name</Text>
            </AppText>
            {errors.full_name && touched.full_name ? (
              <AppText>
                <Text style={tw`text-red-500`}>{errors.full_name}</Text>
              </AppText>
            ) : null}
            <TextInput
              style={tw`px-2 py-1 font-sans bg-gray-200 rounded-lg mt-1`}
              placeholder="e. g. John Doe"
              value={values.full_name}
              onChangeText={handleChange("full_name")}
            ></TextInput>

            {/* Password */}
            <AppText>
              <Text style={tw`font-bold mt-3 text-base`}>Password</Text>
            </AppText>
            {errors.password && touched.password ? (
              <AppText>
                <Text style={tw`text-red-500`}>{errors.password}</Text>
              </AppText>
            ) : (
              <AppText>
                <Text style={tw`text-gray-500`}>More than 4 characters</Text>
              </AppText>
            )}
            <TextInput
              style={tw`px-2 py-1 font-sans bg-gray-200 rounded-lg mb-3`}
              value={values.password}
              secureTextEntry={true}
              onChangeText={handleChange("password")}
            ></TextInput>

            <YellowButton
              text={mutation.isLoading ? "Please wait..." : "Signup"}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <Text style={tw`mt-3`}>
        <AppText>
          Already have an account?{" "}
          <Text
            style={tw`underline text-yellow-500 font-bold`}
            onPress={() => navigation.navigate("Login")}
          >
            Login!
          </Text>
        </AppText>
      </Text>
    </ViewCenter>
  );
};

export default Signup;
