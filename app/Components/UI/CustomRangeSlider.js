import Slider from '@react-native-community/slider';
import React, { useState } from 'react'
import { Text, View } from 'react-native';

function CustomRangeSlider({ RangeData, min, max, LRpadding, single, callback }) {
    // const { min, max, LRpadding, single, callback } = props;

    // console.log("Data vahinda ?", RangeData.length)

    const ScaleNumDisplayer = ({ value, printValue }) => {
        // console.log(printValue)
        let data = printValue ? printValue : 0
        let condition = data.toString().length === 1;
        // console.log(condition,value)

        if (condition) {
            return (
                <View>
                    <Text style={{ marginRight: 2 * (2 - value), color: '#474464' }}>{printValue}</Text>
                </View>
            )
        }
        else {
            return (
                <View>
                    <Text style={{ marginRight: 2 * (2 - value) + 5, color: '#474464' }}>{printValue}</Text>
                </View>
            )
        }



        // return (
        //     <View>
        //         <Text style={{ marginRight: value > 10 ? 20:0}}>{printValue}</Text>
        //         <Text style={{ marginRight: value > 2 ? 20:5}}>{printValue}</Text>
        //     </View>
        // )

    }
    const RenderScale = () => {
        const ScaleArray = []
        for (let i = 0; i <= RangeData.length; i++) {
            ScaleArray.push(
                <ScaleNumDisplayer
                    key={i}
                    value={i}
                    printValue={RangeData[i]}
                />
            )

        }
        return ScaleArray
    }


    const [selected, setSelected] = useState()
    return (
        <View>
            <Slider
                style={{ width: 300, height: 40, marginHorizontal: 0, paddingHorizontal: 0 }}
                step={1}
                minimumValue={0}
                maximumValue={RangeData.length - 1}
                minimumTrackTintColor="#4A3AFF"
                maximumTrackTintColor="#B0B0C1"
                thumbTintColor="#4A3AFF"
                value={selected}
                onValueChange={setSelected}
                // snapped={true}
                // lowerLimit={1}
                // upperLimit={64}
                // onSlidingStart={(e)=>{console.log("onSliding Started ",e)}}
                // onValueChange={(e)=>{console.log("onValue Change ",e)}}
                // onSlidingComplete={(e)=>{console.log(e)}}

                tapToSeek={true}

            // vertical
            // inverted
            // disabled
            // maximumTrackImage={require('../assets/favicon.png')}
            // minimumTrackImage={require('../assets/favicon.png')}
            // thumbImage={require('../assets/favicon.png')}

            // trackImage={require('../assets/favicon.png')}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10 }}>
                <RenderScale />
            </View>
            {/* <Text>selected Value{RangeData[selected]}</Text> */}
        </View>
    )
}

export default CustomRangeSlider
