import * as Yup from "yup";


const PasswordYupSchema = Yup.object().shape({

  password: Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+$/,
    "Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",

  )
  .max(15, 'Password should not be more than 15 characters')
  .required('New password is required'),

  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .min(8, 'confirm password must be at least 8 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[^\w\d\s]).+$/,
  "confirm password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
    
  )
  .max(15, 'Password should not be more than 15 characters')
  .required('New password is required'),

});
export { PasswordYupSchema }


