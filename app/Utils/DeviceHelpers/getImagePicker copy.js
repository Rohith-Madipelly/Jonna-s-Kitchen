import * as ImagePicker from 'expo-image-picker';

export const getImagePicker = async () => {

    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
        Alert.alert('Permission required', 'Please allow permission to access your media library');
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!pickerResult.canceled) {
        // return pickerResult.assets[0].uri;
        return pickerResult.assets[0];
    }
};