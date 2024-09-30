import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton1 from '../../../../../../Components/UI/Buttons/CustomButton1'
import { useNavigation } from '@react-navigation/native'

const Programs2 = ({ProgramsName,ProgramImage, data}) => {
    const [arrayLength, setArrayLength] = useState(data.programDetails.length)
    const navigation=useNavigation()
    return (
        <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20, }}>
            <View style={styles.container}>
                <View style={[styles.overlayContainer, styles.pinkBackground]}>
                 <View style={[styles.topCenterImage]}>
                        <Image
                            style={{width:'80%',height:'20%'}}
                            source={require("../../../../../../assets/Images/Ellipse 1.png")}
                        // resizeMode="co"
                        />
                    </View>
                    <View style={styles.bottomLeftImage}>
                        <Image
                            style={styles.image2}
                            source={require("../../../../../../assets/Images/Vector2.png")}
                            resizeMode='stretch'
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>

                    <View style={[styles.topCenterImage]}>
                    <Image
                            style={styles.image}
                            source={ProgramImage}
                        // resizeMode="contain"
                        />
                    </View>
                    <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 400, fontSize: 20 }}>{ProgramsName}</Text>

                    {/* {ProgramPoints.map((item, index) => (
                        <View style={{ marginHorizontal: 17, flexDirection: 'row', marginTop: 2 }} key={index}> */}
                            {/* <View style={{ flex: 0.1 }}>
                                <Image style={{ width: 24, height: 24, marginTop: -1 }}
                                    source={require('../../../../../assets/Images/CheckMark.png')}
                                    resizeMode={"contain"} />
                            </View> */}
                                {/* <View style={{ flex: 0.08, }}>
                                <Text style={[styles.TextBold]}>{index+1}.</Text>
                            </View>
                            <View style={{ flex: 0.9, marginTop: 2 }}>
                                <Text style={[styles.TextTine, { marginVertical: 1 }]}>{item.data}</Text>
                            </View>
                        </View>))} */}




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
                            onPress={() => { navigation.navigate("ProgramsForm",{programId:`${data.id}`,processingFeeData:`${data.processingFee}`,   programPriceData:`${data.programPrice}`,  programNameData:`${data.programName}`, processingFeeData:40}) }}
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

export default Programs2


const styles = StyleSheet.create({
    TextBold: {
        width:'90%',
        color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 600, fontSize: 16, lineHeight: 22,
        marginVertical: 1
    },
    TextTine: {
        width:'90%',
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
        right:0,
        bottom: -200
        // Adjust this value to move the image left or right
    },
});
