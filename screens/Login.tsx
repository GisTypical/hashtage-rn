import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { useMutation } from "react-query";
import tailwind from "twrnc";
import { AuthContext } from "../components/AuthProvider";
import YellowButton from "../components/buttons/YellowButton";
import ViewCenter from "../components/ViewCenter";
import { login } from "../utils/Auth";
import { LoginSchema } from "../utils/Schema";
import { Message, User } from "../utils/types";

const Login = () => {
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
      <Text style={tailwind`text-lg`}>Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        // On user submit
        onSubmit={(values) => {
          Keyboard.dismiss();
          values.username = values.username.toLowerCase();
          mutation.mutate(values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View
            style={tailwind`bg-gray-100 rounded-lg w-2/3 h-64 justify-between px-5 py-6 mt-4`}
          >
            <View>
              <Text style={tailwind`font-bold text-base`}>Username</Text>
              {errors.username && touched.username ? (
                <Text style={tailwind`text-red-500 mb-1`}>
                  {errors.username}
                </Text>
              ) : null}
              <TextInput
                placeholder="e. g. johndoe"
                style={tailwind`px-2 py-1 bg-gray-200 rounded-lg`}
                value={values.username}
                onChangeText={handleChange("username")}
              ></TextInput>
            </View>

            <View>
              <Text style={tailwind`font-bold mb-1 text-base`}>Password</Text>
              {errors.password && touched.password ? (
                <Text style={tailwind`text-red-500`}>{errors.password}</Text>
              ) : null}
              <TextInput
                style={tailwind`px-2 py-1 bg-gray-200 rounded-lg`}
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
              ></TextInput>
            </View>

            {mutation.isError ? (
              <View
                style={tailwind`bg-red-100 border border-red-500 py-1 rounded-lg`}
              >
                <Text style={tailwind`text-center text-red-500`}>
                  Wrong user or password
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
    </ViewCenter>
  );
};

export default Login;
