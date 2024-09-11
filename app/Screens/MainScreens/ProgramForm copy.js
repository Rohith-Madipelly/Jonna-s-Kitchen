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
                                            placeholder={'Enter your age'}
                                            name='age'
                                            value={values.age}
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
                                            // label={'userWeight'}
                                            name='userWeight'
                                            value={values.userWeight}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("userWeight")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("userWeight")}
                                            validate={handleBlur("userWeight")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.userWeight && touched.userWeight) || (errorFormAPI && errorFormAPI.userWeightForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.userWeight && touched.userWeight) ? `${errors.userWeight}` : (errorFormAPI && errorFormAPI.userWeightForm) ? `${errorFormAPI.userWeightForm}` : ``}`}
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
                                            // placeholder={'Select'}
                                            name='personType'
                                            DropDownData={foodPreferenceData}
                                            // foodPreferenceData
                                            DropDownHeigth={200}
                                            value={values.personType}
                                            // bgColor='#e1f3f8'
                                            // onChange={setCategoriesData}

                                            onChange={(e) => {
                                                handleChange("personType")(e);
                                                seterrorFormAPI();
                                            }}
                                            outlined
                                            borderColor={`${(errors.personType && touched.personType) || (errorFormAPI && errorFormAPI.personTypeForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.personType && touched.personType) ? `${errors.personType}` : (errorFormAPI && errorFormAPI.personTypeForm) ? `${errorFormAPI.personTypeForm}` : ``}`}
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


                                {values.maritalStatus === "Others" ?
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
                                    value={values.PhysicalActivity}
                                    onChangeText={(e) => { handleChange("PhysicalActivity")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("PhysicalActivity")}
                                    validate={handleBlur("PhysicalActivity")}
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.PhysicalActivity && touched.PhysicalActivity) || (errorFormAPI && errorFormAPI.PhysicalActivityForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.PhysicalActivity && touched.PhysicalActivity) ? `${errors.PhysicalActivity}` : (errorFormAPI && errorFormAPI.PhysicalActivityForm) ? `${errorFormAPI.physicalActivityForm}` : ``}`}
                                // errorColor='magenta'
                                />
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Address'}
                                    label={'Address'}
                                    name='cityAndState'
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


                                {/* cityAndState */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Enter  your state'}
                                    label={'State'}
                                    name='cityAndState'
                                    value={values.cityAndState}
                                    // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                    // bgColor='#e1f3f8'
                                    // bgColor="#B1B1B0"
                                    onChangeText={(e) => { handleChange("cityAndState")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("cityAndState")}
                                    validate={handleBlur("cityAndState")}
                                    outlined
                                    labelStyle={{ marginBottom: -2 }}
                                    borderColor={`${(errors.cityAndState && touched.cityAndState) || (errorFormAPI && errorFormAPI.cityAndStateForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.cityAndState && touched.cityAndState) ? `${errors.cityAndState}` : (errorFormAPI && errorFormAPI.cityAndStateForm) ? `${errorFormAPI.cityAndStateForm}` : ``}`}
                                // errorColor='magenta'
                                />




                                {/* program */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Program'}
                                    label={'Program'}
                                    labelStyle={{ marginBottom: -2 }}
                                    name='program'
                                    value={values.programId}
                                    onChangeText={(e) => { handleChange("programId")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("programId")}
                                    validate={handleBlur("programId")}
                                    outlined
                                    borderColor={`${(errors.programId && touched.programId) || (errorFormAPI && errorFormAPI.programIdForm) ? "red" : "#ccc"}`}
                                    errorMessage={`${(errors.programId && touched.programId) ? `${errors.programId}` : (errorFormAPI && errorFormAPI.programIdForm) ? `${errorFormAPI.programIdForm}` : ``}`}
                                // errorColor='magenta'
                                />

                                {/* programFee */}
                                <CustomTextInput3
                                    boxWidth={'95%'}
                                    placeholder={'Program fee'}
                                    label={'Program fee'}
                                    name='programFee'
                                    value={values.programFee}
                                    onChangeText={(e) => { handleChange("programFee")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("programFee")}
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