import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

export default function AutoScrollCarousels({ CarouselsData, transitionDelay, CarouselsStyling, imageStyling }) {
  const scrollRef = useAnimatedRef();
  const scroll = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(scrollRef, scroll.value * width, 0, false);
  });

  useEffect(() => {
    let interval1, interval2;
    interval2 = setTimeout(() => {
      (function moveRow(delay) {
        scroll.value =
          scroll.value === CarouselsData.length - 1
            ? 0
            : withSpring(scroll.value + 1, springConfig(0));

        interval1 = setTimeout(() => {
          moveRow(scroll.value === CarouselsData.length - 1 ? 0 : transitionDelay);
        }, delay);
      })(transitionDelay);
    }, transitionDelay);
    return () => {
      if (interval1) clearTimeout(interval1);
      if (interval2) clearTimeout(interval2);
    };
  }, []);

  return (
    <Animated.ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}>
      {CarouselsData.map(x => (
        <View style={[CarouselsStyling]} key={x.id}>
          <Image style={imageStyling}
            source={x.image}
            animation={"bounceIn"}
            // resizeMode={"contain"}
            contentFit="cover" 
            />
            {/* <View style={{backgroundColor:"pink",width:80,height:80}}></View> */}
        </View>
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    width:'100%'
  },
  item: {

  },
  txt: {
    fontSize: 20,
    color: 'black',
  },
});

const springConfig = velocity => {
  'worklet';
  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};




// const PregnancyStoriesData = [
//   { id: 1, label: '1', image: require("../../assets/Images/Carousels/Successful Pregnancy Stories.png") },
//   { id: 2, label: '1', image: require("../../assets/Images/Carousels/Successful Pregnancy Stories.png") },
// ]



{/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
<AutoScrollCarousels CarouselsData={PregnancyStoriesData}
 CarouselsStyling={{
     height: 180, width: width*0.9, justifyContent: 'center', alignItems: 'center', marginBottom: 10,
 }}
 transitionDelay={2000} imageStyling={{ width: "96%", height: 159, borderRadius: 15,marginLeft:4 }} />
</View> */}