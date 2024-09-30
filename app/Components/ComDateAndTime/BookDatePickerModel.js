

import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';


import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { Get_All_Slots_API } from '../../Utils/ApiCalls';

// Helper function to convert DD-MM-YYYY to YYYY-MM-DD
const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
};

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};

const BookDatePickerModel = ({ visible, title, message, onClose, onSubmit }) => {


    const apiResponse = [
        {
            id: "66ee5b0ad9a5a64f828fd8fd",
            slotDate: "21-09-2024",
            slotTimeArray: [
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" },
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" }
            ]
        },
        {
            id: "66ee5b0ad9a5a64f828fd8fe",
            slotDate: "22-09-2024",
            slotTimeArray: [
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" },
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" }
            ]
        },
        {
            id: "66ee5b0ad9a5a64f828fd8ff",
            slotDate: "23-09-2024",
            slotTimeArray: [
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" },
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" }
            ]
        },
        {
            id: "66ee5b0ad9a5a64f828fd900",
            slotDate: "24-09-2024",
            slotTimeArray: [
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" },
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" }
            ]
        },
        {
            id: "66ee5b0ad9a5a64f828fd901",
            slotDate: "25-09-2024",
            slotTimeArray: [
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" },
                { id: null, slotTimeStartToEnd: "01:00 AM to 02:00 AM" }
            ]
        }
    ];


    const [selectedDate, setSelectedDate] = useState('');
    const [dateTextMapping, setDateTextMapping] = useState({});
    const todayDate = getTodayDate(); // Get today's date for comparison


    const [spinnerBool, setSpinnerbool] = useState(false)
    let tokenn = useSelector((state) => state.login.token)
    const [PrivacyText, setPrivacyPolicy] = useState([])
    const dispatch = useDispatch()

    const getAllSlots = async () => {
        setSpinnerbool(true)
        try {
            const res = await Get_All_Slots_API(tokenn)
            setPrivacyPolicy(res.data)
        } catch (error) {
            console.log("Error ..", error)
            Alert.alert("No Slots found")
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401.", error.response.data)
                    ServerTokenError_Logout(undefined, undefined, dispatch)
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("error.response.status login", error.response)
                }
                else if (error.response.status >= 500) {
                    // console.log("Internal Server Error", error.message)
                    ServerError(undefined, `${error.message}`)
                }
                else {
                    console.log("An error occurred response.>>", error)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }
            else {
                console.log("Error in Setting up the Request.", error)
            }

        } finally {
            setSpinnerbool(false)
        }

    }


    useEffect(() => {
        getAllSlots()
    }, [])
    // For Time >start 

    const [selectedSlots, setSelectedSlotTiming] = useState([]);



    // For Time >end 

    // Mock API response


    const handleDayPress = (day) => {
        if (day.dateString !== todayDate && dateTextMapping[day.dateString] !== undefined) {
            setSelectedDate(day.dateString);
        }
    };
    // Determine the color based on slot count
    const getSlotColor = (slots) => {
        if (slots < 4) return 'red'; // Less than 4 slots -> Red
        if (slots === 4) return 'orange'; // 4 slots -> Orange
        if (slots === 5) return 'yellow'; // 5 slots -> Yellow
        return 'green'; // More than 5 slots -> Green
    };

    // Fetch and process the API data
    useEffect(() => {
        const updatedMapping = {};
        PrivacyText.forEach((item) => {
            console.log("<><><><><><><><><><><><><><><><><><><><")
            console.log(item)
            console.log("<><><><><><><><><><><><><><><><><><><><")
            const formattedDate = convertDateFormat(item.slotDate);
            updatedMapping[formattedDate] = item.slotTimeArray.length; // Count of slots
        });
        setDateTextMapping(updatedMapping);
    }, [PrivacyText]);






    return (
        <View>

            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
                onRequestClose={onClose}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertTitle}>{title}</Text>
                        {/* <Text style={styles.alertMessage}>{message}</Text> */}
                        <View style={{}}>
                            <Calendar
                                // Customize the day component to display custom text
                                dayComponent={({ date, state }) => {
                                    const slotCount = dateTextMapping[date.dateString]; // Get slot count
                                    const isDateEnabled = slotCount !== undefined && date.dateString !== todayDate; // Disable today

                                    const displayText = isDateEnabled ? `${slotCount} ${slotCount > 1 ? 'slots' : 'slot'}` : '';
                                    const slotColor = isDateEnabled ? getSlotColor(slotCount) : null;

                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.dayContainer,
                                                !isDateEnabled ? styles.disabledDay : null, // Style for disabled days
                                                selectedDate === date.dateString ? styles.selectedDay : null, // Style for selected dates
                                            ]}
                                            disabled={!isDateEnabled} // Disable touch if date is not enabled
                                            onPress={() => handleDayPress(date)}
                                        >
                                            <Text style={[styles.dayText, !isDateEnabled ? styles.disabledText : null]}>
                                                {date.day}
                                            </Text>
                                            {displayText ? (
                                                <Text style={[styles.customText, { color: slotColor }]}>
                                                    {displayText}
                                                </Text>
                                            ) : null}
                                        </TouchableOpacity>
                                    );
                                }}
                                // Disable navigation to past dates
                                minDate={'2024-09-22'}
                                monthFormat={'MMMM yyyy'}
                                hideExtraDays={true}
                                onPressArrowLeft={subtractMonth => subtractMonth()}
                                onPressArrowRight={addMonth => addMonth()}
                                enableSwipeMonths={true}
                            />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.alertButton} onPress={onClose}>
                                <Text style={styles.buttonText}>cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.alertButton} onPress={() => {
                                if (selectedDate) {
                                    onSubmit(selectedDate)
                                } else {
                                    Alert.alert("Please select any date")
                                }
                                // onSubmit()
                            }}>
                                <Text style={styles.buttonText}>ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>





        </View>
    );
};

const styles = StyleSheet.create({


    // Styles for the date picker

    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    dayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red',
        padding: 5,
        width: 42,
        height: 42,
        marginVertical: -4
    },
    dayText: {
        fontSize: 16,
        color: '#000',
    },
    disabledDay: {
        // backgroundColor: '#f0f0f0', // Grey out the disabled dates
    },
    disabledText: {
        color: '#d9e1e8', // Greyed out text for disabled dates
    },
    selectedDay: {
        backgroundColor: '#d3e0f0',
        borderRadius: 10,
    },
    customText: {
        fontSize: 10,
        textAlign: 'center',
    },
    // end Styles for the date picker

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        width: 320,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    alertButton: {
        // backgroundColor: '#2196F3',
        // padding: 10,
        // borderRadius: 5,
    },
    buttonText: {
        // color: '#fff',
        color: '#2196F3',
        // fontWeight: 'bold',
        fontSize: 16,
    },
});

export default BookDatePickerModel;






//


// How to use 



// const [BookDateAlertVisible, setBookDateAlertVisible] = useState(true);

// const showAlert = () => {
//   setBookDateAlertVisible(true);
// };

// const closeAlert = () => {
//   setBookDateAlertVisible(false);
// };


{/* <BookDatePickerModel
visible={BookDateAlertVisible}
title="Select the Date"
// message="Something went wrong!"
onClose={closeAlert}
/> */}