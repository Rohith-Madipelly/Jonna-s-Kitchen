import { Alert, Button, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { RegisterYupSchema } from "../../FormikYupSchema/RegisterYupSchema";
import CustomTextInput3 from "../../Components/UI/Inputs/CustomTextInput3";
import CustomButton1 from "../../Components/UI/Buttons/CustomButton1";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomDropdown from "../../Components/UI/Inputs/CustomDropdown";
import CustomDateTimePicker from "../../Components/UI/Inputs/CustomDateTimePicker";
import { CREATE_USER_API, GET_SLOTS_BY_DATE_API } from "../../Utils/ApiCalls";
import CustomDropdownError from "../../Components/UI/Inputs/CustomDropdownError";
import RazorpayCheckout from "react-native-razorpay";
import { RAZORPAY_KEY } from "../../Enviornment";
import { StatusBar } from "expo-status-bar";
import Loader1 from "../../Utils/Loader1";



const ProgramForm = ({ route }) => {
    const { params } = route;
    const programId = params.programId || 'Error in getting programId';
    const programPricex = params.programPrice || 'Error in getting programPricex';
    const processingFeeData=params.processingFeeData || "Error in getting processingFee"
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [timeSlotArray, setTimeSlotArray] = useState([])
    const navigation = useNavigation();
    const [spinnerBool, setSpinnerbool] = useState(false)

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

        initialValues: {
            userName: "Rohith Madipelly", phoneNumber: "9951072005", email: "madipellyrohith@gmail.com",
            userAge: "22", gender: "", userHeight: "176", currentWeight: "86",
            maritalStatus: "", foodType: "",
            meal: "Chapathi",

            medicalCondition: "",
            otherMedicalCondition:"",
            medication: "Test",
            physicalActivity: "yes",

            address: "Warangal",
            state: "TG",
            programName: params.programNameData,
            programId: params.programId,
            programAmount: params.programPriceData,
            processingFee:`${processingFeeData}`,
            slotDate: "",
            slotTime: "",

        },

        onSubmit: values => {
            { submitHandler(values) }
        },

        // validationSchema: LoginYupSchema,
        validationSchema: RegisterYupSchema,

        validate: values => {
            const errors = {};
            // console.log(values)
            return errors;
        },

    });



    const genderData = [
        { title: 'Male' },
        { title: 'Female' },
        { title: 'Other' },
        // { title: 'Home appliences', image: require('../../../assets/opitionsImages/Categories/Home appliences.png') },
    ]

    maritalStatusData = [
        { title: 'Unmarried' },
        { title: 'Married' },
        { title: 'Divorced' },
        { title: 'Widow' },
        { title: 'Widower ' },
        { title: 'Separated' },
    ];



    healthConditionsData = [
        { title: 'PCOD/PCOS' },
        { title: 'Thyroid (Hyper)' },
        { title: 'Thyroid (Hypo)' },
        { title: 'Diabetes' },
        { title: 'High Cholesterol' },
        { title: 'Fatty Liver' },
        { title: 'Postpartum' },
        { title: 'Lactating Mother (Minimum of 6 months Postpartum)' },
        { title: 'Fertility' },
        { title: 'None' },
        { title: 'Others' },
    ];


    foodPreferenceData = [
        { title: 'Vegetarian' },
        { title: 'Non-Vegetarian' },
        { title: 'Vegan' },
        { title: 'Eggetarian' },
        { title: 'Pescatarian' },   // Eats fish but no other meat
        { title: 'Jain' },          // Follows Jain dietary restrictions (e.g. no root vegetables)
        { title: 'Gluten-Free' },   // Avoids gluten
        { title: 'Keto' },          // Follows a ketogenic diet
        { title: 'Paleo' },         // Follows a paleolithic diet
    ];


    let tokenn = useSelector((state) => state.login.token);


    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
        if (err.response.status === 500) {
            console.log("Internal Server Error", err.message)
        }
    }

    const submitHandler = (values) => {
        console.log("VerificationCode>> to ", values)
        CREATE_USER(values)
    }


    const CREATE_USER = async (values) => {

            try {
                setSpinnerbool(true)
                const res = await CREATE_USER_API(values,tokenn)
                const order=res.data.jonasCreatedOrder;
                if (order) {
                            
                    const options = {
                        key: RAZORPAY_KEY,
                        order_id: order.id,
                        amount: order.amount,
                        name: order.entity,
                        currency: order.currency,
                        description: order.notes.notes_key_1,      
                        prefill: {
                            name: "Test User",
                            email: "madipellyrohith@gmail.com",
                            contact: "9951072023",
                        },
                        notes: {
                            address: "11-24-140,2nd",
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    }
        
                    RazorpayCheckout.open(options)
                        .then((data) => {
                            console.log("Payment >", data)
                            Alert.alert("Payment Done")
                            navigation.navigate("BottomTabScreen")
                        })
                        .catch((error) => {
                            console.log("Error in RazorpayCheckout", error,error.response)
                        })
                }
        
            } catch (error) {
                console.log(error.response)


            }
            finally{
                setSpinnerbool(false)
            }
    }

    

    const getTimeSlotsBydate = async (date) => {
        try {
            setSpinnerbool(true)
            const res = await GET_SLOTS_BY_DATE_API(date, tokenn)
            if (res) {
                console.log(res.data.slotTimeArray)
                setTimeSlotArray(res.data.slotTimeArray)
            }
        } catch (error) {
            console.log(error)
            setTimeSlotArray([])
        }
        finally{
            setSpinnerbool(false)
        }
    }
    return (
        <>

        <StatusBar
          animated={true}
          // backgroundColor="#F7F7F7"
          barStyle={'dark-content'}
        />
  
        <Loader1
          visible={spinnerBool}
        />
  
        <ImageBackground
            source={require('../../assets/Images/Background1.png')} // Replace with the actual path to your image
            style={{
                flex: 1,
                // backgroundColor:'pink'
            }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    <KeyboardAwareScrollView style={{ width: '100%', flex: 1 }}>
                        <View style={{ marginHorizontal: 18 }}>
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Text style={{
                                    fontWeight: '800',
                                    marginBottom: 20,
                                    textTransform: 'none',
                                    fontFamily: 'BalooTamma2-Bold',
                                    fontSize: 20,
                                    color: '#FE7B07'
                                }}>Jonnas Kitchen
                                    <Text style={{ color: '#000000', fontWeight: '600', fontSize: 14 }}> For Healthy Human!</Text>
                                </Text>




                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Enter full name'}
                                    label={'Full name'}
                                    name='userName'
                                    value={values.userName}
                                    onChangeText={(e) => { handleChange("userName")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("userName")}
                                    validate={handleBlur("userName")}
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.userName && touched.userName) || (errorFormAPI && errorFormAPI.userNameForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.userName && touched.userName) ? `${errors.userName}` : (errorFormAPI && errorFormAPI.userNameForm) ? `${errorFormAPI.userNameForm}` : ``}`}
                                // errorColor='magenta'
                                />



                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Enter phone number'}
                                    label={'Phone number'}
                                    name='phoneNumber'
                                    value={values.phoneNumber}
                                    onChangeText={(e) => {
                                        // Remove any non-numeric characters
                                        const numericValue = e.replace(/[^0-9]/g, '');
                                        // Update the state with the numeric value
                                        handleChange("phoneNumber")(numericValue);
                                        seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("phoneNumber")}
                                    validate={handleBlur("phoneNumber")}

                                    keyboardType="numeric"
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    // borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#ccc"}`}
                                    // errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                                    // errorColor='magenta'
                                    borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                                />


                                {/* processingFee */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Processing fee'}
                                    label={'Processing fee'}
                                    name='processingFee'
                                    value={values.processingFee}
                                    onChangeText={(e) => { handleChange("processingFee")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("processingFee")}
                                    validate={handleBlur("processingFee")}
                                    outlined
                                    editable={false}
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.processingFee && touched.processingFee) || (errorFormAPI && errorFormAPI.processingFeeForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.processingFee && touched.processingFee) ? `${errors.processingFee}` : (errorFormAPI && errorFormAPI.processingFeeForm) ? `${errorFormAPI.processingFeeForm}` : ``}`}
                                // errorColor='magenta'
                                />


                                {/* Slot Date */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginBottom: 10, }}>
                                    <View style={{ flex: 0.4, justifyContent: 'center', height: '100%' }}>
                                        {/* <View style={{flex:1}}> */}
                                        <Text style={{
                                            fontWeight: '500',
                                            marginBottom: 4,
                                            textTransform: 'none',
                                            fontFamily: 'BalooTamma2-Bold',
                                            fontSize: 14,
                                            marginLeft: 4

                                        }}>Slot Date</Text>
                                    </View>


                                    <View style={{ flex: 0.6 }}>

                                        <CustomDateTimePicker
                                            boxWidth={'100%'}
                                            handleChange={(e) => {
                                                console.log("heloo", e);
                                                getTimeSlotsBydate(e)
                                                handleChange("slotDate")(e);
                                            }}
                                            // borderColor={`${(errors.slotDate && touched.slotDate) || (errorFormAPI && errorFormAPI.slotDateForm) ? "red" : "#ccc"}`}
                                            // errorMessavailableSlots={`${(errors.slotDate && touched.slotDate) ? `${errors.slotDate}` : (errorFormAPI && errorFormAPI.slotDateForm) ? `${errorFormAPI.slotDateForm}` : ``}`}
                                            borderColor={`${(errors.slotDate && touched.slotDate) || (errorFormAPI && errorFormAPI.slotDateForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.slotDate && touched.slotDate) ? `${errors.slotDate}` : (errorFormAPI && errorFormAPI.slotDateForm) ? `${errorFormAPI.slotDateForm}` : ``}`}
                                        />
                                    </View>
                                </View>



                                {/* Available Slots */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                                    <View style={{ flex: 0.4, justifyContent: 'center', marginBottom: 10 }}>
                                        {/* <View style={{flex:1}}> */}
                                        <Text style={{
                                            fontWeight: '500',
                                            marginBottom: 4,
                                            textTransform: 'none',
                                            fontFamily: 'BalooTamma2-Bold',
                                            fontSize: 14,
                                            marginLeft: 4

                                        }}>Available Slots</Text>
                                    </View>


                                    <View style={{ flex: 0.6 }}>

                                        <CustomDropdownError
                                            boxWidth={'95%'}
                                            // label={"Gender"}
                                            // placeholder={'Select'}
                                            name='slotTime'
                                            DropDownData={timeSlotArray}
                                            // DropDownData={genderData}
                                            DropDownHeigth={50}
                                            value={values.slotTime}
                                            // bgColor='#e1f3f8'
                                            // onChange={setCategoriesData}


                                            onChange={(startTime, endTime) => {
                                                handleChange("slotTime")(`${startTime} - ${endTime}`);
                                                seterrorFormAPI();
                                            }}
                                            outlined
                                            borderColor={`${(errors.slotTime && touched.slotTime) || (errorFormAPI && errorFormAPI.availableSlotsForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.slotTime && touched.slotTime) ? `${errors.slotTime}` : (errorFormAPI && errorFormAPI.availableSlotsForm) ? `${errorFormAPI.availableSlotsForm}` : ``}`}
                                        // errorColor='magenta'
                                        />

                                    </View>
                                </View>
                                {/* <Text>{values.slotTime}</Text> */}


                                <CustomButton1
                                    boxWidth={'100%'}
                                    // onPress={() => { navigation.navigate("BottomTabScreen") }}
                                    onPress={handleSubmit}
                                    textStyling={{ marginBottom: -5 }}
                                    // leftIcon={<Entypo
                                    //   // style={styles.icon}
                                    //   name={'login'} size={18} color={'white'} />}
                                    bgColor={`${!isValid ? "#38B14D" : "#38B14D"}`}
                                    // bgColor={"rgba(220, 142, 128, 0.9)"}
                                    style={{ marginTop: 50, }}>Register Now</CustomButton1>

                                <View style={{ height: 50 }}>

                                </View>
                            </View>
                        </View>
                        {/* </KeyboardAvoidingView> */}
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ImageBackground>
        </>
    )
}

export default ProgramForm

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    ContentBox: {
        flex: 0.7,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',


        paddingTop: 36,
        paddingHorizontal: 17
    }
})