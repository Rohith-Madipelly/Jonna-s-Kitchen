import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createOrderAPI, verifyOrderAPI } from '../app/utils/ApiCalls'

import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../../Enviornment';


const PayMoney = async (amount) => {
    console.log(`Paying you ${amount}`)
    const Price = parseInt(amount)
    try {
        const order = await createOrderAPI(Price)
        // console.log("Hello >>>",order)
        if (order) {
            console.log("jashj", order.data.order.id)

            const options = {
                key: RAZORPAY_KEY,
                order_id: order.data.order.id,
                // amount: order.data.order.amount,
                amount: 90000,
                currency: order.data.order.currency,
                name: order.data.order.entity,

             
                prefill: {
                    name: "Test User",
                    email: "madipellyrohith@gmail.com",
                    contact: "9951072023",
                },
                notes: {
                    address: "11-24-140,2nd",
                },
                theme: {
                    color: "#3399cc",
                },
            }

            RazorpayCheckout.open(options)
                .then((data) => {
                    console.log("Payment >", data)
                    // verifySignature(data)
                })
                .catch((error) => {
                    console.log("Error in RazorpayCheckout", error,error.response)
                })
        }

    } catch (error) {
        Alert.alert("Error",error)
        console.log(error)
    }
}

// const verifySignature = async (paymentData) => {
//     try {
//         const res = await verifyOrderAPI(paymentData);
//         if (res?.data.message) {
//             console.log(res.data.message)
//             setTimeout(() => {
//                 Alert.alert("Payment Done")
//             }, 2000);
//         }
//     } catch (error) {
//         console.error(">>>>", error.response.data.message)
//         setTimeout(() => {
//             Alert.alert("PaymentFailed")
//         }, 2000);
//         if (error.response.status === 401) {
//             console.error(">>>>", error.response.data.message)
//         }
//         // setFormError("Something went wrong.");

//     }
// };



export default PayMoney

const styles = StyleSheet.create({})



// Working fine