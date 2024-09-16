import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../../../Components/UI/Inputs/CustomTextInput';
import { useFormik } from 'formik';
import { ReviewYupSchema } from '../../../../FormikYupSchema/ReviewYupSchema';
import { useDispatch, useSelector } from 'react-redux';
import Loader1 from '../../../../Utils/Loader1';
import { CREATE_FEEDBACK_API } from '../../../../Utils/ApiCalls';
import { ServerTokenError_Logout } from '../../../../Utils/ServerError';

const StarRating = () => {

    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [rating, setRating] = useState(0); // Current rating
    // const [isModalVisible, setModalVisible] = useState(false); // Modal visibility
    const [isModalVisible, setModalVisible] = useState(true); // Modal visibility
    const navigation = useNavigation()
    let userName = useSelector((state) => state.SetUserName.userName);

const dispatch=useDispatch()

    const [spinnerBool, setSpinnerbool] = useState(false)

    let tokenn = useSelector((state) => state.login.token)


    const { handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        isValid,
        setValues,
        resetForm,
    } = useFormik({
        initialValues: { description: "", },

        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: ReviewYupSchema,

        validate: values => {
            const errors = {};
            return errors;
        },

    });


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const APICaller = async (data) => {
        setSpinnerbool(true)
        try {
            const res = await CREATE_FEEDBACK_API(data, tokenn)

            // toggleModal();
            // Here you can handle the submitted rating (e.g., send it to an API)
            console.log(`Submitted rating: ${rating} stars`);
            setTimeout(() => {
                // CustomToaster(Message)
                toggleModal();
                navigation.goBack()
            }, 1000)
        } catch (error) {
            // console.log(error)
            console.log("dme")
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                }
                else if (error.response.status === 401) {
                    ServerTokenError_Logout(undefined, undefined, dispatch)
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else if (error.response.status === 503) {
                    console.log("Internal Server Error", error.message)
                    Alert.alert("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.>>", error.message)
                    Alert.alert("An error occurred response", error.message)

                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
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

    const submitRating = async () => {
        console.log(rating, "d", values.description,)
        if (rating > 0) {
            const data = {
                email: "madipellyrohith@gmail.com",
                name: userName,
                description: values.description,
                stars: rating

            }

            APICaller(data)

        }
        else {
            Alert.alert("Please rate your experience by clicking on star")
        }

    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Ionicons
                        name={i <= rating ? "star" : "star-outline"}
                        size={40}
                        color={i <= rating ? "#FFD700" : "#999"}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };



    useEffect(() => {
        // toggleModal()
    }, [])
    return (
        <>
        <Loader1
          visible={spinnerBool}
        />
  
        <View style={styles.container}>
            {/* <Button title="Give Feedback" onPress={toggleModal} /> */}

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Rate your experience</Text>
                        <View style={styles.starContainer}>{renderStars()}</View>
                        <View style={{ width: '100%' }}>
                            <CustomTextInput
                                boxWidth={'100%'}
                                placeholder={'Describe your experience'}
                                // placeholder={'Write a review'}
                                labelStyle={{ fontWeight: '700', marginBottom: 10 }}
                                name='userReviewer'
                                numLines={3}
                                value={values.description}
                                containerStyle={{ elevation: 10 }}
                                onChangeText={(e) => { handleChange("description")(e); seterrorFormAPI(); }}
                                onBlur={handleBlur("description")}
                                validate={handleBlur("description")}
                                outlined
                                borderColor={`${(errors.description && touched.description) || (errorFormAPI && errorFormAPI.descriptionForm) ? "red" : "#ccc"}`}
                                errorMessage={`${(errors.description && touched.description) ? `${errors.description}` : (errorFormAPI && errorFormAPI.descriptionForm) ? `${errorFormAPI.descriptionForm}` : ``}`}
                            //   // errorColor='magenta'
                            />
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => { navigation.goBack() }}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelText: {
        color: '#dc3545',
        fontSize: 16,
    },
});

export default StarRating;
