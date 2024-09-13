import { Platform, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import * as StoreReview from 'expo-store-review';





// npx expo install expo-linking
// npx expo install expo-store-review



const androidPackageName = 'host.exp.exponent';
const itunesItemId = 982107779;
 
  // Function to open Android Play Store
  export const openAndroidPlayStore = async () => {
    try {
      const url = `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open Play Store');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the Play Store');
    }
  };

  // Function to open iOS App Store
  export const openiOSAppStore = async () => {
    try {
      const url = `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open App Store');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the App Store');
    }
  };

  // Function to open Play Store or App Store directly
  export const openStoreDirectly = async () => {
    try {
      if (Platform.OS === 'android') {
        const url = `market://details?id=${androidPackageName}&showAllReviews=true`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open Play Store directly');
        }
      } else if (Platform.OS === 'ios') {
        const url = `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open App Store directly');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the store directly');
    }
  };

  // Function to request in-app review
  export const RequestInAppReview = async () => {
    try {
      if (await StoreReview.isAvailableAsync()) {
        await StoreReview.requestReview();
      } else {
        Alert.alert('Error', 'In-app review not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while requesting the in-app review');
    }
  };