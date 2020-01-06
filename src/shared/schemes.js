import * as Yup from "yup";

// Yup validation
export const SignupScheme = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
});
