import axios from 'axios';


import { GUEST_URL } from '../Enviornment.js'


//Bank API res IFSC Code req Bank Details 
export const Bank_Details_on_IFSC = async (IFSC_CODE) => {
  return await axios.get(`https://ifsc.razorpay.com/${IFSC_CODE}`);
  // return await axios.get(`https://ifsc.razorpay.com/SBIN0021108`);
};



// axios. get('/api/users', {timeout: 5000}) . then(response => { // handle success })

// Login API
export const UserLoginApi = async (loginFormReq) => {
  return await axios.post(`${GUEST_URL}/api/login`, loginFormReq,)
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


//  CreateOder

export const CREATE_USER_API = async (formData, token) => {
  const formData2 = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    formData2.append(key, value);
  }
  
  return await axios.post(`${GUEST_URL}/api/create-razorpay-order`, formData2, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}


export const GET_SLOTS_BY_DATE_API = async (date, token) => {
  console.log(token)
  return await axios.get(`${GUEST_URL}/api/slots/getSlotByDate/${date}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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


// Verify verifyOTPScreenForgotAPI
export const getUserDeatils = async (email, values) => {

  return await axios.post(`${GUEST_URL}/api/verifyforgototp`, ReqData)

}



//  Get getRecipieByKeyWord

export const get_all_recipies_by_category_API = async (token) => {
  return await axios.get(`${GUEST_URL}/api/recipies/getAllRecipiesByCatogry`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}


export const getAllRecipieServiceByKeyWord22 = async (keyWord, token) => {

  try {
    const response = await axios.get(`${GUEST_URL}/api/recipies/getRecipieByKeyWord`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
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



export const GET_ALL_FEEDBACKS = async (token) => {
  return await axios.get(`${GUEST_URL}/api/feedbacks/getAllFeedBacks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}


//  Get All faq's

export const Get_FAQs_API = async (token) => {
  return await axios.get(`${GUEST_URL}/api/faqs/getAllFaqs`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



//  Get All faq's

export const Get_Articles_API = async (token) => {
  return await axios.get(`${GUEST_URL}/api/articles/getAllArticles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// Get_Articles_BY_ID_API
export const Get_Articles_BY_ID_API = async (id,token) => {
  return await axios.get(`${GUEST_URL}/api/articles/getArticleById/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
// Jobs
export const GET_ALL_JOBS = async (token) => {
  return await axios.get(`${GUEST_URL}/api/jobOpenings/getAllJobOpenings`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}



export const GET_ALL_TESTIMONIALS = async (token) => {
  return await axios.get(`${GUEST_URL}/api/testimonials/getAllTestimonials`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}


export const CREATE_FEEDBACK_API = async (data,token) => {
  console.log("Cs",token,data)
  return await axios.get(`${GUEST_URL}/api/feedbacks/createFeedBack`, data,{
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}



export const ABOUT_US_API = async () => {

  return await axios.get(`${GUEST_URL}/api/about/getAllAbout`);
}