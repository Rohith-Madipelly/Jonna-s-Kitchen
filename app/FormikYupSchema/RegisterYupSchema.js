import * as Yup from "yup";


const RegisterYupSchema = Yup.object().shape({


  userName: Yup.string().required("User name is a required field "),

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


  gender: Yup.string().required("Gender is a required Field "),

  userAge: Yup.string().required("Age is a required Field "),

  userHeight: Yup.number()
    .typeError('Height must be a number')  // Ensures it's a number
    .min(50, 'Height must be at least 50 cm')
    .max(300, 'Height must be less than 300 cm')
    .required('Height is required'),


  currentWeight: Yup.number()
    .typeError('Weight must be a number')  // Ensures it's a valid number
    .min(30, 'Weight must be at least 30 kg')
    .max(300, 'Weight must be less than 300 kg')
    .required('Weight is required'),

  maritalStatus: Yup.string().required("Marital status is a required Field "),

  foodType: Yup.string().required("Veg or Non-veg is a required Field "),

  meal: Yup.string().required("Your food is a required Field ")
  // .max(50, "Your food cannot be more than 50 characters"),
  .max(50, "Please make sure your input is between 1 and 50 characters."),

  address: Yup.string().required("Address is a required Field "),

  state: Yup.string().required("State is a required Field "),

  medicalCondition: Yup.string().required("medicalCondition is a required Field ")
  .max(50, "Please make sure your input is between 1 and 50 characters."),

  otherMedicalCondition: Yup.string().required("medicalCondition is a required Field "),

  medication: Yup.string().required("medication is a required Field ")
  .max(50, "Please make sure your input is between 1 and 50 characters."),

  slotDate: Yup.string().required("Slot date is a required Field "),
  physicalActivity: Yup.string().required("Physical activity is a required Field ")
  .max(50, "Please make sure your input is between 1 and 50 characters."),
  programId: Yup.string().required("Program is a required Field "),
  programAmount: Yup.string().required("Program fee is a required Field "),

  processingFee: Yup.string().required("Processing fee is a required Field "),
  slotTime: Yup.string().required("Available Slots is a required Field "),
  programName: Yup.string().required("Program name is a required Field "),
});
export { RegisterYupSchema }