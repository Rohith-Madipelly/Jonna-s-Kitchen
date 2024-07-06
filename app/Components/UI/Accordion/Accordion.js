import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { Extrapolate, interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const Accordion = ({ value, index }) => {
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0);
    const [isOpen, setIsOpen] = useState(false);
    const open = useSharedValue(false);

    const progress = useDerivedValue(() => {
        return open.value ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 300 });
    });

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: interpolate(
            progress.value,
            [0, 1],
            [0, heightValue.value],
            Extrapolate.CLAMP,
        )
    }));

    const measureHeight = () => {
        runOnUI(() => {
            'worklet';
            const measured = measure(listRef);
            if (measured) {
                heightValue.value = measured.height;
                // You can't use console.log directly here. Use a method like below.
                console.log(`Measured height: ${measured.height}`);
            }
        })();
    };


    const toggleAccordion = () => {
        if (heightValue.value === 0) {
            measureHeight();
        }
        open.value = !open.value;
        setIsOpen(prev => !prev);
    };

    return (
        <View style={styles.container} key={index}>
            <Pressable
                style={styles.titleContainer}
                onPress={toggleAccordion}>
                <View style={{ flex: 0.1 }}>
                    {isOpen ? (
                        <Image
                            style={styles.icon}
                            source={require("../plusemins.png")}
                            resizeMode={"contain"}
                        />
                    ) : (
                        <Image
                            style={styles.icon}
                            source={require("../pluse.png")}
                            resizeMode={"contain"}
                        />
                    )}
                </View>
                <View style={{ flex: 0.87, marginLeft: 5 }}>
                    <Text style={[styles.textTitle, { color: isOpen ? '#38B14D' : "black" }]}>{value.title}</Text>
                </View>
            </Pressable>
            <Animated.View style={heightAnimationStyle} collapsable={false}>
                <View ref={listRef} style={styles.contentContainer} collapsable={false}>
                    <View style={styles.borderTop}>
                        {value.content.map((contentValue, idx) => (
                            <View key={idx} style={styles.content} collapsable={false}>
                                <Text style={styles.textContent}>{contentValue}</Text>
                            </View>
                        ))}
                    </View>
                    {value.quotes?<View style={styles.extraContent}>
                        <Text style={styles.extraText}>{value.quotes}</Text>
                    </View>:<View style={{marginBottom:10}}>
                    </View>}
                </View>
            </Animated.View>
        </View>
    );
};

export default Accordion;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginVertical:8,
        borderRadius: 14,
        overflow: 'hidden',
        elevation: 3
        
    },
    titleContainer: {
        paddingHorizontal: 20,
        height: 50,
        paddingTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        marginBottom: 5,
    },
    contentContainer: {
        position: "absolute",
        top: 0,
        width: '100%',
    },
    textTitle: {
        fontWeight: '600',
        fontSize: 13,
        fontFamily: 'BalooTamma2-Bold',
        lineHeight: 20,
    },
    borderTop: {
        borderTopWidth: 1,
        marginHorizontal: 16,
        paddingTop: 10,
        borderColor: '#38B14D',
    },
    content: {
        backgroundColor: 'white',
    },
    textContent: {
        fontSize: 13,
        color:'#646464',
        fontFamily:'BalooTamma2',
        fontWeight:'700',
        lineHeight: 18,

    },
    extraContent: {
        marginHorizontal: 16,
        paddingTop: 10,
    },
    extraText:{
        fontSize: 13,
        color:'#131313',
        fontFamily:'BalooTamma2',
        fontWeight:'700',
        lineHeight: 18,
        marginBottom:10
    }
});
