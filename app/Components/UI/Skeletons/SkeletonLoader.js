// SkeletonLoader.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonLoader = ({ width, height, borderRadius }) => {
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const shimmerStyle = {
    transform: [
      {
        translateX: shimmerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-width, width],
        }),
      },
      
    ],
  };

  return (
    <View style={[styles.container, {  height, borderRadius }]}>
      <Animated.View style={[styles.shimmer, shimmerStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    width: '10%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    // backgroundColor: 'red',
    opacity: 0.5,
  },
});

export default SkeletonLoader;

