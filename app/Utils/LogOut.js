import { Alert } from "react-native"
import ASO from '../Utils/AsyncStorage_Calls'
import { setToken } from "../redux/actions/loginAction"
import AsyncStorage_Calls from "../Utils/AsyncStorage_Calls"

export const logoutValidation = async (dispatch) => {


  Alert.alert('Logout', 'Are you sure you want to logout ?',
    [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    {
      text: 'YES', onPress: () => {
        try {
          AsyncStorage_Calls.RemoveTokenJWT('Token', (error, success) => {
            if (error) {
              console.error('Error removing token:', error);
            } else {
              console.log('Token removed successfully:', success);
              dispatch(setToken(null));
              // You can add additional logic here after the token has been successfully removed
            }
          });
        } catch (e) {
          console.log("error", e);
        }
      }
    }],
    { cancelable: false }
  )
}


//   import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';
// import { setToken } from "../redux/actions/loginAction";
// import { setAccountPage } from '../redux/actions/AccountSetUpAction';

// export const LogOutHandle = async (dispatch) => {
//   Alert.alert(
//     "Confirm Logout",
//     "Are you sure you want to log out?",
//     [
//       {
//         text: "Cancel",
//         style: "cancel"
//       },
//       {
//         text: "OK",
//         onPress: async () => {
//           try {
//             await AsyncStorage.removeItem('BuyKeys$:' + 'Token');
//             dispatch(setToken(null));
//             try {
//               await AsyncStorage.removeItem('BuyKeys$:' + 'pageNumber');
//               dispatch(setAccountPage(null));
//             } catch (e) {
//               console.log("error in pageNumber Remover", e);
//             }
//           } catch (e) {
//             console.log("error", e);
//           }
//         }
//       }
//     ],
//     { cancelable: false }
//   );
// }
