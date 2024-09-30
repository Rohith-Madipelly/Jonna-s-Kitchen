import * as Yup from "yup";

const UploadWegPic = Yup.object().shape({

    currentWeight: Yup.string().required("currentWeight is a required Field "),
    weightUnits: Yup.string().required("weightUnits is a required Field "),
    // file: Yup.mixed().required('File is required'),
    file: Yup.mixed().required('File is required')
    // .test(
    //   'fileType',
    //   'Unsupported file format Upload Only pdf format less than 10mb',

    //   // value => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)
    //   value => value && value.mimeType === 'image/jpeg'
    
    // )
    // .test(
    //   'fileSize',
    //   'File too large',
    //   value => value && value.size <= 1024 * 1024 * 1 // 10MB limit
    // ),
});

export { UploadWegPic };


