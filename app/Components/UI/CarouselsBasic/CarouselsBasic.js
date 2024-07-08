import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, Dimensions, Animated, Button, TouchableOpacity } from 'react-native';
import CarouselsBasicItem from './CarouselsBasicItem';

const { width } = Dimensions.get('screen');

const CarouselsBasic = ({ DATA, autoScroll }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const totalItems = DATA.length;

  // Calculate item width including padding for precise scrolling
  const itemWidth = width;

  // Function to scroll to the next item
  const scrollToNext = () => {
    const nextIndex = Math.ceil(scrollX._value / width) + 1;
    if (nextIndex < totalItems) {
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * itemWidth,
        animated: true,
      });
    } else {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  // Function to scroll to the previous item
  const scrollToPrevious = () => {
    const prevIndex = Math.floor(scrollX._value / width) - 1;
    if (prevIndex >= 0) {
      flatListRef.current?.scrollToOffset({
        offset: prevIndex * itemWidth,
        animated: true,
      });
    } else {
      flatListRef.current?.scrollToOffset({
        offset: (totalItems - 1) * itemWidth,
        animated: true,
      });
    }
  };


  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToOffset({
      offset: index * itemWidth,
      animated: true,
    });
  };

  useEffect(() => {
    if (autoScroll) {
      const intervalId = setInterval(scrollToNext, 3000); // Auto-scroll every 3 seconds
      return () => clearInterval(intervalId);
    }
  }, [autoScroll, totalItems]);

  const Indicator = () => (
    <View style={styles.indicatorContainer}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: 'clamp',
        });
        const bgColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#A9A8A8", "#FE7B07", "#A9A8A8"],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity key={i} onPress={() => scrollToIndex(i)} activeOpacity={1}>
            <Animated.View
              key={i}
              style={[
                styles.indicator,
                { backgroundColor: bgColor, opacity, transform: [{ scale }] },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <CarouselsBasicItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        ref={flatListRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      {/* <View style={styles.buttonContainer}> */}
      {/* <Button title="Prev" onPress={scrollToPrevious} /> */}
      {/* <Button title="Next" onPress={scrollToNext} /> */}
      {/* </View> */}
      <Indicator />
    </View>
  );
};

export default CarouselsBasic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});
