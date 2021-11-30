import { Formik } from "formik";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import tailwind from "twrnc";
import GreenButton from "../components/buttons/GreenButton";
import ViewCenter from "../components/ViewCenter";

const Signup = () => {
  return (
    <ViewCenter>
      <Text style={tailwind`text-lg`}>Signup</Text>
      <Formik
        initialValues={{ username: "", fullName: "", password: "" }}
        onSubmit={(values) => {
          values.username = values.username.toLowerCase();
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <View>
            <TextInput
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange("username")}
            ></TextInput>
            <TextInput
              placeholder="Full Name"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
            ></TextInput>
            <TextInput
              placeholder="Password"
              value={values.password}
              secureTextEntry={true}
              onChangeText={handleChange("password")}
            ></TextInput>
            <GreenButton text="Signup" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </ViewCenter>
  );
};

export default Signup;
