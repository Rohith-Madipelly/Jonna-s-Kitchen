import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton1 from '../Components/UI/Buttons/CustomButton1'

const SelectedFullCourse = () => {
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
        <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
            <ImageBackground
                source={require('../assets/Images/Home/HomeProgram04.png')} // Replace with the actual path to your image
                style={[styles.container, { width: '100%', height: 1054, borderRadius: 20, overflow: 'hidden' }]}
            >
                <View style={{ flex: 0.213 }}>

                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 400, fontSize: 20 }}>Program 01</Text>

                    {ProgramDetails.map((item, index) => (
                        <View style={{ marginHorizontal: 17, flexDirection: 'row', marginTop: 2 }}>
                            <View style={{ flex: 0.1 }}>
                                <Image style={{ width: 24, height: 24, marginTop: -1 }}
                                    source={require('../assets/Images/CheckMark.png')}
                                    resizeMode={"contain"} />
                            </View>
                            <View style={{ flex: 0.9, marginTop: 2 }}>
                                <Text style={[styles.TextTine, { marginVertical: 1 }]}>{item.data}</Text>
                            </View>
                        </View>))}


                </View>
                <View style={{ flex: 0.213 }}>

                </View>
            </ImageBackground>


            <View style={{ height: 20 }}>

            </View>

        </View>
    )
}

export default SelectedFullCourse

const styles = StyleSheet.create({

    TextBold: {
        color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 600, fontSize: 16, lineHeight: 22,
        marginVertical: 1
    },
    TextTine: {
        color: '#000000', fontFamily: 'BalooTamma2', fontWeight: 400, fontSize: 16, lineHeight: 22
    },

    overlayContainer: {
        width: '100%',
        height: '50%',
        position: 'relative', // Needed for absolute positioning of child elements
    },
    topCenterImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        marginTop: 0,
        top: -7.5, // Adjust this value to move the image up or down
        // left: '50%',
        // transform: [{ translateX: -75 }], // Center the image horizontally
        alignItems: 'center',
    },
    bottomLeftImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'red',
        bottom: 20, // Adjust this value to move the image up or down
        left: 20, // Adjust this value to move the image left or right
    },
})