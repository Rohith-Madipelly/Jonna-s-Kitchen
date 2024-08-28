import axios from 'axios';


import { GUEST_URL } from '../Enviornment.js'


//Bank API res IFSC Code req Bank Details 
export const Bank_Details_on_IFSC = async (IFSC_CODE) => {
  return await axios.get(`https://ifsc.razorpay.com/${IFSC_CODE}`);
  // return await axios.get(`https://ifsc.razorpay.com/SBIN0021108`);
};


// Login API
export const UserLoginApi = async (loginFormReq) => {
  return await axios.post(`${GUEST_URL}/api/login`, loginFormReq, { timeout: 5000 })
}



// UserForgotPassword API
export const UserForgotPassword = async (FormReq) => {
  console.log("to APi UserForgotPassword", FormReq)

  return await axios.post(`${GUEST_URL}/api/forgotPassword`, FormReq)
}


// Verify verifyOTPScreenForgotAPI
export const verifyOTPScreenForgotAPI = async (email, values) => {
  const ReqData = {
    userEmail: email,
    forgotOtp: values.otp,
  }

  console.log(">>>>>", ReqData)

  return await axios.post(`${GUEST_URL}/api/verifyforgototp`, ReqData)

}



// Register API
export const UserRegisterOTPApi = async (registerFormReq) => {
  console.log("to APi >", registerFormReq)

  return await axios.post(`${GUEST_URL}/api/register`, registerFormReq)
}


// Verify OTP API
export const verifyOTPAPI = async (email, values) => {
  const ReqData = {
    userEmail: email,
    sentOtp: values.otp,
  }
  return await axios.post(`${GUEST_URL}/api/verifyOtp`, ReqData)

}

// CREATE PASSWORD
export const createPasswordAPI = async (userEmail, values) => {
  const appReqData = {
    userEmail: userEmail,
    password: values.confirmPassword
  }
  return await axios.post(`${GUEST_URL}/api/setPassword`, appReqData)
}




//  Get All Programs

export const GetAllProgramsAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/api/getAllPrograms`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}




//  Get singleProgram

export const getSingleProgramAPI = async (programId, token) => {
  console.log("API Caller>", programId, token)

  return await axios.get(`${GUEST_URL}/api/getProgramById/${programId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}





//  Get getRecipieByKeyWord

export const get_all_recipies_by_category_API = async (token) => {
  return await axios.get(`${GUEST_URL}/api/recipies/getAllRecipiesByCatogry`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}


export const getAllRecipieServiceByKeyWord22 = async (keyWord,token) => {

  try {
    const response = await axios.get(`${GUEST_URL}/api/recipies/getRecipieByKeyWord`,
      {
      
        headers: {
          Authorization: `Bearer ${token}`
        },
        params:{
          keyWord: keyWord
        },
      }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    throw error;
  }

}



export const GET_ALL_FEEDBACKS=async(token)=>{
  return await axios.get(`${GUEST_URL}/api/feedbacks/getAllFeedBacks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}




export const GET_ALL_JOBS=async(token)=>{
  return await axios.get(`${GUEST_URL}/api/jobOpenings/getAllJobOpenings`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}



export const GET_ALL_TESTIMONIALS=async(token)=>{
  return await axios.get(`${GUEST_URL}/api/testimonials/getAllTestimonials`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}