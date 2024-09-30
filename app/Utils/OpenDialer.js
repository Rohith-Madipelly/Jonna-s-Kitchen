import { Alert, Linking } from "react-native";

export const OpenDialer = (phoneNumber) => {
    let phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        console.log(supported)
        // if (supported) {
          return Linking.openURL(phoneUrl);
        // } else {
        //   Alert.alert('Error', 'Phone dialer is not available');
        // }
      })
      .catch((err) => Alert.alert('Error', err.message));
  };