import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Platform } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const CustomDropdownError = ({
    label,
    style,
    labelStyle,
    value,
    placeholder = 'Select',
    onChange,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    boxWidth,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,
    items,
    selectedValue,
    DropDownData,
    DropDownHeigth,
}) => {

    const backgroundColor = bgColor || 'white';
    const containerBorder = styles.outlined;

    return (
        <View style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <SelectDropdown
                data={DropDownData.length > 0 ? DropDownData : [{ startTime: '', endTime: 'No data available' }]}
                onSelect={(selectedItem, index) => {
                    if (DropDownData.length > 0) {
                        onChange(selectedItem.slotTimeStartToEnd);
                    }
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={[styles.container, styles.DropContainer, containerBorder, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                            {selectedItem ? selectedItem.image ?
                                <Image
                                    source={selectedItem.image}
                                    style={{ width: 40, height: 35, resizeMode: 'center' }}
                                /> : null : null}

                            <Text style={styles.dropdownButtonTxtStyle} numberOfLines={1}>
                                {(selectedItem && `${selectedItem.slotTimeStartToEnd}`) || placeholder}
                            </Text>
                            <FontAwesome name={isOpened ? 'caret-up' : 'caret-down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    // return item.startTime === '' && item.endTime === 'No data available' ? (
                    //     <View style={styles.noDataItemStyle}>
                    //         <Text style={styles.noDataTextStyle}>No slot available</Text>
                    //     </View>
                    // ) : (
                    return(
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                            {/* {item.image ? <Image source={item.image} style={{ width: 40, height: 35, resizeMode: 'center' }} /> : <View style={{ height: 35 }} />} */}
                            <Text style={[styles.dropdownItemTxtStyle]}>{item.slotTimeStartToEnd}</Text>
                            {/* <Image source={isSelected ? require('./selected.png') : require('./unselected.png')} style={{ width: 25, height: 25 }} /> */}
                        </View>
                    );
                }}
                dropdownStyle={[styles.dropdownMenuStyle]}
            />
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
        </View>
    );
};

export default CustomDropdownError;

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
        paddingVertical: 12,
        ...Platform.select({
            ios: {},
            android: { paddingVertical: 12 },
        }),
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: { elevation: 5 },
        }),
    },
    DropContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    dropdownButtonTxtStyle: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
        flex: 1,
        marginHorizontal: 10,
    },
    dropdownButtonArrowStyle: {
        fontSize: 25,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: 'center',
        paddingVertical: 12,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 10,
    },
    dropdownMenuStyle: {
        borderRadius: 8,
        backgroundColor: 'red',
        ...Platform.select({
            ios: {},
            android: {
                marginTop: -30,
            },
        }),
    },
    boxHeight: {
        ...Platform.select({
            ios: { marginVertical: 5 },
            android: {},
        }),
    },
    outlined: {
        borderColor: '#48484A',
        borderWidth: 0.9,
        borderCurve: 50,
    },
    noDataItemStyle: {
        padding: 10,
        height:75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataTextStyle: {
        color: 'gray',
        fontSize: 14,
    },
});
