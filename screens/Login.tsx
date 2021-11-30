import { Formik } from "formik";
import React, { useContext } from "react";
import { Text, TextInput, View } from "react-native";
import { useMutation } from "react-query";
import tailwind from "twrnc";
import { AuthContext } from "../components/AuthProvider";
import GreenButton from "../components/buttons/GreenButton";
import ViewCenter from "../components/ViewCenter";
import { login } from "../utils/Auth";
import { LoginSchema } from "../utils/Schema";
import { User } from "../utils/types";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);

  const mutation = useMutation((user: User) => login(user), {
    onSuccess: ({ data }: { data: User }) => {
      handleLogin(data.username);
    },
  });

  return (
    <ViewCenter>
      <Text style={tailwind`text-lg`}>Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          values.username = values.username.toLowerCase();
          mutation.mutate(values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View style={tailwind`bg-gray-100 rounded-lg w-2/3 px-5 py-6 mt-4`}>
            <Text style={tailwind`font-bold text-base`}>Username</Text>
            {errors.username && touched.username ? (
              <Text style={tailwind`text-red-500`}>{errors.username}</Text>
            ) : null}
            <TextInput
              placeholder="e. g. johndoe"
              style={tailwind`px-2 py-1 bg-gray-200 rounded-lg mt-1`}
              value={values.username}
              onChangeText={handleChange("username")}
            ></TextInput>

            <Text style={tailwind`font-bold mt-3 text-base`}>Password</Text>
            {errors.password && touched.password ? (
              <Text style={tailwind`text-red-500`}>{errors.password}</Text>
            ) : null}
            <TextInput
              style={tailwind`px-2 py-1 bg-gray-200 rounded-lg mb-3`}
              value={values.password}
              secureTextEntry={true}
              onChangeText={handleChange("password")}
            ></TextInput>

            <GreenButton text="Login" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </ViewCenter>
  );
};

export default Login;
