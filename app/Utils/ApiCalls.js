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


// Register API
export const UserRegisterOTPApi = async (registerFormReq) => {

  return await axios.post(`${GUEST_URL}/api/register`, registerFormReq)
}


// Verify OTP API
export const verifyOTPAPI = async (email, values) => {
  const ReqData = {
    userEmail: email,
    sentOtp: values.otp,
  }

  console.log(">>",ReqData)
  return await axios.post(`${GUEST_URL}/api/verifyOtp`, ReqData)

}

// CREATE PASSWORD
export const createPasswordAPI = async (userEmail,values) => {

  // console.log(">> <",userEmail,values)

const appReqData={
  userEmail:userEmail,
  password:values.confirmPassword
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

export const getSingleProgramAPI = async (programId,token) => {
  console.log("API Caller>",programId,token)

  return await axios.get(`${GUEST_URL}api/getProgramById?programId=66a77dee0f906700a0547525`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
