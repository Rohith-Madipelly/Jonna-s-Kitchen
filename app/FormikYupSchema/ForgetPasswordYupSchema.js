import * as Yup from "yup";


const ForgetPasswordYupSchema = Yup.object().shape({

    userEmail: Yup.string()
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .test(
      "valid-domain",
      "Please enter a valid email address",
      (value) => {
        const domainCheck = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
  
  
  

});
export { ForgetPasswordYupSchema }