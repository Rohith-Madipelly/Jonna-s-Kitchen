import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const getPackageName = () => {
  let packageName;

  if (Platform.OS === 'android') {
    packageName = Constants.expoConfig?.android?.package;
  } else if (Platform.OS === 'ios') {
    packageName = Constants.expoConfig?.ios?.bundleIdentifier;
  }

  return packageName;
};
