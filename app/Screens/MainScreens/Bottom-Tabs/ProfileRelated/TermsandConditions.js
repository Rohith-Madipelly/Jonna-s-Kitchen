import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TermsandConditions = () => {
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, textDecorationLine: 'underline' }}>Terms and conditions</Text>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07' }}>Note</Text>
      </View>

      <Text style={styles.text}>
        Please read the following terms and conditions carefully. The use of our services is subject to your compliance and acceptance with the following statements. Once you subscribe or use any of our services, you agree that you have read and understood the terms and conditions and are ready to be bound by the below statements.
      </Text>


      <Text style={styles.header}>Post Sharing Meal Plan</Text>
        <Text style={styles.text}>
          Please go through the plan, note down your questions and let us know your available time to connect over the call and explain/clarify things if you have any questions.
        </Text>
        
        <Text style={styles.header}>Important Notes</Text>
        <Text style={styles.text}>
          Please note: – Post starting your diet you will have to send me your start weight picture and weight picture every 3 days once or at least weekly once. This will help us to monitor and track your progress.
        </Text>
        <Text style={styles.text}>
          We would be needing your before and after picture post completion of your Program with us. Note:- For privacy concerns your details will never be disclosed.
        </Text>
        
        <Text style={styles.header}>Meal Plan Adjustments</Text>
        <Text style={styles.text}>
          Based on your previous week weight loss and progress, we will share further meal plans. If there is no weight update, it's not possible for me to share meal plans. We will create meal plans based on your progress only. If there is no weight loss or weight stuck, we will change the meal plan as per your progress.
        </Text>
        <Text style={styles.text}>
          Refund is not possible post sharing meal plans or anytime during the program nor the meal plans are transferred to any other person. We can work on alternatives if anything is not possible in the diet, and I can make the plan simple as per your wish over the chat/call/mail.
        </Text>
        <Text style={styles.text}>
          All your queries should be asked only once a day – plan your day accordingly and check your meal plan one day prior for any alternatives or suggestions.
        </Text>
        <Text style={styles.text}>
          Meal plans will be customized only based on your previous week weight loss. If there is no update, no further meal plans will be shared or I may ask you to repeat the same diet.
        </Text>
        
        <Text style={styles.header}>Program Duration</Text>
        <Text style={styles.text}>
          My consultation is valid only for 6 weeks or 12 weeks based on the program you choose.
        </Text>
        <Text style={styles.text}>
          For example:
        </Text>
        <Text style={styles.text}>
          If you opt program 1: If it starts on 1st Jan and it would end on 15th Feb (6 weeks), within this duration I will be sharing meal plans based on progress. In between this duration, if you follow 6 weeks, I will share 6 weeks meal plan. If not, as per your progress only, it may be 2 or 4, and after 45 days your program expires and you will not be able to get further meal plans or support from Jonnas Kitchen.
        </Text>
        <Text style={styles.text}>
          If you opt program 2: If it starts on 1st Jan and it would end on 1st April (12 weeks), within this duration I will be sharing meal plans based on progress. In between this duration, if you follow 12 weeks, I will share 12 weeks meal plan. If not, as per your progress only, it may be 2 or 4 or 6, etc., and after 90 days your program expires and you will not be able to get further meal plans or support from Jonnas Kitchen.
        </Text>
        
        <Text style={styles.header}>Disclaimer</Text>
        <Text style={styles.text}>
          FOR WHATEVER REASON IF YOU DON’T FOLLOW DIET, WE ARE NOT RESPONSIBLE FOR IT.
        </Text>
        <Text style={styles.text}>
          THESE MEALS ARE SIMPLE AND HOME COOKED FOOD.
        </Text>
        <Text style={styles.text}>
          PROGRAM DURATION CAN'T BE EXTENDED OR PAUSED IN ANY OF THE CASES.
        </Text>
    </ScrollView>
  )
}

export default TermsandConditions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 5,
  },
});
