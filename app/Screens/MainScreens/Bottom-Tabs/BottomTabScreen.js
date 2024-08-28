// BottomTabScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, AntDesign, } from "@expo/vector-icons";

import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import Home from './Home.js';
import Chat from './Chat.js';
import Recipe from './Recipe.js';
import More from './More.js';
import Profile from './Profile.js';



import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const BottomTabScreen = ({ route }) => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          // height: 55,
          // flex: 0.102,
          flex: Platform.OS === "ios" ? 0.08 : 0.102,

          // backgroundColor: '#006AFF',
        
        //  borderStartStartRadius:50,
        //  borderStartEndRadius:50

          backgroundColor: 'white'


        },

        tabBarIcon: ({ focused, size, colour }) => {
          let iconName;
          if (route.name === "Home") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{
                flexDirection: 'column', alignItems: 'center', paddingTop: 5,
                width: '100%', height: '100%',
                // backgroundColor: focused ? "rgba(74, 58, 255, 0.14)" : "",
                // borderTopWidth: focused ? 2 : 0, borderColor: 'rgba(74, 58, 255, 1)'
              }}>
                {/* <Fontisto name="search" size={24} color={colour} /> */}
                {/* <Text>Profile</Text> */}
                {focused ? <Image source={require('../../../assets/Images/TabIcons/Home.png')} style={{ width: 36, height: 36 }} /> : <Image source={require('../../../assets/Images/TabIcons/HomeD.png')} style={{ width: 36, height: 36 }} />}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "black" }}>Home</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#FE7B07" : "black" }}></Text>} */}
                <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "#555555" }}>Home</Text>
              </View>)

          }
          else if (route.name === "Recipe") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{
                flexDirection: 'column', alignItems: 'center', paddingTop: 5,
                width: '100%', height: '100%',
                //  backgroundColor: focused ? "rgba(74, 58, 255, 0.14)" : "", 
                //   borderTopWidth: focused ? 2 : 0, borderColor: 'rgba(74, 58, 255, 1)' 
              }}>
                {/* <Fontisto name="search" size={24} color={colour} /> */}
                {/* <Text>Profile</Text> */}
                {focused ? <Image source={require('../../../assets/Images/TabIcons/RecipeD.png')} style={{ width: 36, height: 36 }} /> : <Image source={require('../../../assets/Images/TabIcons/Recipe.png')} style={{ width: 36, height: 36 }} />}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "black" }}>Recipe</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#FE7B07" : "black" }}></Text>} */}
                <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "#555555" }}>Recipe</Text>
              </View>)
          }

          else if (route.name === "Chat") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{
                flexDirection: 'column', alignItems: 'center', paddingTop: 5,
                width: '100%', height: '100%',
                //  backgroundColor: focused ? "rgba(74, 58, 255, 0.14)" : "", 
                //   borderTopWidth: focused ? 2 : 0, borderColor: 'rgba(74, 58, 255, 1)' 
              }}>
                {/* <Fontisto name="search" size={24} color={colour} /> */}
                {/* <Text>Profile</Text> */}
                {focused ? <Image source={require('../../../assets/Images/TabIcons/ChatD.png')} style={{ width: 36, height: 36 }} /> : <Image source={require('../../../assets/Images/TabIcons/Chat.png')} style={{ width: 36, height: 36 }} />}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "black" }}>Recipe</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#FE7B07" : "black" }}></Text>} */}
                <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "#555555" }}>Chat</Text>
              </View>)
          }
          else if (route.name === "More") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{
                flexDirection: 'column', alignItems: 'center', paddingTop: 5,
                width: '100%', height: '100%',
                // backgroundColor: focused ? "rgba(74, 58, 255, 0.14)" : "",
                //  borderTopWidth: focused ? 2 : 0, borderColor: 'rgba(74, 58, 255, 1)'
              }}>
                {/* <Fontisto name="search" size={24} color={colour} /> */}
                {/* <Text>Profile</Text> */}
                {focused ? <Image source={require('../../../assets/Images/TabIcons/MoreD.png')} style={{ width: 36, height: 36 }} /> : <Image source={require('../../../assets/Images/TabIcons/More.png')} style={{ width: 36, height: 36 }} />}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "black" }}>More</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#FE7B07" : "black" }}></Text>} */}
                <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "#555555" }}>More</Text>
              </View>)
          }

          else if (route.name === "Profile") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{
                flexDirection: 'column', alignItems: 'center', paddingTop: 5,
                width: '100%', height: '100%',
                // backgroundColor: focused ? "rgba(74, 58, 255, 0.14)" : "", 
                // borderTopWidth: focused ? 2 : 0, borderColor: 'rgba(74, 58, 255, 1)' 
              }}>
                {/* <Fontisto name="search" size={24} color={colour} /> */}
                {/* <Text>Profile</Text> */}
                {focused ? <Image source={require('../../../assets/Images/TabIcons/ProfileD.png')} style={{ width: 36, height: 36 }} /> : <Image source={require('../../../assets/Images/TabIcons/Profile.png')} style={{ width: 36, height: 36 }} />}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "black" }}>Profile</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#FE7B07" : "black" }}></Text>} */}
                <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#FE7B07" : "#555555" }}>Profile</Text>
              </View>)
          }

        }
      })}>


      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false, // Show the header
        // headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        // headerLeft: () => (
        // <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
        //   <AntDesign name="arrowleft" size={24} color="black" />
        // </TouchableOpacity>
        // ),
      }} />



      <Tab.Screen name="Chat" component={Chat} options={{
        headerShown: false, // Show the header
        // headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ),
      }} />


      <Tab.Screen name="Recipe" component={Recipe} options={{
        headerShown: false, // Show the header
        // headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ),
      }} />



      <Tab.Screen name="More" component={More} options={{
        // headerShown: true, // Show the header
        headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ),
      }} />


      <Tab.Screen name="Profile" component={Profile} options={{
        // headerShown: true, // Show the header
        headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ),
      }} />

    </Tab.Navigator>
  );
};

export default BottomTabScreen;



















