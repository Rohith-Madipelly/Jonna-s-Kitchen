import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { logoutValidation } from '../../../../Utils/LogOut';
import { OpenDialer } from '../../../../Utils/OpenDialer';


const ListItem = ({ leftIcon, ItemName, routeTo }) => {


  return (
    <TouchableOpacity onPress={routeTo} style={{ flexDirection: 'row', height: 28, marginVertical: 10 }}>
      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Feather name="phone" size={15} color="black" /> */}
        <Image style={{ width: 24, height: 24, }}
          source={leftIcon}
          resizeMode={"contain"} />
      </View>
      <View style={{ flex: 0.8, justifyContent: 'center', marginLeft: 10, }}>
        <Text style={{ color: '#626262', fontFamily: 'BalooTamma2', fontSize: 16, fontWeight: '700' }}>{ItemName}</Text>
      </View>
      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <SimpleLineIcons name={'arrow-right'} size={18} color={'black'} /> */}
        <Image style={{ width: 24, height: 24, }}
          source={require("../../../../assets/Images/Arrow.png")}
          resizeMode={"contain"} />
      </View>
    </TouchableOpacity>
  ) 
}
const ProfilePage = () => {

  const navigation = useNavigation();
  // const dispatch = useDispatch()


  const menuItems = [

    {
      title: 'Account',
      subItems: [
        { title: 'Program Status', logo: require("../../../../assets/Images/ProfileIcons/ProgramStatus.png"), onPress: () => navigation.navigate('ProgramStatus') },
        { title: 'My Programs', logo: require("../../../../assets/Images/ProfileIcons/MyPrograms.png"), onPress: () => navigation.navigate('MyPrograms') },
        { title: 'Feedback', logo: require("../../../../assets/Images/ProfileIcons/Feedback.png"), onPress: () => navigation.navigate('Feedback') },
        { title: 'Contact Us?', logo: require("../../../../assets/Images/ProfileIcons/ContactUs.png"), onPress: () => OpenDialer('9951072005') },
      ],
    },
    {
      title: 'Other',
      subItems: [
        { title: 'Privacy policy', logo: require("../../../../assets/Images/ProfileIcons/Privacypolicy.png"), onPress: () => navigation.navigate('BankdetailsProfile') },
        { title: 'Terms and Conditions', logo: require("../../../../assets/Images/ProfileIcons/TermsandConditions.png"), onPress: () => console.log('Custom remainder pressed') },
        { title: 'Logout', logo: require("../../../../assets/Images/ProfileIcons/Logout.png"), onPress: () => logoutValidation()},
    ],
    },

  ];

  // console.log(menuItems[0].subItems)
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.15 }}>
        <View style={{ flexDirection: 'row', marginHorizontal: 32, marginVertical: 32, justifyContent: 'space-between' }}>
          <View style={{ flex: 0.15, width: 44, height: 44, backgroundColor: '#FE7B07', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 32 }}>P</Text>
          </View>
          <View style={{ flex: 0.80 }}>

            <Text style={{ color: '#FE7B07', fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 14 }}>Pardhu</Text>
            <Text><Feather name="phone" size={15} color="black" />99866 50042</Text>
          </View>
        </View>
      </View>

      <View style={[{ flex: 0.35,justifyContent:'center', paddingHorizontal: 10 }]}>
        <View style={[{}, styles.container]}>
          <FlatList
            data={menuItems[0].subItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem ItemName={item.title} leftIcon={item.logo} routeTo={item.onPress} />
            )}
          />
        </View>
      </View>

      <View style={[{ flex: 0.3,justifyContent:'center', paddingHorizontal: 10 }]}>
        <View style={[{}, styles.container]}>
          <FlatList
            data={menuItems[1].subItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem ItemName={item.title} leftIcon={item.logo} routeTo={item.onPress} />
            )}
          />
        </View>
      </View>



    </View>
  )
}

export default ProfilePage

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