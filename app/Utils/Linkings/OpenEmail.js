import React from 'react';
import { Button, View, Linking, Alert, StyleSheet } from 'react-native';

export const openEmail = (email,subject,body) => {
//   const email = 'madipellyrohith@gmail.com';
//   const subject = 'Applying for Position';
//   const body = 'Dear [Hiring Manager],\n\nI would like to apply for the position. Please find my details below.\n\nBest regards,\n[Your Name]';

  const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  Linking.canOpenURL(mailtoURL)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'Email client is not available on this device.');
      } else {
        Linking.openURL(mailtoURL);
      }
    })
    .catch((err) => console.error('Error opening email client:', err));
};

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Button title="Apply via Email" onPress={openEmail} />
//     </View>
//   );
// }


