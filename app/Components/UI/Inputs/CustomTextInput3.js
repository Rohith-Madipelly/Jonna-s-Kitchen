import { StyleSheet, Text, TextInput, View, Platform, Pressable } from 'react-native'
import React from 'react'

// default, number-pad, decimal-pad, numeric, email-address, phone-pad, url

const CustomTextInput3 = ({
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
    maxLength,

}) => {

    const backgroundColor = bgColor || 'white';
    // const containerBorder = outlined ? styles.outlined : styles.standard;
    const containerBorder = outlined ? styles.outlined : styles.outlined;

    return (
        <View style={[{ padding: 0, width: boxWidth}, style, styles.boxHeight]}>
            <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                <View>
                    {label ? <Text style={[styles.label, labelStyle]}>{label} {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}</Text> : ""}
                </View>
                {rightLabelBtn?<Pressable onPress={()=>{console.log("hello")}}>
                    {label ? <Text style={[styles.label, labelStyle,{fontSize:10,textDecorationLine:'underline'}]}>{rightLabelBtn} </Text> : ""}
                </Pressable>:""}
            </View>
            <View style={[styles.container, containerBorder,containerStyle, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                {leftIcon ? <View style={{ paddingRight: 8 }}>
                    {leftIcon}

                </View> : ""}
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
                    maxLength={maxLength}
                    onEndEditing={validate}
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}
                    editable={editable}
                    style={{ flex: 4, height: '130%' }}

                />
                <View style={{ paddingLeft: 5}}>
                    {rightIcon}
                </View>
            </View>
            <Text style={{ color: errorColor, fontSize:12,marginLeft: 15 }}>{errorMessage}</Text>
            {/* {errorMessage?<Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>:<View style={{height:10}}></View>} */}
        </View>
    )
}

export default CustomTextInput3

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
        marginBottom: 4,
        textTransform: 'none',
        fontFamily: 'BalooTamma2-Bold',
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 20,

        ...Platform.select({
            ios: {
                height: 55
            },
            android: {
                // height:80
            },
        }),

        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
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