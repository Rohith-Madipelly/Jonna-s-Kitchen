import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';



// react-native-reanimated-carousel


const CarouselWithButton = ({ DATA, autoPlay, scrollAnimationDuration }) => {
    const width = Dimensions.get('window').width;
    const carouselRef = React.useRef(null);
    // const DATA = [...new Array(8).keys()]
    const goToNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    }

    const goToPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    }
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10,height:'100%' }}>

            <TouchableOpacity onPress={goToPrev} style={{ justifyContent: 'center',marginLeft:10}}>
                <MaterialCommunityIcons name="arrow-left-drop-circle" size={18} color="#785600" />
            </TouchableOpacity>

            {DATA?<Carousel
                loop
                ref={carouselRef}
                width={width * 0.84}
                // height={500}
                autoPlay={autoPlay}
                data={DATA}
                scrollAnimationDuration={scrollAnimationDuration}
                renderItem={({item, index }) => (
                  
                    <View style={{ flex: 1, }}>
                        <View
                            style={{
                                flex: 1,
                                // borderWidth: 1,
                                // justifyContent: 'center',
                            }}
                        >
                      
                            <View style={[{ width: '95%',alignItems: 'center', justifyContent: 'center' }]} onPress={() => { console.log("Hello",) }}>
                                <Image
                                    source={{uri:item.testimonialImg}}
                                    style={{
                                        width: '100%', // Take up the full width of the parent
                                        height: '100%',
                                        resizeMode: 'contain', // Maintain aspect ratio without stretching
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                )}
            />:<View>
                <Text>Hello</Text>
                </View>}

            <TouchableOpacity onPress={goToNext} style={{ justifyContent: 'center',marginRight:10}}>
                <MaterialCommunityIcons name="arrow-right-drop-circle" size={18} color="#785600" />
            </TouchableOpacity>

        </View>
    )
}

export default CarouselWithButton

const styles = StyleSheet.create({})