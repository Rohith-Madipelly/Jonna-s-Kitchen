import * as ImagePicker from 'expo-image-picker';
import { BottomSheet } from 'react-native-sheet';
import Metrics from '../ResposivesUtils/Metrics';
import { Pressable, Text, View } from 'react-native';
import { Feather, Fontisto } from '@expo/vector-icons';

export const GetImagePicker =({bottomSheet,setVLAEDA}) => {


  const OpenGallery=async()=>{
    console.log("Open OpenGallery")
    
    bottomSheet.current.hide();
    
    }
    
    
    const OpenCamera=async()=>{
      bottomSheet.current.hide();
      console.log("OpenCamera")
      setVLAEDA(await OpenDeviceCamera())
    }
    
return (
    <BottomSheet height={Metrics.rfv(200)} ref={bottomSheet}>
    <View style={{
      marginHorizontal: Metrics.rfv(15),
      marginVertical: Metrics.rfv(15)
    }}>
      <Text style={{textAlign:'center',fontSize:18,marginBottom:10,fontWeight:600 }}>Select photo</Text>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
        <Pressable onPress={() => {
           OpenCamera();
          // bottomSheet.current.hide()
        }} style={{
          borderRadius: 10, borderColor: "black", borderWidth: 2,
          padding: Metrics.rfv(15),
          flex:0.3,
          justifyContent:'center',alignItems:'center'
        }}>
          <Feather name="camera" size={24} color="black" />
          <Text  style={{marginTop:Metrics.rfv(3)}}>Camera</Text>
        </Pressable>


        <Pressable onPress={() => {
          OpenGallery();
          // bottomSheet.current.hide();
        }} style={{
          borderRadius: 10, borderColor: "black", borderWidth: 2,
          padding: Metrics.rfv(15),
          flex:0.3,
          justifyContent:'center',alignItems:'center'
        }}>
          <Fontisto name="photograph" size={26} color="black" />
          <Text style={{marginTop:Metrics.rfv(3)}}>Gallery</Text>
        </Pressable>
      </View>
    </View>
  </BottomSheet>
)
};




export const OpenDeviceCamera = async () => {
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
}