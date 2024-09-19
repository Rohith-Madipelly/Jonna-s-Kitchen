import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React from 'react'

const CustomTextInput = ({
    label,
    rightLabelBtn,
    style,
    labelStyle,
    value,
    placeholder,
    autoComplete,
    containerStyle,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    boxWidth,
    onChangeText,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength

}) => {

    const backgroundColor = bgColor || 'white';
    const containerBorder = outlined ? styles.outlined : styles.standard;
    return (
        <View style={[{ padding: 0,width:boxWidth }, style, styles.boxHeight]}>
            {label?<Text style={[styles.label,labelStyle]}>{label} {asterisksymbol?<Text style={{color:'red'}}>*</Text>:""}</Text>:""}

            
            <View style={[styles.container, containerBorder,containerStyle, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                <View style={{ paddingRight: 7 }}>
                    {leftIcon}
                </View>
                <TextInput
                    placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                    value={value}
                    // placeholderTextColor={"#444"}
                    secureTextEntry={secure}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}

                    onChangeText={onChangeText}

                    onBlur={onBlur}

                    onEndEditing={validate}
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}
                    editable={editable}
                    style={{ flex: 4, }}

                />
                <View style={{ paddingLeft: 5 }}>
                    {rightIcon}
                </View>
            </View>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    label: {
        fontWeight: '400',
        marginBottom: 4,
        textTransform: 'none',
        fontFamily: 'BalooTamma2-Bold',
        fontSize:14
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,


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


    boxHeight: {
        // marginTop:5,
        ...Platform.select({
            ios: {
                // height:80,
                marginVertical:5,
            },
            android: {
                // height:80
            },
        })
    },
    outlined: {
        // borderBottomColor: 'darkgrey',
        // borderColor: 'darkgrey',
        borderWidth: 1,
    }
})