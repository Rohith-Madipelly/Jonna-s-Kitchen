import { Alert } from "react-native"
import ASO from '../Utils/AsyncStorage_Calls'
import { setToken } from "../redux/actions/loginAction"


export const logoutValidation = async (dispatch) => {


    Alert.alert('Logout', 'Are you sure you want to logout ?',
      [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      {
        text: 'YES', onPress: () => {
          // LogOutHandle()
          // LogOutHandle123(dispatch)
          const token=null
    
          ASO.setTokenJWT("Token", JSON.stringify(token), function (res, status) {
            if (status) {
              // ToasterMessage("success", `Success`, `${Message}`)
              dispatch(setToken(token));
            }
          })
          // navigation.navigate('Decide-navigator')
        }
      }]
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
