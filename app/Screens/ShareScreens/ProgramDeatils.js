import { Alert, FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { GetAllProgramsAPI, getSingleProgramAPI } from '../../Utils/ApiCalls';
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1';
import { useNavigation } from '@react-navigation/native';
import LoadingImage from '../../Components/UI/ImageConatiners/LoadingImage';
// import CustomButton1 from '../Components/UI/Buttons/CustomButton1'
// import BackTable2 from './BackTable2'

const ProgramDeatils = ({ programId, data }) => {

    console.log("Sd",data)
    const navigation = useNavigation();

    const [show, setShow] = useState()
    const [arrayLength, setArrayLength] = useState(data.programDetails.length)
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [APICallData, setApiCallData] = useState([])


    const scrollViewRef = useRef(null);
    let tokenn = useSelector((state) => state.login.token);


    // const getSingleProgramAPICaller = async () => {
    //     seterrorFormAPI() //Clear's All API errors
    //     try {
    //         setSpinnerbool(true)
    //         const res = await getSingleProgramAPI(programId, tokenn)
    //         if (res) {
    //             console.log(",,,,,,,>>", res.data,)
    //             console


    //             setTimeout(() => {

    //             }, 200);

    //         }

    //     } catch (error) {

    //         if (error.response) {
    //             if (error.response.status === 400) {
    //                 console.log("Error With 400.", error.response.data)
    //                 seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
    //             }
    //             else if (error.response.status === 401) {
    //                 seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
    //             }
    //             else if (error.response.status === 403) {
    //                 console.log("error.response.status login", error.response.data.message)
    //             }
    //             else if (error.response.status === 404) {
    //                 // console.log("error.response.status login", error.response)

    //             }
    //             else if (error.response.status === 500) {
    //                 console.log("Internal Server Error", error.message)
    //             }
    //             else {
    //                 console.log("An error occurred response.>>")
    //                 //   ErrorResPrinter(`${error.message}`)
    //             }
    //         }
    //         else if (error.code === 'ECONNABORTED') {
    //             console.log('Request timed out. Please try again later.');
    //         }
    //         else if (error.request) {
    //             console.log("No Response Received From the Server.")
    //             if (error.request.status === 0) {
    //                 // console.log("error in request ",error.request.status)
    //                 Alert.alert("No Network Found", "Please Check your Internet Connection 1123")
    //             }
    //         }

    //         else {
    //             console.log("Error in Setting up the Request.")
    //         }

    //         setSpinnerbool(false)

    //         if (error) {

    //             // message = error.message;
    //             // seterrorFormAPI(message)
    //             // "userEmail or Password does not match !"
    //         }
    //     }
    //     finally {
    //         setSpinnerbool(false)
    //     }
    // }




    // useEffect(() => {
    // getSingleProgramAPICaller()
    // }, [programId])


    // console.log(ProgramDetails)

    const ProgramDetails = [
        { data: "In this program, you will get 6 weeks Consultation support." },
        { data: "Daily Diet Monitoring and progress check- we will ask to share meal plates through WhatsApp." },
        { data: "We will share the meal plan for every 2 weeks as per your previous week feedback / weight loss and daily diet updates ( If you fail to update your weight progress, diet updates , your meal plans will be delayed or may be Lapsed or we may as to repeat as we don’t understand your progress)." },
        { data: "The meal plans will be totally home cooked, we don't allow any packet food, ready to eat stuff. All the meals have to be cooked in your own kitchen." },
        { data: "All the recipes are easy to cook and will share sample written recipes along with Links." },
        { data: "A lifestyle is something which you should be able to adapt it hence we share healthy food recipes along with Physical activity of – 45 mins of Brisk walking." },

        { data: "Post Payment you will receive the plan in 2 working days and you need to start the plan within 4 days of payment- Not Beyond that." },
        { data: "We share plans only under our consultation duration ( 6 weeks) and We don’t share All plans at one time, The meal plans will be changed only when it followed correctly and provided us the daily diet updates Through WhatsApp support Number." },
        { data: "Your Plan Duration starts post payment in 2 working days and The Program in Not TRANSFERABLE , NOT EXTENDABLE and NOT REFUNDABLE." },
        { data: "You have chosen our Program voluntarily and completely understand our Protocol." },
        { data: "Duration:- For example If your program starts on Jan 1st then your program will end on Feb 12th." },

    ]
    return (
        <View style={{ borderRadius: 20, overflow: 'hidden', marginHorizontal: 10 }}>
            <View style={styles.container}>
                <View style={[styles.overlayContainer, styles.pinkBackground]}>
                    <View style={styles.bottomLeftImage}>
                        <Image
                            style={styles.image2}
                            source={require("../../assets/Images/Vector 1.png")}
                            resizeMode='stretch'
                        />

                    </View>
                </View>
                <View style={{ flex: 1 }}>

                    <View style={[styles.topCenterImage]}>
                        {/* <Image
                            style={styles.image}
                            source={require("../../assets/Images/Home/BannerBack01.png")}
                        // resizeMode="contain"
                        /> */}
                        {/* <Image
                            style={styles.image}
                            source={{ uri: data.programImage }}
                            resizeMode="contain"
                        /> */}


                        <LoadingImage
                            source={{ uri: data.programImage }}
                            // source={{ uri: 'https://images.unsplash.com/photo-1542378151504-0361b8ec8f93?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                            style={styles.image}

                            // loaderColor="#ff0000"
                            // resizeMode="contain"
                        />

                    </View>
                    <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 400, fontSize: 20 }}>{data.programName}</Text>


                    {data.programDetails.map((item, index) => (
                        <View style={{ marginHorizontal: 17, flexDirection: 'row', marginTop: 2 }} key={index}>
                            <View style={{ flex: 0.1 }}>
                                {/* <Image style={{ width: 24, height: 24, marginTop: -1 }}
                                    source={require('../../assets/Images/CheckMark.png')}
                                    resizeMode={"contain"} /> */}
                                <View style={{ flex: 0.08, marginTop: 1 }}>
                                    <Text style={[styles.TextBold]}>{index + 1}.</Text>
                                </View>

                            </View>
                            <View style={{ flex: 0.9 }}>
                                <Text style={[styles.TextTine, { marginTop: 2 }]}>{item}</Text>
                            </View>
                        </View>))}


                    <View style={{ marginHorizontal: 17, flexDirection: 'row', marginTop: 2 }}>
                        <View style={{ flex: 0.1 }}>
                            <View style={{ flex: 0.08 }}>
                                <Text style={[styles.TextBold]}>{arrayLength + 1}.</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.9, }}>
                            <Text style={[styles.TextBold]}>Duration :- <Text style={[styles.TextTine, { marginTop: 2 }]}>{data.programTimeLine} Consultation Support.</Text></Text>
                        </View>
                    </View>


                    <View style={{ marginHorizontal: 17, flexDirection: 'row', marginTop: 2 }}>
                        <View style={{ flex: 0.1 }}>
                            <View style={{ flex: 0.08 }}>
                                <Text style={[styles.TextBold]}>{arrayLength + 2}.</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.9, }}>
                            <Text style={[styles.TextBold]}>INR - {data.programPrice} <Text style={[styles.TextTine, { marginTop: 2 }]}> - We don’t have any Refund and
                                Transfer Policy.</Text></Text>
                        </View>
                    </View>


                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <CustomButton1
                            boxWidth={'75%'}
                            onPress={() => { navigation.navigate("ProgramsForm", { programId: `${data.id}`, processingFeeData: `${data.processingFee}`, programPriceData: `${data.programPrice}`, programNameData: `${data.programName}`, processingFeeData: 40 }) }}
                            // onPress={handleSubmit}
                            textStyling={{ marginBottom: -5 }}
                            stylebtn={{ paddingVertical: 10 }}
                            // leftIcon={<Entypo
                            //   // style={styles.icon}
                            //   name={'login'} size={18} color={'white'} />}
                            // bgColor={`${!isValid ? "#38B14D" : "#38B14D"}`}
                            bgColor={"green"}

                        >Register Now</CustomButton1>


                    </View>

                    <View style={{ height: 20 }}>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProgramDeatils


const styles = StyleSheet.create({
    TextBold: {
        color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 600, fontSize: 16, lineHeight: 22,
        marginVertical: 1
    },
    TextTine: {
        color: '#000000', fontFamily: 'BalooTamma2', fontWeight: 400, fontSize: 16, lineHeight: 22
    },

    container: {
        // backgroundColor: 'white',

        width: '100%',
        borderRadius: 20,
        borderRadius: 1,
        elevation: 1,

        overflow: 'hidden',
    },
    overlayContainer: {
        // backgroundColor: '#1C00ff00',
        backgroundColor: '#FFFFFF80',

        width: '100%',
        height: '100%',
        position: 'relative', // Needed for absolute positioning of child elements
        overflow: 'hidden'

    },
    pinkBackground: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'yellow',
    },
    topCenterImage: {
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: 200,
    },
    image2: {
        width: '100%',
        height: '100%'
    },
    // Uncomment and adjust as needed
    bottomLeftImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: -200
        // Adjust this value to move the image left or right
    },
});
