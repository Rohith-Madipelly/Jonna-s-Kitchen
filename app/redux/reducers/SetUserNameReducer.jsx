import AsyncStorage from '@react-native-async-storage/async-storage';

const userName = "UserName"
// try {
//   token = AsyncStorage.getItem('BuyKeys:' + 'Token');
//   // console.log("reducer >> token", token);
// } catch (error) {
//   // console.log(error)
// }

const initialState = {
  userName: userName || "",
};



const SetUserNameReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_USER_NAME":

      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
};

export default SetUserNameReducer;








