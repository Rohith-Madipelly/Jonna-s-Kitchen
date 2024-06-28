import { Alert } from "react-native"

export const logoutValidation = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?',
      [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      {
        text: 'YES', onPress: () => {
          // LogOutHandle()
        //   LogOutHandle123(dispatch)
          // navigation.navigate('Decide-navigator')
        }
      }]
    )
  }