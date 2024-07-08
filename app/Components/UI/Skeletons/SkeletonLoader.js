// SkeletonLoader.js
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonLoader = ({ width, height, borderRadius }) => {
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
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
    <View style={[styles.container, { width, height, borderRadius }]}>
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
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    opacity: 0.5,
  },
});

export default SkeletonLoader;

