import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Pdf from 'react-native-pdf';
// import { cache } from 'npm'

const PdfReader = ({PdfURL}) => {
  const PdfResource={uri:'https://pdfobject.com/pdf/sample.pdf',cache:true}
  const pdfRef = useRef();
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        ref={pdfRef} 
        source={PdfResource}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  )
}

export default PdfReader

const styles = StyleSheet.create({
  container:{
    flex:0.8
  },
  pdf:{
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
})