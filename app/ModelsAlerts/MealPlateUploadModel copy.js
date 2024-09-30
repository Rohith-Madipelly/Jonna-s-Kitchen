import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { ModelStylesCss } from './ModelStylesCss';

const MealPlateUploadModel = ({ visible, title, message, onClose,onSubmit }) => {
    return (
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

                    <View>
                        <Text style={[ModelStylesCss.alertTitle,{textAlign:'center'}]}>{title}</Text>
                    </View>
                    
                        {/* <Text style={ModelStylesCss.alertMessage}>{message}</Text> */}
                    <View style={{}}>
                        <TouchableOpacity style={ModelStylesCss.uploadButton}>
                            <Text style={ModelStylesCss.TextBtn}>MealPlateUploadModel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[ModelStylesCss.uploadButton, { marginVertical: 20 }]}>
                            <Text style={ModelStylesCss.TextBtn}>Upload meal plate</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={ModelStylesCss.uploadButton}>
              <Text style={ModelStylesCss.TextBtn}>Other</Text>
            </TouchableOpacity> */}
                    </View>
                    <View> 
                        <Button title='ok' onPress={()=>onSubmit()}></Button>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};



export default MealPlateUploadModel;
