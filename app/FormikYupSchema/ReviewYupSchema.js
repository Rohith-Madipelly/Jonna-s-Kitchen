import * as Yup from "yup";


const ReviewYupSchema = Yup.object().shape({
  description: Yup.string().required("Description is a required Field ")
  .min(2, "Please make sure your input is between 2 and 100 characters.")
  .max(100, "Please make sure your input is between 2 and 100 characters."),

});
export { ReviewYupSchema }