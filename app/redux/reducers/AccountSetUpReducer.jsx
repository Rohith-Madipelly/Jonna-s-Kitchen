import AsyncStorage from '@react-native-async-storage/async-storage';

const PageCount=""
try {
  // PageCount = AsyncStorage.getItem('BuyKeys:' + 'PageCount');
} catch (error) {
  console.log("Error in AsyncStorage.getItem",error)
}

const initialState = {
  // PageCount: PageCount || null,
  AccountData: PageCount || "",
  isAccountData: PageCount ? true : false,
};



const AccountSetUpReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        AccountData: action,
        isAccountData: action ? true : false,
      };
    default:
      return state;
  }
};

export default AccountSetUpReducer;








