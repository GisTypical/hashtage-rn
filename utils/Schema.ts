import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .lowercase()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string().min(4, "Too Short!").required("Required"),
});

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .lowercase()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  fullName: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string().min(4, "Too Short!").required("Required"),
});
