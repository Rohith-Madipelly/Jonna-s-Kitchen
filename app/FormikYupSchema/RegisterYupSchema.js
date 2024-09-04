import * as Yup from "yup";


const RegisterYupSchema = Yup.object().shape({


  userName: Yup.string().required("User Name is a required field "),


 
  phoneNumber: Yup.string()
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





  email: Yup.string().email("Email must be a valid email").test(
    "is-valid",
    "Email must be a valid email",
    (value) =>
      Yup.string()
        .email()
        .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,})$/)
        .isValidSync(value) || /^\d{10}$/.test(value)
  ).required("Email is a required Field "),


  // age:Yup.string().required("Age is a required Field "),
  // gender:Yup.string().required("Gender is a required Field "),
  // height:Yup.string().required("Height is a required Field "),
  // userHeight:Yup.string().required("Current Weight is a required Field "),
  // maritalStatus:Yup.string().required("maritalStatus is a required Field "),
  // personType:Yup.string().required("Veg or Non-veg is a required Field "),
  // meal:Yup.string().required("meal is a required Field "),

  // medication:Yup.string().required("medication is a required Field "),
 
 
  // PhysicalActivity:Yup.string().required("PhysicalActivity is a required Field "),
  // programId:Yup.string().required("program is a required Field "),
  // programFee:Yup.string().required("programFee is a required Field "),

});
export { RegisterYupSchema }