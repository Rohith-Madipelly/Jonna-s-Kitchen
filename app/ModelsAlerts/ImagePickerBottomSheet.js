import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomSheet } from 'react-native-sheet'
import Metrics from '../Utils/ResposivesUtils/Metrics'
import { OpenDeviceCameraImagePicker, OpenDeviceGalleryImagePicker } from '../Utils/DeviceHelpers/DeviceHelpersImages'
import { Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';
const ImagePickerBottomSheet = ({bottomSheet,setPickerValue}) => {

  const OpenGallery = async () => {
    // console.log("Opening OpenGallery")
    const GalleryData = await OpenDeviceGalleryImagePicker()
    console.log(GalleryData)
    setPickerValue(GalleryData)

    // setTimeout(()=>{
    await bottomSheet.current.hide();
    // },200)

  }


  const OpenCamera = async () => {
    // console.log("Opening OpenCamera")
    const CameraData = await OpenDeviceCameraImagePicker()
    console.log(CameraData)
    setPickerValue(CameraData)

    // setTimeout(()=>{
    await bottomSheet.current.hide();
    // },200)
  }



  return (
    <View>
      <BottomSheet height={Metrics.rfv(200)} ref={bottomSheet}>
        <View style={{
          marginHorizontal: Metrics.rfv(15),
          marginVertical: Metrics.rfv(15)
        }}>
          <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10, fontWeight: 600 }}>Select photo</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
            <Pressable onPress={() => {
              OpenCamera();
              // bottomSheet.current.hide()
            }} style={{
              borderRadius: 10, borderColor: "black", borderWidth: 2,
              padding: Metrics.rfv(15),
              flex: 0.3,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <Feather name="camera" size={24} color="black" />
              <Text style={{ marginTop: Metrics.rfv(3) }}>Camera</Text>
            </Pressable>


            <Pressable onPress={() => {
              OpenGallery();
              // bottomSheet.current.hide();
            }} style={{
              borderRadius: 10, borderColor: "black", borderWidth: 2,
              padding: Metrics.rfv(15),
              flex: 0.3,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <Fontisto name="photograph" size={26} color="black" />
              <Text style={{ marginTop: Metrics.rfv(3) }}>Gallery</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

export default ImagePickerBottomSheet

const styles = StyleSheet.create({})