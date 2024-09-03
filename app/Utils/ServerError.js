
import { Alert } from 'react-native';
export const ServerError = (title = "Internal Server Error", message) => {
    Alert.alert(title, message)
}

// ServerError(undefined,`${error.message}`)
