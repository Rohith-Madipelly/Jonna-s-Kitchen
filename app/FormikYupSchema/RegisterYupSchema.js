import * as Yup from "yup";


const RegisterYupSchema = Yup.object().shape({


  userName:Yup.string()
  .required("Full name is a required field")
  .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces, no special characters.')
  .min(3, 'Full name must be at least 3 characters long')
  .max(50, 'Full name cannot be longer than 50 characters')
  .test(
    "no-trailing-spaces",
    "Full name cannot start or end with a space",
    (value) => value && value.trim() === value
  ),

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



    email: Yup.string()
  .matches(
    /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Please enter a valid email address"
  )
  .test(
    "valid-domain",
    "Please enter a valid email address",
    (value) => {
      const domainCheck = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
      // const domainCheck = /^[^\s@]+\.[a-zA-Z]{2,3}$/;
      return domainCheck.test(value?.split('@')[1] || '');
    }
  )
  .test(
    "single-tld",
    "Please provide a valid email address",
    (value) => {
      // Prevent double dots in TLD (like .com.com) but allow subdomains.
      return !/\.[a-zA-Z]{2,}\./.test(value?.split('@')[1] || '');
    }
  )
  .required("Email is required"),


  gender: Yup.string().required("Gender is a required field "),

  userAge: Yup.string()
  .required("Age is a required field")
  .matches(/^[1-4][0-9]$/, "Age must be less than 50"),


  heightUnits:Yup.string(),
  userHeight: Yup.number()
    .typeError('Height must be a number')  // Ensures it's a number
    // .min(50, 'Height must be at least 50 cm')
    // .max(300, 'Height must be less than 300 cm')
    .required('Height is required'),


  weightUnits: Yup.string(),
  currentWeight: Yup.number()
    .typeError('Weight must be a number')  // Ensures it's a valid number
    // .min(30, 'Weight must be at least 30 kg')
    // .max(300, 'Weight must be less than 300 kg')
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
  // slotTime: Yup.string().required("Available Slots is a required Field "),
  programName: Yup.string().required("Program name is a required Field "),
});
export { RegisterYupSchema }