import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .lowercase("lowercase"),
  password: Yup.string().min(4, "Too Short!").required("Required"),
});

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .lowercase()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  full_name: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string().min(4, "Too Short!").required("Required"),
});

export const EditUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  full_name: Yup.string().min(4, "Too Short!").required("Required"),
  bio: Yup.string(),
  addres: Yup.string(),
  birthday: Yup.string(),
  password: Yup.string()
    .min(4, "Too Short!")
    .required("Enter the same password or another if you want to change it"),
});
