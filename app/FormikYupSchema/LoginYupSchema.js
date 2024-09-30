import * as Yup from "yup";


const LoginYupSchema = Yup.object().shape({
  // userEmail: Yup.string().email("Email must be a valid email").test(
  //   "is-valid",
  //   "Email must be a valid email",
  //   (value) =>
  //     Yup.string()
  //       .email()
  //       .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,})$/)
  //       .isValidSync(value) || /^\d{10}$/.test(value)
  // ).required("Email is a Required Field "),

  userEmail: Yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Please enter a valid email")
      .test(
        "single-tld",
        "Email address is required and cannot be empty. Please provide a valid email address",
        (value) => {
          return !/\.[a-zA-Z]{2,}\./.test(value);
        }
      )
      .required("Email is Required"),

  fcmToken: Yup.string(),
  password: Yup.string()
    .min(8, "Password length is short")
    .max(225, "Password length is too Long")
    .required("Password is a required field")

    .test(
      "password-requirements",
      "Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
      (value) => {
        // Password validation logic here (using a regular expression or other methods)
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
      }
    ),
});
export { LoginYupSchema }