import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';

const CustomFileInput = ({
    label,
    style,
    onSelectFile,
    boxWidth,
    borderColor,
    bgColor,
    errorColor = 'red',
    errorMessage,

    value,
    placeholder,
    autoComplete,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    // boxWidth,
    onChangeText,
    // borderColor,
    secure,
    validate,
    editable,

}) => {
    const backgroundColor = bgColor || 'white';
    // const containerBorder = outlined ? styles.outlined : styles.standard;
    const containerBorder = outlined ? styles.outlined : styles.outlined;


    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            onSelectFile(result);
        } catch (error) {
            console.log('Error picking file:', error);
        }
    };

    return (
        <View style={[{ padding: 0, width: boxWidth,marginTop:20 }, style]}>
            {label && (
                <Text style={styles.label}>
                    {label}  {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}
                </Text>
            )}

            <TouchableOpacity
                onPress={handleFilePick}
                style={[
                    styles.container,containerBorder,
                    { borderColor: borderColor, backgroundColor: backgroundColor },
                ]}
            >
                   <View style={{ height: 28, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#8E8E93' }}>{placeholder}</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
        </View>
    );
};

export default CustomFileInput;

const styles = StyleSheet.create({
    label: {
        fontWeight: '400',
        marginBottom: 10,
        textTransform: 'none',
        color: '#474464',
    },
    container: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        borderWidth: 0.9,
        borderColor: '#48484A',



                // ...Platform.select({
        //     ios: {
        //         shadowColor: 'black',
        //         shadowOffset: { width: 0, height: 2 },
        //         shadowOpacity: 0.2,
        //         shadowRadius: 4,
        //     },
        //     android: {
        //         elevation: 2,
        //     },
        // }),

    },
    outlined: {
        borderBottomColor: '#48484A',
        borderColor: '#48484A',
        borderWidth: 0.9,
        borderCurve: 50,
    }
});
