import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button, Image, Pressable, Alert } from 'react-native';
import { ModelStylesCss } from './ModelStylesCss';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import LoadingImage from '../Components/UI/ImageConatiners/LoadingImage';
import CustomTextInput3 from '../Components/UI/Inputs/CustomTextInput3';
import { useFormik } from 'formik';
import { ServerError } from '../Utils/ServerError';
import Loader1 from '../Utils/Loader1';
import { UserLoginApi, Meal_Plate_API } from '../Utils/ApiCalls';
import { useSelector } from 'react-redux';
import CustomToaster from '../Utils/CustomToaster';
import ImagePickerBottomSheet from './ImagePickerBottomSheet';
import { UpdateMealPlateYupSchema } from '../FormikYupSchema/UpdateMealPlateYupSchema';

const MealPlateUploadModel = ({ visible, title, message, onClose, onSubmit }) => {

    const [image, setImage] = useState(null);
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [errorFormAPI, seterrorFormAPI] = useState("")



    const removeImage = () => {
        setImage(null);
        handleChange('file')("")
    };


    // formik
    const { handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        isValid,
        setValues,
        setFieldValue,
        resetForm,
    } = useFormik({

        initialValues: {
            file: "",
        },

        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: UpdateMealPlateYupSchema,

        validate: values => {
            const errors = {};
            return errors;
        },

    });



    const openCamera = async (res) => {
        try {
            // const res = await getImagePicker()
            console.log("OpenCamera dhaka vachindhi ante chusuko ega ni skill", res.uri)
            console.log("hjesfhs")
            setFieldValue('file', res);
            // setImage(res); // Save the selected image's URI
        } catch (error) {
            console.log("Error in OpenCamera :getImagePicker() ")
        }
    }

    let token = useSelector((state) => state.login.token)

    // API Call
    const submitHandler = async (values) => {
console.log("SMNVB")
        console.log("NGCVNGdcsvjcvdmhn", values)

        seterrorFormAPI() //Clear's All API errors
        try {
            setSpinnerbool(true)
            const res = await Meal_Plate_API(values, token)

            if (res) {
                console.log("Res >>> 123>>>>>>>>>", res.data, ">>>",)
                // console.log("Res >>> >>>>>>>>>", res.data.presignedUrl ,"")
                onSubmit(res.data.fileName, ``)
                handleChange('file')("")
                CustomToaster(res.data.message)

            }

        } catch (error) {
            console.log(error, "c")
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                    //   seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 401) {
                    //   seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    //   seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 413) {
                    console.log("Hello")
                    Alert.alert("Failed to upload pic ", "413 Request Entity Too Large")
                    //   seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
                }
                else if (error.response.status >= 500) {
                    // console.log("Internal Server Error", error.message)
                    ServerError(undefined, `${error.message}`)
                }
                else {
                    console.log("An error occurred response.>>", error.response)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.", error.request);
                if (error.request.status === 0 && error.request._response.includes('Unable to parse TLS packet header')) {
                    Alert.alert("Server Unreachable", "Please try again later.");
                } else if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please check your internet connection.");
                }
            }
            else {
                console.log("Error in Setting up the Request.", error)
            }

        }
        finally {
            setSpinnerbool(false)
        }
    }

    const bottomSheetRef = useRef(null);
    return (
        <View>

            <Loader1
                visible={spinnerBool}
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
                        <View>
                            <Text style={[ModelStylesCss.alertTitle, { textAlign: 'center' }]}>{title}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                            {!image && (
                                <>
                                    <TouchableOpacity
                                        style={ModelStylesCss.uploadButton2Circle}
                                        onPress={() => {
                                            // openCamera();
                                            bottomSheetRef.current.show()
                                        }}
                                    >
                                        <FontAwesome name="camera" size={24} color="black" />
                                    </TouchableOpacity>
                                </>
                            )}
                            <ImagePickerBottomSheet bottomSheet={bottomSheetRef} setPickerValue={openCamera} />
                            {/* <GetImagePicker bottomSheet={bottomSheetRef} setVLAEDA={(e)=>openCamera(e)}/> */}

                            {`${values.file}` && (
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity onPress={() => { removeImage() }} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>&times;</Text>
                                    </TouchableOpacity>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: `${values.file.uri}` }}
                                        loaderColor="#ff0000"
                                        resizeMode="contain"
                                    />
                                    {/* <TouchableOpacity onPress={removeImage} style={{backgroundColor:'red',padding:5,marginTop:5}}>
                                    <MaterialIcons name="delete" size={24} color="white" />
                                </TouchableOpacity> */}
                                </View>
                            )}

                            {(errors.file && touched.file) ? <Text style={{ color: 'red' }}>{errors.file}</Text> : (errorFormAPI && errorFormAPI.fileForm) ? <Text style={{ color: 'red' }}> {errorFormAPI.fileForm}</Text> : ``}
                        </View>
                        <View style={{ width: '90%', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 25 }}>
                            <TouchableOpacity style={{}} onPress={() => handleSubmit()}>
                                <Text style={{ color: 'skyblue', fontWeight: 700 }}>Upload</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};


export default MealPlateUploadModel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',

        marginVertical: 20,
    },
    closeButton: {
        position: 'absolute',
        top: -10,
        right: 15,
        zIndex: 1,
        backgroundColor: '#ff0000',
        borderRadius: 50,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 250,
        height: 150,
    },
});
