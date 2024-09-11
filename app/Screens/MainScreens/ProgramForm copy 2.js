import { Button, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { RegisterYupSchema } from "../../FormikYupSchema/RegisterYupSchema";
import CustomTextInput3 from "../../Components/UI/Inputs/CustomTextInput3";
import CustomButton1 from "../../Components/UI/Buttons/CustomButton1";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomDropdown from "../../Components/UI/Inputs/CustomDropdown";
import CustomDateTimePicker from "../../Components/UI/Inputs/CustomDateTimePicker";



const ProgramForm = ({ route }) => {
    const { params } = route;
    const programId = params?.programId || 'nana';
    const programPrice = params?.programPrice || 'nana';
    // console.log("programId > program Form", programId, programPrice)
    // console.log(programPrice)

    const [errorFormAPI, seterrorFormAPI] = useState("")

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
            userName: "", phoneNumber: "", email: "", age: "", gender: "", userHeight: "", userWeight: "", maritalStatus: "", personType: "", meal: "",
            PhysicalActivity: "", programId: "", programFee: ""
        },

        onSubmit: values => {
            { submitHandler(values) }
        },

        // validationSchema: LoginYupSchema,
        validationSchema: RegisterYupSchema,

        validate: values => {
            const errors = {};
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

    const submitHandler = (values) => {
        console.log("VerificationCode>> to ", values)
    }

    return (
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




                                {/* Slot Date */}
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

                                        }}>Slot Date</Text>
                                    </View>


                                    <View style={{ flex: 0.6 }}>

                                    <CustomDateTimePicker
                                            boxWidth={'100%'}
                                            handleChange={(e) => { handleChange("slotDate")(e); }}

                                            borderColor={`${(errors.slotDate && touched.slotDate) || (errorFormAPI && errorFormAPI.slotDateForm) ? "red" : "#ccc"}`}
                                            errorMessavailableSlots={`${(errors.slotDate && touched.slotDate) ? `${errors.slotDate}` : (errorFormAPI && errorFormAPI.slotDateForm) ? `${errorFormAPI.slotDateForm}` : ``}`}

                                        />
                                        {/* <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your slot date'}
                                            // label={'slotData'}
                                            name='slotData'
                                            value={values.slotData}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("slotData")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("slotData")}
                                            validate={handleBlur("slotData")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.slotData && touched.slotData) || (errorFormAPI && errorFormAPI.slotDataForm) ? "red" : "#ccc"}`}
                                            errorMessslotData={`${(errors.slotData && touched.slotData) ? `${errors.slotData}` : (errorFormAPI && errorFormAPI.slotDataForm) ? `${errorFormAPI.slotDataForm}` : ``}`}
                                        // errorColor='mslotDatanta'
                                        /> */}
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
                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your available slots'}
                                            // label={'availableSlots'}
                                            name='availableSlots'
                                            value={values.availableSlots}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("availableSlots")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("availableSlots")}
                                            validate={handleBlur("availableSlots")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.availableSlots && touched.availableSlots) || (errorFormAPI && errorFormAPI.availableSlotsForm) ? "red" : "#ccc"}`}
                                            errorMessavailableSlots={`${(errors.availableSlots && touched.availableSlots) ? `${errors.availableSlots}` : (errorFormAPI && errorFormAPI.availableSlotsForm) ? `${errorFormAPI.availableSlotsForm}` : ``}`}
                                        // errorColor='mavailableSlotsnta'
                                        />
                                    </View>

                                </View>


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