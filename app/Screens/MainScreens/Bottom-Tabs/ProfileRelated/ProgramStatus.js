import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProgramStatus = () => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, textDecorationLine: 'underline' }}>Program Status</Text>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07' }}>Note</Text>
      </View>

      <View style={{ marginTop: 15 }}>
        {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize:16,color:'#FE7B07'}}>Note</Text> */}
        <View style={[{ justifyContent: 'space-between', paddingHorizontal: 2, flexDirection: 'row', alignItems: 'center' }]}>
          <View style={[{}, styles.container]}>
            <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>Starting Date</Text>
            <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>18-06-2024</Text>
          </View>
          <View style={[{}, styles.container]}>
            <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>End Date</Text>
            <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>18-06-2024</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

export default ProgramStatus

const styles = StyleSheet.create({

  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,


    ...Platform.select({
        ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        android: {
            elevation: 2,
        },
    }),


},
})