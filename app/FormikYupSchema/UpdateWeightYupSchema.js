import * as Yup from "yup";


const UpdateWeightYupSchema = Yup.object().shape({

  file: Yup.mixed().required('File is required')
    .test(
      'fileType',
      'Unsupported file format Upload Only pdf format less than 10mb',

      // value => {
      //   console.log("S",['image/jpeg', 'image/png'].includes(value.mimeType))
      //   value && ['image/jpeg', 'image/png'].includes(value.mimeType)
      // }

      value => value && value.type == 'image'
    )
    .test(
      'fileSize',
      'File too large',
      value => {
        console.log(value.fileSize)
        return value && value.fileSize <= 1024 * 1024 * 10// 10MB limit
      }
    ),




  weightUnits: Yup.string(),
  currentWeight: Yup.number()
    .typeError('Weight must be a number')
    .required('Weight is required'),
});
export { UpdateWeightYupSchema }