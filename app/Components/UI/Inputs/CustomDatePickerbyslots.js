import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateHelper } from '../../../Utils/DateHelper';
import BookDatePickerModel from '../../ComDateAndTime/BookDatePickerModel';

const CustomDatePickerbyslots = ({
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
    asterisksymbol,
    leftIcon,
    rightIcon,
    boxWidth,
    onChangeText,
    borderColor,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,
    handleChange
}) => {
    const backgroundColor = bgColor || 'white';
    const containerBorder = outlined ? styles.outlined : styles.outlined;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(DateHelper.formatToDate(date));
        // console.log("Date selected:", DateHelper.formatToDate(date));
        console.log("Date selected:",date);
        hideDatePicker();
        handleChange(DateHelper.formatToDate(date))
    };

    return (
        <TouchableOpacity
            style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}
            onPress={showDatePicker}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {label ? (
                        <Text style={[styles.label, labelStyle]}>
                            {label} {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}
                        </Text>
                    ) : null}
                </View>
                {rightLabelBtn ? (
                    <TouchableOpacity onPress={() => console.log("Right label button pressed")}>
                        <Text style={[styles.label, labelStyle, { fontSize: 10, textDecorationLine: 'underline' }]}>
                            {rightLabelBtn}
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            <View style={[styles.container, containerBorder, containerStyle, { borderColor }, { backgroundColor },]}>
                {leftIcon && <View style={{ paddingRight: 8 }}>{leftIcon}</View>}
                {/* <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                /> */}

    <BookDatePickerModel
        visible={isDatePickerVisible}
        title="Select the Date"
        // message="Something went wrong!"
        onSubmit={handleConfirm}
        onClose={hideDatePicker}
      />




                <View style={{flex:1,paddingVertical:5
                    ,justifyContent:'center' }}>
                    <Text style={{}}>
                        {selectedDate ? selectedDate : placeholder || 'Select Date'}
                    </Text>
                </View>
                <View style={{ paddingLeft: 5 }}>{rightIcon}</View>
            </View>
            {errorMessage ? <Text style={{ color: errorColor, fontSize: 12, marginLeft: 15 }}>{errorMessage}</Text> : null}
        </TouchableOpacity>
    );
};

export default CustomDatePickerbyslots;

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
        marginBottom: 4,
        fontFamily: 'BalooTamma2-Bold',
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
     
        borderRadius: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                height: 55,
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
        marginVertical: 5,
    },
    outlined: {
        borderWidth: 1,
    },
});
