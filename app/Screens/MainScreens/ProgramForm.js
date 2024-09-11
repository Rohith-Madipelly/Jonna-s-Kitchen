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



const ProgramForm = ({ route }) => {
    const { params } = route;
    const programId = params.programId || 'nana';
    const programPricex = params.programPrice || 'nana';
    const processingFeeData = '60'
    console.log("programId > program Form", programId, programPricex)


    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [timeSlotArray, setTimeSlotArray] = useState([])
    const navigation = useNavigation();
   

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
            medication: "Test",
            physicalActivity: "yes",

            address: "Warangal",
            state: "TG",
            programName: params.programNameData,
            programId: params.programId,
            programAmount: params.programPriceData,
            // programAmount:programPricex,
            // processingFeeData
            processingFee: params.processingFeeData,
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
    }

    

    const getTimeSlotsBydate = async (date) => {
        try {
            const res = await GET_SLOTS_BY_DATE_API(date, tokenn)
            if (res) {
                console.log(res.data.slotTimeArray)
                setTimeSlotArray(res.data.slotTimeArray)
            }
        } catch (error) {
            console.log(error)
            setTimeSlotArray([])
        }
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

                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Enter email address'}
                                    label={'Email ID'}
                                    name='email'
                                    value={values.email}
                                    onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("email")(eToLowerCaseText); seterrorFormAPI(); }}
                                    onBlur={handleBlur("email")}
                                    validate={handleBlur("email")}
                                    labelStyle={{ marginBottom: -2 }}
                                    outlined
                                    borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
                                />




                                {/* Age */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', }}>
                                    <View style={{ flex: 0.3, justifyContent: 'center', marginBottom: 10 }}>
                                        {/* <View style={{flex:1}}> */}
                                        <Text style={{
                                            fontWeight: '500',
                                            marginBottom: 4,
                                            textTransform: 'none',
                                            fontFamily: 'BalooTamma2-Bold',
                                            fontSize: 14,
                                            marginLeft: 4

                                        }}>Age</Text>
                                        {/* </View> */}

                                    </View>

                                    <View style={{ flex: 0.7, justifyContent: 'center', }}>
                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your userAge'}
                                            name='userAge'
                                            value={values.userAge}
                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("userAge")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("userAge")}
                                            validate={handleBlur("userAge")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.userAge && touched.userAge) || (errorFormAPI && errorFormAPI.ageForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.userAge && touched.userAge) ? `${errors.userAge}` : (errorFormAPI && errorFormAPI.ageForm) ? `${errorFormAPI.ageForm}` : ``}`}
                                        />
                                    </View>
                                </View>

                                {/* Gender */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                                    <View style={{ flex: 0.3, justifyContent: 'center', marginBottom: 10 }}>
                                        {/* <View style={{flex:1}}> */}
                                        <Text style={{
                                            fontWeight: '500',
                                            marginBottom: 4,
                                            textTransform: 'none',
                                            fontFamily: 'BalooTamma2-Bold',
                                            fontSize: 14,
                                            marginLeft: 4

                                        }}>Gender</Text>
                                        {/* </View> */}

                                    </View>
                                    <View style={{ flex: 0.7 }}>
                                        <CustomDropdown
                                            boxWidth={'95%'}
                                            // label={"Gender"}
                                            // placeholder={'Select'}
                                            name='gender'
                                            DropDownData={genderData}
                                            DropDownHeigth={200}
                                            value={values.gender}
                                            // bgColor='#e1f3f8'
                                            // onChange={setCategoriesData}

                                            onChange={(e) => {
                                                handleChange("gender")(e);
                                                seterrorFormAPI();
                                            }}
                                            outlined
                                            borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
                                        // errorColor='magenta'
                                        />


                                    </View>

                                </View>

                                {/* Height */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                                    <View style={{ flex: 0.3, justifyContent: 'center', marginBottom: 10 }}>
                                        {/* <View style={{flex:1}}> */}
                                        <Text style={{
                                            fontWeight: '500',
                                            marginBottom: 4,
                                            textTransform: 'none',
                                            fontFamily: 'BalooTamma2-Bold',
                                            fontSize: 14,
                                            marginLeft: 4

                                        }}>Height</Text>
                                    </View>

                                    <View style={{ flex: 0.7 }}>
                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your current weight'}
                                            // label={'userHeight'}
                                            name='userHeight'
                                            value={values.userHeight}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("userHeight")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("userHeight")}
                                            validate={handleBlur("userHeight")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.userHeight && touched.userHeight) || (errorFormAPI && errorFormAPI.userHeightForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.userHeight && touched.userHeight) ? `${errors.userHeight}` : (errorFormAPI && errorFormAPI.userHeightForm) ? `${errorFormAPI.userHeightForm}` : ``}`}
                                        // errorColor='muserHeightnta'
                                        />
                                    </View>


                                </View>

                                {/* Current Weight */}
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

                                        }}>Current Weight</Text>
                                    </View>

                                    <View style={{ flex: 0.6 }}>

                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your current weight'}
                                            // label={'currentWeight'}
                                            name='currentWeight'
                                            value={values.currentWeight}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("currentWeight")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("currentWeight")}
                                            validate={handleBlur("currentWeight")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.currentWeight && touched.currentWeight) || (errorFormAPI && errorFormAPI.userWeightForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.currentWeight && touched.currentWeight) ? `${errors.currentWeight}` : (errorFormAPI && errorFormAPI.userWeightForm) ? `${errorFormAPI.userWeightForm}` : ``}`}
                                        // errorColor='muserWeightnta'
                                        />
                                    </View>


                                </View>



                                {/* Marital Status */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                                    <View style={{ flex: 0.4, justifyContent: 'center', marginBottom: 10, }}>
                                        {/* <View style={{flex:1}}> */}
                                        <Text style={{
                                            fontWeight: '500',
                                            marginBottom: 4,
                                            textTransform: 'none',
                                            fontFamily: 'BalooTamma2-Bold',
                                            fontSize: 14,
                                            marginLeft: 4

                                        }}>Marital Status</Text>
                                    </View>


                                    <View style={{ flex: 0.6 }}>
                                        <CustomDropdown
                                            boxWidth={'95%'}
                                            // label={"Gender"}
                                            // placeholder={'Select'}
                                            name='maritalStatus'
                                            DropDownData={maritalStatusData}
                                            DropDownHeigth={200}
                                            value={values.maritalStatus}
                                            // bgColor='#e1f3f8'
                                            // onChange={setCategoriesData}

                                            onChange={(e) => {
                                                handleChange("maritalStatus")(e);
                                                seterrorFormAPI();
                                            }}
                                            outlined
                                            borderColor={`${(errors.maritalStatus && touched.maritalStatus) || (errorFormAPI && errorFormAPI.maritalStatusForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.maritalStatus && touched.maritalStatus) ? `${errors.maritalStatus}` : (errorFormAPI && errorFormAPI.maritalStatusForm) ? `${errorFormAPI.maritalStatusForm}` : ``}`}
                                        // errorColor='magenta'
                                        />

                                    </View>

                                </View>





                                {/* Veg or Non-veg */}
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

                                        }}>Veg or Non-veg</Text>
                                    </View>


                                    <View style={{ flex: 0.6 }}>
                                        <CustomDropdown
                                            boxWidth={'95%'}
                                            // label={"Gender"}
                                            placeholder={'Select'}
                                            name='foodType'
                                            DropDownData={foodPreferenceData}
                                            // foodPreferenceData
                                            DropDownHeigth={200}
                                            value={values.foodType}
                                            // bgColor='#e1f3f8'
                                            // onChange={setCategoriesData}

                                            onChange={(e) => {
                                                handleChange("foodType")(e);
                                                seterrorFormAPI();
                                            }}
                                            outlined
                                            borderColor={`${(errors.foodType && touched.foodType) || (errorFormAPI && errorFormAPI.personTypeForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.foodType && touched.foodType) ? `${errors.foodType}` : (errorFormAPI && errorFormAPI.personTypeForm) ? `${errorFormAPI.personTypeForm}` : ``}`}
                                        // errorColor='magenta'
                                        />


                                    </View>

                                </View>



                                {/* What you eat every day */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'What you eat every day'}
                                    label={'What you eat every day'}
                                    name='meal'
                                    value={values.meal}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("meal")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("meal")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("meal")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.meal && touched.meal) || (errorFormAPI && errorFormAPI.mealForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.meal && touched.meal) ? `${errors.meal}` : (errorFormAPI && errorFormAPI.mealForm) ? `${errorFormAPI.mealForm}` : ``}`}
                                // errorColor='magenta'
                                />



                                <CustomDropdown
                                    boxWidth={'95%'}
                                    label={"Medical conditions"}
                                    placeholder={'Select'}
                                    name='maritalStatus'
                                    DropDownData={healthConditionsData}
                                    DropDownHeigth={200}
                                    value={values.medicalCondition}
                                    // bgColor='#e1f3f8'
                                    // onChange={setCategoriesData}

                                    onChange={(e) => {
                                        handleChange("medicalCondition")(e);
                                        seterrorFormAPI();
                                    }}
                                    outlined
                                    borderColor={`${(errors.medicalCondition && touched.medicalCondition) || (errorFormAPI && errorFormAPI.medicalConditionForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.medicalCondition && touched.medicalCondition) ? `${errors.medicalCondition}` : (errorFormAPI && errorFormAPI.medicalConditionForm) ? `${errorFormAPI.medicalConditionForm}` : ``}`}
                                // errorColor='magenta'
                                />


                                {values.maritalStatus === "Others" ?
                                    <CustomTextInput3
                                        boxWidth={'95%'}
                                        placeholder={'Others medical conditions'}
                                        label={'Others medical conditions'}
                                        name='othermedicalConditions'
                                        // value={values.othermedicalConditions}
                                        // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                        // bgColor='#e1f3f8'
                                        // bgColor="#B1B1B0"

                                        onChangeText={(e) => { handleChange("othermedicalConditions")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("othermedicalConditions")}

                                        // validate={() => {
                                        //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                        //     else { setError({ ...error, first: null }) }
                                        // }}

                                        validate={handleBlur("othermedicalConditions")}

                                        outlined
                                        labelStyle={{ marginBottom: -2 }}

                                        borderColor={`${(errors.othermedicalConditions && touched.othermedicalConditions) || (errorFormAPI && errorFormAPI.othermedicalConditionsForm) ? "red" : "#ccc"}`}

                                        errorMessage={`${(errors.othermedicalConditions && touched.othermedicalConditions) ? `${errors.othermedicalConditions}` : (errorFormAPI && errorFormAPI.othermedicalConditionsForm) ? `${errorFormAPI.othermedicalConditionsForm}` : ``}`}
                                    // errorColor='magenta'
                                    /> : ""}

                                {/* Others Medical Conditions*/}




                                {/* medication */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Medication'}
                                    label={'Medication'}
                                    name='medication'
                                    value={values.medication}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("medication")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("medication")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("medication")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.medication && touched.medication) || (errorFormAPI && errorFormAPI.medicationForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.medication && touched.medication) ? `${errors.medication}` : (errorFormAPI && errorFormAPI.medicationForm) ? `${errorFormAPI.medicationForm}` : ``}`}
                                // errorColor='magenta'
                                />

                                {/* physicalActivity */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Physical activity'}
                                    label={'Physical activity'}
                                    name='physicalActivity'
                                    value={values.physicalActivity}
                                    onChangeText={(e) => { handleChange("physicalActivity")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("physicalActivity")}
                                    validate={handleBlur("physicalActivity")}
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.physicalActivity && touched.physicalActivity) || (errorFormAPI && errorFormAPI.PhysicalActivityForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.physicalActivity && touched.physicalActivity) ? `${errors.physicalActivity}` : (errorFormAPI && errorFormAPI.PhysicalActivityForm) ? `${errorFormAPI.physicalActivityForm}` : ``}`}
                                // errorColor='magenta'
                                />
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'address'}
                                    label={'address'}
                                    name='state'
                                    value={values.address}
                                    onChangeText={(e) => { handleChange("address")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("address")}
                                    validate={handleBlur("address")}
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.address && touched.address) || (errorFormAPI && errorFormAPI.addressForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.address && touched.address) ? `${errors.address}` : (errorFormAPI && errorFormAPI.addressForm) ? `${errorFormAPI.addressForm}` : ``}`}
                                // errorColor='magenta'
                                />


                                {/* state */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Enter  your state'}
                                    label={'State'}
                                    name='state'
                                    value={values.state}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"
                                    onChangeText={(e) => { handleChange("state")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("state")}
                                    validate={handleBlur("state")}
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.state && touched.state) || (errorFormAPI && errorFormAPI.cityAndStateForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.state && touched.state) ? `${errors.state}` : (errorFormAPI && errorFormAPI.cityAndStateForm) ? `${errorFormAPI.cityAndStateForm}` : ``}`}
                                // errorColor='magenta'
                                />




                                {/* program */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Program'}
                                    label={'Program'}
                                    labelStyle={{ marginBottom: -2 }}
                                    name='program'
                                    value={values.programName}
                                    onChangeText={(e) => { handleChange("programName")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("programName")}
                                    validate={handleBlur("programName")}
                                    outlined
                                    borderColor={`${(errors.programName && touched.programName) || (errorFormAPI && errorFormAPI.programNameForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.programName && touched.programName) ? `${errors.programName}` : (errorFormAPI && errorFormAPI.programNameForm) ? `${errorFormAPI.programNameForm}` : ``}`}
                                // errorColor='magenta'
                                />

                                {/* programAmount */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Program fee'}
                                    label={'Program fee'}
                                    name='programAmount'
                                    value={values.programAmount}
                                    onChangeText={(e) => { handleChange("programAmount")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("programAmount")}
                                    validate={handleBlur("programAmount")}
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.programAmount && touched.programAmount) || (errorFormAPI && errorFormAPI.programAmountForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.programAmount && touched.programAmount) ? `${errors.programAmount}` : (errorFormAPI && errorFormAPI.programAmountForm) ? `${errorFormAPI.programAmountForm}` : ``}`}
                                // errorColor='magenta'
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