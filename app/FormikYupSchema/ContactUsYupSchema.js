import * as Yup from "yup";


const ContactUsYupSchema = Yup.object().shape({
  issue: Yup.string().required("Issue is a Required Field "),
  description: Yup.string()
    .required("Description is a required field")
});
export { ContactUsYupSchema }