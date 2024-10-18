import * as Yup from "yup";


const LoginYupSchema = Yup.object().shape({

    userEmail: Yup.string()
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .test(
      "valid-domain",
      "Please enter a valid email address",
      (value) => {
        const domainCheck = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/; // Extended to 2-63 characters
        return domainCheck.test(value?.split('@')[1] || '');
      }
    )
    .test(
      "single-tld",
      "Please provide a valid email address",
      (value) => {
        return !/\.[a-zA-Z]{2,}\./.test(value?.split('@')[1] || '');
      }
    )
    .test(
      "no-double-dots",
      "Email address cannot contain consecutive dots",
      (value) => {
        return /^(?!.*\.\.)([a-zA-Z0-9._%+-]+)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value || '');
      }
    )
    .required("Email is required"),

  fcmToken: Yup.string().nullable(),
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