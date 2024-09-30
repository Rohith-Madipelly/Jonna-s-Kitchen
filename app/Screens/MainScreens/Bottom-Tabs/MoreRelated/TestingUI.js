import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native';
import ImagePreviewerModel from '../../../../Components/UI/ImagePreviewer';


const TestingUI = () => {

    // meal plate
    const [PreViewerModel, setPreViewerModel] = useState(false);


    const showAlertPreViewerModel = () => {
      setPreViewerModel(true);
      // onClose()
    };
    const closeAlertPreViewerModel = () => {
      setPreViewerModel(false);
    };
  
    const onSubmitPreViewerModel = () => {
      setPreViewerModel(false);
      onClose()
    };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TestingUI</Text>
      <Button title='Click' onPress={showAlertPreViewerModel}></Button>
      <ImagePreviewerModel
        visible={PreViewerModel}
        title="Image Previewer"
        data="Something went wrong!"
        onClose={closeAlertPreViewerModel}
        onSubmit={onSubmitPreViewerModel}
      />
    </View>
  )
}

export default TestingUI

const styles = StyleSheet.create({})