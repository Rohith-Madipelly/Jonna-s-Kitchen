import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Programs = ({ProgramsName,ProgramImage}) => {




    const ProgramPoints = [
        { data: "In this program, you will get 6 weeks Consultation support." },
        { data: "Daily Diet Monitoring and progress check- we will ask to share meal plates through WhatsApp." },
        { data: "We will share the meal plan for every 2 weeks as per your previous week feedback / weight loss and daily diet updates ( If you fail to update your weight progress, diet updates , your meal plans will be delayed or may be Lapsed or we may as to repeat as we don’t understand your progress)." },
        { data: "The meal plans will be totally home cooked, we don't allow any packet food, ready to eat stuff. All the meals have to be cooked in your own kitchen." },
        { data: "All the recipes are easy to cook and will share sample written recipes along with Links." },
        { data: "A lifestyle is something which you should be able to adapt it hence we share healthy food recipes along with Physical activity of – 45 mins of Brisk walking." },
    ]
    return (
        <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20, }}>
            <View style={styles.container}>
                <View style={[styles.overlayContainer, styles.pinkBackground]}>
                {/* <View style={[styles.topCenterImage]}>
                        <Image
                            style={{width:'80%',height:'20%'}}
                            source={require("../../../../../assets/Images/Ellipse 1.png")}
                        // resizeMode="co"
                        />
                    </View> */}
                    <View style={styles.bottomLeftImage}>
                        <Image
                            style={styles.image2}
                            source={require("../../../../../assets/Images/Vector 1.png")}
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

                    {ProgramPoints.map((item, index) => (
                        <View style={{ marginHorizontal: 17, flexDirection: 'row', marginTop: 2 }} key={index}>
                            {/* <View style={{ flex: 0.1 }}>
                                <Image style={{ width: 24, height: 24, marginTop: -1 }}
                                    source={require('../../../../../assets/Images/CheckMark.png')}
                                    resizeMode={"contain"} />
                            </View> */}
                                <View style={{ flex: 0.08, }}>
                                <Text style={[styles.TextBold]}>{index+1}.</Text>
                            </View>
                            <View style={{ flex: 0.9, marginTop: 2 }}>
                                <Text style={[styles.TextTine, { marginVertical: 1 }]}>{item.data}</Text>
                            </View>
                        </View>))}

                    <View style={{ height: 20 }}>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default Programs


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
