import * as Yup from "yup";


const ReviewYupSchema = Yup.object().shape({
  description: Yup.string().required("Description is a required Field ")
  .max(50, "Please make sure your input is between 1 and 50 characters."),

});
export { ReviewYupSchema }