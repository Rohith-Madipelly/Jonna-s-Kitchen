import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton1 from '../Components/UI/Buttons/CustomButton1'

const BackTable = () => {
    return (
        <View style={{ borderRadius: 20, overflow: 'hidden',marginTop:20 }}>
            <ImageBackground
                source={require('../assets/Images/Home/HomeProgram02.png')} // Replace with the actual path to your image
                style={[styles.container, { width: '100%', height: 556, borderRadius: 20, overflow: 'hidden' }]}
            >
                <View style={{ flex: 0.37 }}>

                </View>
                <View style={{ flex: 0.62 }}>
                    <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 400, fontSize: 20 }}>Program 01</Text>
                    <View style={{ marginHorizontal: 17 }}>
                        <Text style={[styles.TextBold]}>1. Duration :-<Text style={[styles.TextTine]}> 6 weeks Consultation Support.</Text></Text>
                        <Text style={[styles.TextBold]}>2. <Text style={[styles.TextTine]}>Regular Diet Monitoring and its client
                            responsibility to send.</Text></Text>
                        <Text style={[styles.TextBold]}>3. <Text style={[styles.TextTine]}>WhatsApp Support.</Text></Text>
                        <Text style={[styles.TextBold]}>4. Expected weight loss :- <Text style={[styles.TextTine]}> 3 to 5 kgs.</Text></Text>
                        <Text style={[styles.TextBold]}>5. <Text style={[styles.TextTine]}>Meal plans will be shared based on Medical
                            Condition (Ex: PCOD, Thyroid and Fertility).</Text></Text>
                        <Text style={[styles.TextBold]}>6. INR - 3000 - <Text style={[styles.TextTine]}>We don’t have any Refund and
                            Transfer Policy.</Text></Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -10 }}>
                        <CustomButton1
                            boxWidth={'40%'}
                            onPress={() => { console.log("Button PRess") }}
                            // onPress={handleSubmit}
                            textStyling={{ marginBottom: -5 }}
                            // leftIcon={<Entypo
                            //   // style={styles.icon}
                            //   name={'login'} size={18} color={'white'} />}
                            //   bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                            // bgColor={"rgba(220, 142, 128, 0.9)"}
                            style={{}}>Enroll Now</CustomButton1>
                    </View>
                </View>
            </ImageBackground>

            <ImageBackground
                source={require('../assets/Images/Home/HomeProgram01.png')} // Replace with the actual path to your image
                style={[styles.container, { width: '100%', height: 556, borderRadius: 20, overflow: 'hidden', marginVertical: 20 }]}
            >
                <View style={{ flex: 0.35 }}>

                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 400, fontSize: 20 }}>Program 02</Text>
                    <View style={{ marginHorizontal: 17 }}>
                        <Text style={[styles.TextBold]}>1. Duration :- <Text style={[styles.TextTine]}>12 weeks Consultation Support.</Text></Text>
                        <Text style={[styles.TextBold]}>2. <Text style={[styles.TextTine]}>Detox / Cleanse your body.</Text></Text>
                        <Text style={[styles.TextBold]}>3. <Text style={[styles.TextTine]}>Regular Diet Monitoring and its client
                            responsibility to send.</Text></Text>
                        <Text style={[styles.TextBold]}>4. <Text style={[styles.TextTine]}>WhatsApp Support.</Text></Text>
                        <Text style={[styles.TextBold]}>5. Expected weight loss :- <Text style={[styles.TextTine]}> 7 to 10 kgs.</Text></Text>
                        <Text style={[styles.TextBold]}>6. <Text style={[styles.TextTine]}>Meal plans will be shared based on Medical
                            Condition (Ex: PCOD, Thyroid and Fertility).</Text></Text>
                        <Text style={[styles.TextBold]}>7. INR - 4500 - <Text style={[styles.TextTine]}>We don’t have any Refund and
                            Transfer Policy.</Text></Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -10 }}>
                        <CustomButton1
                            boxWidth={'40%'}
                            onPress={() => { console.log("Button PRess") }}
                            // onPress={handleSubmit}
                            textStyling={{ marginBottom: -5 }}
                            // leftIcon={<Entypo
                            //   // style={styles.icon}
                            //   name={'login'} size={18} color={'white'} />}
                            //   bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                            // bgColor={"rgba(220, 142, 128, 0.9)"}
                            style={{}}>Enroll Now</CustomButton1>
                    </View>
                </View>
            </ImageBackground>

            <ImageBackground
                source={require('../assets/Images/Home/HomeProgram03.png')} // Replace with the actual path to your image
                style={[styles.container, { width: '100%', height: 556, borderRadius: 20, overflow: 'hidden' }]}
            >
                <View style={{ flex: 0.41 }}>

                </View>
                <View style={{ flex: 0.59 }}>
                    <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 400, fontSize: 20 }}>Program 03</Text>
                    <View style={{ marginHorizontal: 17 }}>
                        <Text style={[styles.TextBold]}>1. Duration :-<Text style={[styles.TextTine]}> Per Trimester.</Text></Text>
                        <Text style={[styles.TextBold]}>2. <Text style={[styles.TextTine]}>Pregnancy diet plans based on your Pregnancy
                            weeks.</Text></Text>
                        <Text style={[styles.TextBold]}>3. <Text style={[styles.TextTine]}>Regular Diet Monitoring and its client
                            responsibility to send.</Text></Text>
                        <Text style={[styles.TextBold]}>4. <Text style={[styles.TextTine]}>WhatsApp Support.</Text></Text>
                        {/* <Text style={[styles.TextBold]}>4. Expected weight loss :- <Text style={[styles.TextTine]}> 3 to 5 kgs.</Text></Text> */}
                        <Text style={[styles.TextBold]}>5. <Text style={[styles.TextTine]}>Regular Diet Monitoring and its client
                            responsibility to send.</Text></Text>
                        <Text style={[styles.TextBold]}>6. INR - 5500 -<Text style={[styles.TextTine]}>We don’t have any Refund and Transfer Policy.</Text></Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -10 }}>
                        <CustomButton1
                            boxWidth={'40%'}
                            onPress={() => { console.log("Button PRess") }}
                            // onPress={handleSubmit}
                            textStyling={{ marginBottom: -5 }}
                            // leftIcon={<Entypo
                            //   // style={styles.icon}
                            //   name={'login'} size={18} color={'white'} />}
                            //   bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                            // bgColor={"rgba(220, 142, 128, 0.9)"}
                            style={{}}>Enroll Now</CustomButton1>
                    </View>
                </View>
            </ImageBackground>
            <View style={{height:20}}>

            </View>

        </View>
    )
}

export default BackTable

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