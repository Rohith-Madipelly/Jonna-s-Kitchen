import AsyncStorage from '@react-native-async-storage/async-storage';

const userEmail = "userEmail"
// try {
//   token = AsyncStorage.getItem('BuyKeys:' + 'Token');
//   // console.log("reducer >> token", token);
// } catch (error) {
//   // console.log(error)
// }

const initialState = {
  userEmail: userEmail || "",
};



const SetUserEmailReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_USER_EMAIL":

      return {
        ...state,
        userEmail: action.userEmail,
      };
    default:
      return state;
  }
};

export default SetUserEmailReducer;








