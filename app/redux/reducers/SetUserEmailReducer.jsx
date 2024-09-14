import AsyncStorage from '@react-native-async-storage/async-storage';

const email = "userEmail"
// try {
//   token = AsyncStorage.getItem('BuyKeys:' + 'Token');
//   // console.log("reducer >> token", token);
// } catch (error) {
//   // console.log(error)
// }

const initialState = {
  email: email || "",
};



const SetUserEmailReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_USER_EMAIL":

      return {
        ...state,
        token: action.token,
        isLogin: action.token ? true : false,
      };
    default:
      return state;
  }
};

export default SetUserEmailReducer;








