import * as Yup from "yup";


const UserRegisterYupSchema = Yup.object().shape({
  userName: Yup.string().required("User name is a required field "),
  userPhoneNumber: Yup.string()
    .trim()
    // .matches(phoneRegExp, 'Phone number must start with 6, 7, 8, or 9 and have at least 6 digits')
    .test(
      'valid-start',
      'Mobile number must start with 6, 7, 8, or 9',
      (value) => {
        if (!value) return false; // Handles the case when value is null or undefined.
        return /^[6-9]/.test(value); // Checks if the first digit is 6, 7, 8, or 9.
      }
    )
    .required("Mobile number is a required field")
    .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),


  userEmail: Yup.string().email("Email must be a valid email").test(
    "is-valid",
    "Email must be a valid email",
    (value) =>
      Yup.string()
        .email()
        .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/)
        .isValidSync(value) || /^\d{10}$/.test(value)
  ).required("Email is a Required Field "),





  // const userEmail = Yup.string()
  // .test("is-valid-email-or-phone", "Email or phone number must be valid", (value) => {
  //   const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Domain limit set between 2-4 characters
  //   const noConsecutiveDots = !/(..@|@\.\.|@.*\.\.)/.test(value); // No consecutive dots or special chars in local or domain part
  //   const noSpecialStartEnd = !/^[-._@]|[-._@]$/.test(value); // No special characters at start or end
  //   const phoneRegex = /^\d{10}$/; // 10-digit phone number

  //   return emailRegex.test(value) && noConsecutiveDots && noSpecialStartEnd || phoneRegex.test(value);
  // })
  // .required("Email or phone number is required")
  // .email("Email must be a valid email format");


});
export { UserRegisterYupSchema }