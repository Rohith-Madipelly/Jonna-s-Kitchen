import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = (uri) => {
  const source = { uri: uri ? uri : 'https://pdfobject.com/pdf/sample.pdf', cache: true };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfViewer;
