import { FlatList, StyleSheet, View, Dimensions, Animated } from 'react-native';
import React, { useRef } from 'react';
import CarouselsBasicItem from './CarouselsBasicItem';
const { width } = Dimensions.get('screen');
const CarouselsBasic = ({ DATA }) => {

    const scrollX = useRef(new Animated.Value(0)).current;



    const Indicator = ({ scroll }) => {

        return (<View style={{ flexDirection: 'row' }}>
            {DATA.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp'
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 1, 0.6],
                    extrapolate: 'clamp'
                })

                const bgColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ["#A9A8A8","#FE7B07","#A9A8A8"],
                    extrapolate: 'clamp'
                })


                const pointWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10,15,10],
                    extrapolate: 'clamp'
                })

                const pointHeigth= scrollX.interpolate({
                    inputRange,
                    outputRange: [9,8,9],
                    extrapolate: 'clamp'
                })
                return <Animated.View key={i} style={{ width: pointWidth, height: pointHeigth, borderRadius: 5, backgroundColor: bgColor, opacity, margin: 7, transform: [{ scale }] }}>

                </Animated.View>
            })}
        </View>)
    }


    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={DATA}
                keyExtractor={item => item.key}
                renderItem={({ item }) => <CarouselsBasicItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={32}
                contentContainerStyle={styles.flatListContainer}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />
            <Indicator scroll={scrollX} />
        </View>
    );
}

export default CarouselsBasic;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'pink'
    },
    flatListContainer: {

    }
});
