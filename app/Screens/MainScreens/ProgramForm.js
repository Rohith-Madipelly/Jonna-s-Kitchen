import { Button, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { RegisterYupSchema } from "../../FormikYupSchema/RegisterYupSchema";
import CustomTextInput3 from "../../Components/UI/Inputs/CustomTextInput3";
import CustomButton1 from "../../Components/UI/Buttons/CustomButton1";
import SkeletonLoader from "../../Components/UI/Skeletons/SkeletonLoader";


// import { re } from "../../../../FormikYupSchema/AccountSetUpSchema/AccountPersonal1";




const ProgramForm = () => {
    const navigation = useNavigation();

    const [errorFormAPI, seterrorFormAPI] = useState("")

    const dispatch = useDispatch();



    const { handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        isValid,
        setFieldValue,
        setValues,
        resetForm,
    } = useFormik({
        initialValues: { passPortPicture: "", fullName: "", lastName: "", dateOfBirth: "", phoneNumber: "", district: "", address: "", street: "", area: "", pinCode: "" },
        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: RegisterYupSchema,

        validate: values => {
            const errors = {};
            return errors;
        },

    });



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
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        // behavior={Platform.OS === "ios" ? 1000:0}
                        keyboardVerticalOffset={5000}
                        style={{ width: '100%', flex: 1 }}
                    >
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

                                    name='fullName'
                                    value={values.fullName}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("fullName")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("fullName")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("fullName")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}


                                    borderColor={`${(errors.fullName && touched.fullName) || (errorFormAPI && errorFormAPI.fullNameForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.fullName && touched.fullName) ? `${errors.fullName}` : (errorFormAPI && errorFormAPI.fullNameForm) ? `${errorFormAPI.fullNameForm}` : ``}`}

                                // errorColor='magenta'
                                />

                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Enter phone number'}
                                    label={'Phone number'}
                                    name='phoneNumber'
                                    value={values.phoneNumber}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

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
                                    borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                                // errorColor='magenta'
                                />

                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Enter email address'}
                                    label={'Email ID'}
                                    name='email'
                                    value={values.email}
                                    //   leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("email")(eToLowerCaseText); seterrorFormAPI(); }}
                                    onBlur={handleBlur("email")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("email")}
                                    labelStyle={{ marginBottom: -2 }}
                                    outlined

                                    borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}

                                // errorColor='magenta'
                                />

                                {/* Age */}
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%',}}>
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

                                    <View style={{ flex: 0.7,justifyContent:'center',}}>
                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your age'}
                                            // label={'Age'}
                                            name='age'
                                            value={values.age}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("age")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("age")}
                                            validate={handleBlur("age")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.age && touched.age) || (errorFormAPI && errorFormAPI.ageForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.age && touched.age) ? `${errors.age}` : (errorFormAPI && errorFormAPI.ageForm) ? `${errorFormAPI.ageForm}` : ``}`}
                                        // errorColor='magenta'
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
                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your gender'}
                                            // label={'Age'}
                                            name='age'
                                            value={values.age}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("age")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("age")}
                                            validate={handleBlur("age")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.age && touched.age) || (errorFormAPI && errorFormAPI.ageForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.age && touched.age) ? `${errors.age}` : (errorFormAPI && errorFormAPI.ageForm) ? `${errorFormAPI.ageForm}` : ``}`}
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
                                            placeholder={'Enter your Height'}
                                            // label={'height'}
                                            name='height'
                                            value={values.height}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("height")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("height")}
                                            validate={handleBlur("height")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.height && touched.height) || (errorFormAPI && errorFormAPI.heightForm) ? "red" : "#ccc"}`}
                                            errorMessheight={`${(errors.height && touched.height) ? `${errors.height}` : (errorFormAPI && errorFormAPI.heightForm) ? `${errorFormAPI.heightForm}` : ``}`}
                                        // errorColor='mheightnta'
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
                                            borderColor={`${(errors.currentWeight && touched.currentWeight) || (errorFormAPI && errorFormAPI.currentWeightForm) ? "red" : "#ccc"}`}
                                            errorMesscurrentWeight={`${(errors.currentWeight && touched.currentWeight) ? `${errors.currentWeight}` : (errorFormAPI && errorFormAPI.currentWeightForm) ? `${errorFormAPI.currentWeightForm}` : ``}`}
                                        // errorColor='mcurrentWeightnta'
                                        />
                                    </View>


                                </View>



                                {/* Marital Status */}
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

                                        }}>Marital Status</Text>
                                    </View>


                                    <View style={{ flex: 0.6 }}>
                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your current weight'}
                                            // label={'maritalStatus'}
                                            name='maritalStatus'
                                            value={values.maritalStatus}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("maritalStatus")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("maritalStatus")}
                                            validate={handleBlur("maritalStatus")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.maritalStatus && touched.maritalStatus) || (errorFormAPI && errorFormAPI.maritalStatusForm) ? "red" : "#ccc"}`}
                                            errorMessmaritalStatus={`${(errors.maritalStatus && touched.maritalStatus) ? `${errors.maritalStatus}` : (errorFormAPI && errorFormAPI.maritalStatusForm) ? `${errorFormAPI.maritalStatusForm}` : ``}`}
                                        // errorColor='mmaritalStatusnta'
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
                                        <CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your current weight  ******'}
                                            // label={'maritalStatus'}
                                            name='maritalStatus'
                                            value={values.maritalStatus}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("maritalStatus")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("maritalStatus")}
                                            validate={handleBlur("maritalStatus")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.maritalStatus && touched.maritalStatus) || (errorFormAPI && errorFormAPI.maritalStatusForm) ? "red" : "#ccc"}`}
                                            errorMessmaritalStatus={`${(errors.maritalStatus && touched.maritalStatus) ? `${errors.maritalStatus}` : (errorFormAPI && errorFormAPI.maritalStatusForm) ? `${errorFormAPI.maritalStatusForm}` : ``}`}
                                        // errorColor='mmaritalStatusnta'
                                        />
                                    </View>

                                </View>



                                {/* What you eat every day */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'What you eat every day'}
                                    label={'What you eat every day'}
                                    name='dailyEat'
                                    value={values.dailyEat}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("dailyEat")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("dailyEat")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("dailyEat")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.dailyEat && touched.dailyEat) || (errorFormAPI && errorFormAPI.dailyEatForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.dailyEat && touched.dailyEat) ? `${errors.dailyEat}` : (errorFormAPI && errorFormAPI.dailyEatForm) ? `${errorFormAPI.dailyEatForm}` : ``}`}
                                // errorColor='magenta'
                                />

                                <Text>Medical Conditions</Text>



                                {/* Others Medical Conditions*/}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Others medical conditions'}
                                    label={'Others medical conditions'}
                                    name='otherMedicalConditions'
                                    value={values.otherMedicalConditions}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("otherMedicalConditions")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("otherMedicalConditions")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("otherMedicalConditions")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.otherMedicalConditions && touched.otherMedicalConditions) || (errorFormAPI && errorFormAPI.otherMedicalConditionsForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.otherMedicalConditions && touched.otherMedicalConditions) ? `${errors.otherMedicalConditions}` : (errorFormAPI && errorFormAPI.otherMedicalConditionsForm) ? `${errorFormAPI.otherMedicalConditionsForm}` : ``}`}
                                // errorColor='magenta'
                                />



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




                                {/* cityAndState */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'City and state'}
                                    label={'City and state'}
                                    name='cityAndState'
                                    value={values.cityAndState}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("cityAndState")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("cityAndState")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("cityAndState")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.cityAndState && touched.cityAndState) || (errorFormAPI && errorFormAPI.cityAndStateForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.cityAndState && touched.cityAndState) ? `${errors.cityAndState}` : (errorFormAPI && errorFormAPI.cityAndStateForm) ? `${errorFormAPI.cityAndStateForm}` : ``}`}
                                // errorColor='magenta'
                                />



                                {/* physicalActivity */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Physical activity'}
                                    label={'Physical activity'}
                                    name='physicalActivity'
                                    value={values.physicalActivity}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("physicalActivity")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("physicalActivity")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("physicalActivity")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.physicalActivity && touched.physicalActivity) || (errorFormAPI && errorFormAPI.physicalActivityForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.physicalActivity && touched.physicalActivity) ? `${errors.physicalActivity}` : (errorFormAPI && errorFormAPI.physicalActivityForm) ? `${errorFormAPI.physicalActivityForm}` : ``}`}
                                // errorColor='magenta'
                                />

                                {/* program */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Program'}
                                    label={'Program'}
                                    name='program'
                                    value={values.program}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("program")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("program")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("program")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.program && touched.program) || (errorFormAPI && errorFormAPI.programForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.program && touched.program) ? `${errors.program}` : (errorFormAPI && errorFormAPI.programForm) ? `${errorFormAPI.programForm}` : ``}`}
                                // errorColor='magenta'
                                />

                                {/* programFee */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Program fee'}
                                    label={'Program fee'}
                                    name='programFee'
                                    value={values.programFee}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("programFee")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("programFee")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("programFee")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.programFee && touched.programFee) || (errorFormAPI && errorFormAPI.programFeeForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.programFee && touched.programFee) ? `${errors.programFee}` : (errorFormAPI && errorFormAPI.programFeeForm) ? `${errorFormAPI.programFeeForm}` : ``}`}
                                // errorColor='magenta'
                                />


                                {/* processingFee */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Processing fee'}
                                    label={'Processing fee'}
                                    name='processingFee'
                                    value={values.processingFee}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"

                                    onChangeText={(e) => { handleChange("processingFee")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("processingFee")}

                                    // validate={() => {
                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                    //     else { setError({ ...error, first: null }) }
                                    // }}

                                    validate={handleBlur("processingFee")}

                                    outlined
                                    labelStyle={{ marginBottom: -2 }}

                                    borderColor={`${(errors.processingFee && touched.processingFee) || (errorFormAPI && errorFormAPI.processingFeeForm) ? "red" : "#ccc"}`}

                                    errorMessage={`${(errors.processingFee && touched.processingFee) ? `${errors.processingFee}` : (errorFormAPI && errorFormAPI.processingFeeForm) ? `${errorFormAPI.processingFeeForm}` : ``}`}
                                // errorColor='magenta'
                                />




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
                                        <CustomTextInput3
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
                                    onPress={() => { navigation.navigate("BottomTabScreen") }}
                                    // onPress={handleSubmit}
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
                    </KeyboardAvoidingView>
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