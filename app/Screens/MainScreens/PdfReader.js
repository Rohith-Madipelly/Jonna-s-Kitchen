import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Pdf from 'react-native-pdf';
import CustomToaster from '../../Utils/CustomToaster';

const PdfReader = ({ route }) => {
  const { params } = route;
  const initialPdfURL = params?.pdfURL || 'https://gbihr.org/images/docs/test.pdf';
  
  // State to manage the current PDF URL
  const [pdfURL, setPdfURL] = useState(initialPdfURL);
  const pdfRef = useRef();

  // Resource object for the PDF
  const PdfResource = { uri: pdfURL, cache: true };

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
          console.log(error)
          CustomToaster(error.message)
          // On error, set a new PDF URL to open a different PDF
          // setPdfURL('https://gbihr.org/images/docs/test.pdf'); // Replace with your fallback PDF URL
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PdfReader;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
