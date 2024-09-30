

import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const BookTimeSelectModel = ({ selectedDate, visibleTimePicker, messageTitle, messageTime, onCloseTime, onSubmitTime, selectedSlots }) => {
   const [selectTimeList,setSelectTimeList]=useState([selectedSlots])

    if (!selectedSlots) {
        return;
    }
    // Function to render time slots in the modal
    const renderSlot = ({ item }) => {
        console.log(">>>",item)

        return (
            <View style={styles.slotContainer}>
                <Text>{item.slotTimeStartToEnd}</Text>
            </View>
        )

    };


    const [timeSlotModelVisible, setTimeSlotModelVisible] = useState(false);
    return (
        <Modal
            // transparent={true}
            visible={visibleTimePicker}
            // animationType="fade"
            onRequestClose={onCloseTime}
            animationType="slide"
        >
            <View style={styles.modalBackground}>
                <View style={styles.alertContainer}>
                    <Text style={styles.alertTitle}>pick time</Text>
                    <Text>{visibleTimePicker ? "True" : "false"}bd</Text>
                    {/* <Text style={styles.alertMessage}>{messageTime}</Text> */}
                    <View style={{}}>
                        <View style={styles.modalContainer}>
                            <Button title="Close Slots" onPress={() => setTimeSlotModelVisible(false)} />
                            <Text style={styles.slotTitle}>Available Slots on {selectedDate}</Text>
                            <FlatList
                                data={selectTimeList}
                                renderItem={renderSlot}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.alertButton} onPress={() => { onCloseTime() }}>
                            <Text style={styles.buttonText}>cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.alertButton} onPress={() => { onSubmitTime() }}>
                            <Text style={styles.buttonText}>ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // for time picker
    slotContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    // Styles for the date picker
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    messageTitle: {
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

export default BookTimeSelectModel;






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
visibleTimePicker={BookDateAlertVisible}
messageTitle="Select the Date"
// messageTime="Something went wrong!"
onCloseTime={closeAlert}
/> */}