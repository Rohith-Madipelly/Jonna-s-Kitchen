import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { ModelStylesCss } from '../../ModelsAlerts/ModelStylesCss';
import LoadingImage from './ImageConatiners/LoadingImage';


const ImagePreviewerModel = ({ visible, title, data, onClose,onSubmit }) => {
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

                    <View style={{width:'100%',height:270}}>
                   
                    <LoadingImage
                            source={{ uri: data }}
                            // source={{ uri: 'https://images.unsplash.com/photo-1542378151504-0361b8ec8f93?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                            // style={{ width: 200, height: 200 }}
                            
                            loaderColor="#ff0000"
                        resizeMode="contain"
                        />

                    </View>
                    


                </View>
            </TouchableOpacity>
        </Modal>
    );
};



export default ImagePreviewerModel;
