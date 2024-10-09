import * as Yup from "yup";


const UserRegisterYupSchema = Yup.object().shape({

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

  userPhoneNumber: Yup.string()
    .trim()
    .test(
      'valid-start',
      'Mobile number must start with 6, 7, 8, or 9',
      (value) => {
        if (!value) return false; // Handles the case when value is null or undefined.
        return /^[6-9]/.test(value); // Checks if the first digit is 6, 7, 8, or 9.
      }
    )
    .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number")
    .required("Mobile number is a required field"),




    userEmail: Yup.string()
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
    .required("Email is required")
  
  
  


//  userEmail :Yup.string()
//   .test("is-valid-email-or-phone", "Please enter a valid email address.", (value) => {
//     const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Domain limit set between 2-4 characters
//     const noConsecutiveDots = !/(..@|@\.\.|@.*\.\.)/.test(value); // No consecutive dots or special chars in local or domain part
//     const noSpecialStartEnd = !/^[-._@]|[-._@]$/.test(value); // No special characters at start or end
//     const phoneRegex = /^\d{10}$/; // 10-digit phone number

//     return emailRegex.test(value) && noConsecutiveDots && noSpecialStartEnd 
//   })
//   // .required("Email or phone number is required")
//   .email("Email must be a valid email format"),


});
export { UserRegisterYupSchema }