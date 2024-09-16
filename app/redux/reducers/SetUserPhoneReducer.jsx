import AsyncStorage from '@react-native-async-storage/async-storage';

const UserPhoneNumber = "99"
// try {
//   token = AsyncStorage.getItem('BuyKeys:' + 'Token');
//   // console.log("reducer >> token", token);
// } catch (error) {
//   // console.log(error)
// }

const initialState = {
  UserPhoneNumber: UserPhoneNumber || "",
};



const SetUserPhoneReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_USER_PHONE":

      return {
        ...state,
        UserPhoneNumber: action.UserPhoneNumber,
      };
    default:
      return state;
  }
};

export default SetUserPhoneReducer;








