import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WeightUploadModel from './WeightUploadModel';
import MealPlateUploadModel from './MealPlateUploadModel';
import { ModelStylesCss } from './ModelStylesCss';

const UploadModel = ({ visible, title, message, onClose, onSubmit }) => {

  // meal plate
  const [mealPlateModelVisible, setMealPlateModelVisible] = useState(false);
  const showAlertMealPlateModel = () => {
    setMealPlateModelVisible(true);
    // onClose()
  };
  const closeAlertMealPlateModel = () => {
    setMealPlateModelVisible(false);
  };

  const onSubmitMealPlateModel = (e) => {
    setMealPlateModelVisible(false);
    console.log("onSubmitMealPlateModel >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" ,e)
    returnTOChat(e,"","MealPlate")
    onClose()
  };



  // weight model
  const [weightModelVisible, setWeightModelVisible] = useState(false);
  const showAlertWeightModel = () => {
    setWeightModelVisible(true);
    // onClose()
  };
  const closeAlertWeightModel = () => {
    setWeightModelVisible(false);
  };


  const onSubmitWeightModel = (e,weight) => {
    console.log("dd>>>",e,weight)

    returnTOChat(e,weight,"weight")
    setWeightModelVisible(false);
    onClose()
  };

  const returnTOChat=(e,weightData,typeofUpload)=>{
    console.log("s",e,weightData,typeofUpload)
    onSubmit(e,weightData,typeofUpload)
  }

  return (
    <View style={{}}>

      <WeightUploadModel
        visible={weightModelVisible}
        title="Upload Your weight pic and enter the weight"
        message="Something went wrong!"
        onClose={closeAlertWeightModel}
        onSubmit={onSubmitWeightModel}
      />



      <MealPlateUploadModel
        visible={mealPlateModelVisible}
        title="Upload Your Meal Plate and food name"
        message="Something went wrong!"
        onClose={closeAlertMealPlateModel}
        onSubmit={onSubmitMealPlateModel}
      />
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity style={ModelStylesCss.modalBackground} onPress={onClose} activeOpacity={1}>
          <View style={ModelStylesCss.alertContainer} onStartShouldSetResponder={() => true}>
            <TouchableOpacity onPress={onClose} style={ModelStylesCss.closeButton}>
              <Text style={ModelStylesCss.closeButtonText}>&times;</Text>
            </TouchableOpacity>

            {/* Modal content */}
            <View style={{}}>
              <TouchableOpacity style={ModelStylesCss.uploadButton} onPress={() => { showAlertWeightModel() }}>
                <Text style={ModelStylesCss.TextBtn}>Upload weight</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[ModelStylesCss.uploadButton, { marginVertical: 20 }]} onPress={() => { showAlertMealPlateModel() }}>
                <Text style={ModelStylesCss.TextBtn}>Upload meal plate</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={ModelStylesCss.uploadButton} onPress={()=>{onClickHandler("Upload weight")}}>
              <Text style={ModelStylesCss.TextBtn}>Other</Text>
            </TouchableOpacity> */}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
};

// const ModelStylesCss = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   alertContainer: {
//     width: 300,
//     padding: 20,
//     // backgroundColor: '#fff',
//     backgroundColor: '#fff',

//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: -5,
//     right: 5,
//     padding: 5,
//     zIndex: 1,

//   },
//   closeButtonText: {
//     fontSize: 24,
//     color: 'black',

//   },
//   alertTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   alertMessage: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   uploadButton: {
//     width: 140,
//     height: 70,
//     backgroundColor: '#2D2D2D',
//     // backgroundColor: '#FFDEC08C',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   TextBtn: {
//     color: 'white', fontWeight: '700'
//   }
// });

export default UploadModel;
