import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import YoutubePlayer from "react-native-youtube-iframe";
import { YoutubeURL_Id_getIdUrl } from '../../../../Utils/YoutubeURL_Id_getIdUrl';
import Loader1 from '../../../../Utils/Loader1';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';


const VideoViewPage = ({ route }) => {
  const { params } = route;
  const recipieName = params?.recipieName || 'Youtube'
  const recipieUrl = params?.recipieUrl || 'https://www.youtube.com/watch?v=22IEnKGVuUY';
  const [onReady,setOnReady]=useState(false)
  const [playing, setPlaying] = useState(false);
  const navigation = useNavigation();
  const [spinnerBool, setSpinnerbool] = useState(true)


  const [videoID, setVideoID] = useState();

  useEffect(() => {
    setVideoID(YoutubeURL_Id_getIdUrl(recipieUrl))
  }, [])

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(()=>{
    if(onReady){
      setSpinnerbool(false)
    }
  },[onReady])

  return (
    <>
      <Loader1
        visible={spinnerBool}
      />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={styles.container}
        >
          {/* <View style={{ flex: 0.08 }}>
            <CustomToolKitHeader componentName={"Job Postings"} textDecorationLine={'underline'} />
          </View> */}
          <View style={{ flex: 0.32 }}>
           <YoutubePlayer
              // width={200}
              height={300}
              play={playing}
              videoId={videoID}
              onChangeState={onStateChange}
              onReady={()=>{
                
                console.log("loading done .,....")
                setOnReady(true)
              }}
            />
            
          </View>

          <View style={{ flex: 0.5 }}>
            <Text style={{
              textAlign: 'center', fontWeight: '400', fontFamily: 'BalooTamma2-Bold', fontSize: 24,
              color: '#FE7B07',
              marginBottom: -10
            }}>
              {recipieName}
            </Text>


            <View style={{justifyContent:'center',alignItems:'center'}}>
              <CustomButton1
                boxWidth={'50%'}
                onPress={togglePlaying}
                bgColor={`#026F3B`}
                textStyling={{ marginBottom: -5 }}
                style={{ marginTop: 50, }}>{playing ? "pause" : "play"}</CustomButton1>
            </View>
          </View>

        </ImageBackground>
      </View >
    </>
  )
}

export default VideoViewPage


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  UpperBox: {
    flex: 0.6
  },
  ContentBox: {
    flex: 0.4,
    backgroundColor: '#F6F8FE',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',



    // paddingTop: 36,
    paddingHorizontal: 17
  }
})





