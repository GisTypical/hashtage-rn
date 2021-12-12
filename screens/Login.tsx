import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/core";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { useMutation } from "react-query";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import { AuthContext } from "../components/providers/AuthProvider";
import Title from "../components/Title";
import ViewCenter from "../components/ViewCenter";
import { login } from "../utils/Auth";
import { LoginSchema } from "../utils/Schema";
import tw from "../utils/tailwind";
import { Message, User } from "../utils/types";

interface Props {
  navigation: NavigationProp<any>;
}

const Login = ({ navigation }: Props) => {
  const { handleLogin } = useContext(AuthContext);

  const mutation = useMutation((user: User) => login(user), {
    // On on login success
    onSuccess: async ({ data }: { data: Message }) => {
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
      handleLogin(data.accessToken);
    },
  });

  return (
    <ViewCenter>
      <Title text="Login"></Title>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        // On user submit
        onSubmit={(values) => {
          Keyboard.dismiss();
          mutation.mutate(values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View
            style={tw`bg-gray-100 rounded-lg w-2/3 h-64 justify-between px-5 py-6 mt-4`}
          >
            <View>
              <AppText mb={true}>
                <Text style={tw`font-bold text-base`}>Username</Text>
              </AppText>
              {errors.username && touched.username ? (
                <AppText mb={true}>
                  <Text style={tw`text-red-500`}>{errors.username}</Text>
                </AppText>
              ) : null}
              <TextInput
                placeholder="e. g. johndoe"
                style={tw`px-2 py-1 bg-gray-200 rounded-lg font-sans`}
                value={values.username}
                onChangeText={handleChange("username")}
              ></TextInput>
            </View>

            <View>
              <AppText mb={true}>
                <Text style={tw`font-bold text-base`}>Password</Text>
                {errors.password && touched.password ? (
                  <Text style={tw`text-red-500`}>{errors.password}</Text>
                ) : null}
              </AppText>
              <TextInput
                style={tw`px-2 py-1 bg-gray-200 rounded-lg font-sans`}
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
              ></TextInput>
            </View>

            {mutation.isError ? (
              <View
                style={tw`bg-red-100 border border-red-500 py-1 rounded-lg`}
              >
                <Text style={tw`text-center text-red-500`}>
                  <AppText>Wrong user or password</AppText>
                </Text>
              </View>
            ) : null}
            <YellowButton
              text={mutation.isLoading ? "Please wait..." : "Login"}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <View style={tw`mt-3`}>
        <AppText>
          <Text>
            Dont have an account?{" "}
            <Text
              style={tw`underline text-yellow-500 font-bold`}
              onPress={() => navigation.navigate("Signup")}
            >
              Signup!
            </Text>
          </Text>
        </AppText>
      </View>
    </ViewCenter>
  );
};

export default Login;
