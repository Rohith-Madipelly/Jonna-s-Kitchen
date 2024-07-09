import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BackTable2 = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.overlayContainer, styles.pinkBackground]}>
                <View style={styles.bottomLeftImage}>
                    <Image
                        style={styles.image2}
                        source={require("../assets/Images/Vector 1.png")}
                    // resizeMode="contain"
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>

                <View style={[styles.topCenterImage]}>
                    <Image
                        style={styles.image}
                        source={require("../assets/Images/Home/BannerBack01.png")}
                    // resizeMode="contain"
                    />
                </View>

                <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 700, fontSize: 20 }}>Program 01</Text>
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

                    <View style={{ height: 50 }}>

                    </View>
                </View>
            </View>
        </View>
    );
};

export default BackTable2;

const styles = StyleSheet.create({
    TextBold: {
        color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 600, fontSize: 16, lineHeight: 22,
        marginVertical: 1
    },
    TextTine: {
        color: '#000000', fontFamily: 'BalooTamma2', fontWeight: 400, fontSize: 16, lineHeight: 22
    },

    container: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',

    },
    overlayContainer: {
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
