import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StarRating = () => {
    const [rating, setRating] = useState(0); // Current rating
    const [isModalVisible, setModalVisible] = useState(false); // Modal visibility
    const navigation = useNavigation()
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const submitRating = () => {
        toggleModal();
        // Here you can handle the submitted rating (e.g., send it to an API)
        console.log(`Submitted rating: ${rating} stars`);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Ionicons
                        name={i <= rating ? "star" : "star-outline"}
                        size={40}
                        color={i <= rating ? "#FFD700" : "#999"}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };



    useEffect(() => {
        toggleModal()
    }, [])
    return (
        <View style={styles.container}>
            {/* <Button title="Give Feedback" onPress={toggleModal} /> */}

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Rate your experience</Text>
                        <View style={styles.starContainer}>{renderStars()}</View>
                        <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => { navigation.goBack() }}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelText: {
        color: '#dc3545',
        fontSize: 16,
    },
});

export default StarRating;
