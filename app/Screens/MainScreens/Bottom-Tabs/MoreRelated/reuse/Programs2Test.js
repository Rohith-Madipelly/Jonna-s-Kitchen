import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoadingImage from '../../../../../Components/UI/ImageConatiners/LoadingImage'

const Programs2Test = ({data}) => {

    return (
        <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20, }}>
            <View style={styles.container}>
                <View style={[styles.overlayContainer, styles.pinkBackground]}>
                 <View style={[styles.topCenterImage]}>
                        <Image
                            style={{width:'80%',height:'20%'}}
                            source={require("../../../../../assets/Images/Ellipse 1.png")}
                        // resizeMode="co"
                        />
                    </View>
                    <View style={styles.bottomLeftImage}>
                        <Image
                            style={styles.image2}
                            source={require("../../../../../assets/Images/Vector2.png")}
                            resizeMode='stretch'
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>

                    <View style={[styles.topCenterImage]}>
                 
                    <LoadingImage
                            // source={item.recipieImage}
                            source={{ uri: data.programImage }}
                            style={styles.image}
                        />
                    </View>
                    <Text style={{ textAlign: 'center', color: '#000000', fontFamily: 'BalooTamma2-Bold', fontWeight: 400, fontSize: 20 }}>{data.programName}</Text>


{data.programDetails.map((item, index) => (
    <View style={{ marginHorizontal: 17, flexDirection: 'row', marginTop: 2 }} key={index}>
        <View style={{ flex: 0.1 }}>
           
            <View style={{ flex: 0.08, marginTop: 1 }}>
                <Text style={[styles.TextBold]}>{index + 1}.</Text>
            </View>

        </View>
        <View style={{ flex: 0.9 }}>
            <Text style={[styles.TextTine, { marginTop: 2 }]}>{item}</Text>
        </View>
    </View>))}


                    <View style={{ height: 20 }}>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default Programs2Test


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
        right:0,
        bottom: -200
        // Adjust this value to move the image left or right
    },
});