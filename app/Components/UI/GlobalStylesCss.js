import { StyleSheet,Platform,  } from 'react-native'

export const SettingStyleing= StyleSheet.create({

    ImageBackgroundSettings:{
        paddingTop:Platform.OS==='android'?30:0
    } 
})