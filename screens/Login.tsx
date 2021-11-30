import { Formik } from "formik";
import React from "react";
import { Text, TextInput } from "react-native";
import ViewCenter from "../components/ViewCenter";

const Login = () => {
  return (
    <ViewCenter>
      <Text>Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {(props) => {
          <TextInput></TextInput>;
        }}
      </Formik>
    </ViewCenter>
  );
};

export default Login;
