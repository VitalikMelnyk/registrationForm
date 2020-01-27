import * as Yup from "yup";

// Yup validation
export const AccountScheme = Yup.object().shape({
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

export const SurveyScheme = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  city: Yup.string().required("City is required"),
  gender: Yup.string().required("Gender is required")
  // .positive("Age must be a positive number.")
  // .integer("Age must be a integer number.")
});
