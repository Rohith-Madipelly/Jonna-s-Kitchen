import {
    Button,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Client } from '@stomp/stompjs';
import 'text-encoding';
import moment from 'moment';

import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader';
import CustomTextInput from '../../../Components/UI/Inputs/CustomTextInput';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { BASE_URL } from '../../../Enviornment';
import { useDispatch, useSelector } from 'react-redux';
import { ServerError, ServerTokenError_Logout } from '../../../Utils/ServerError';
import Loader1 from '../../../Utils/Loader1';
import { GET_CHAT_USER_API, PREVIOUS_CHAT_API, Send_Call_Request_API } from '../../../Utils/ApiCalls';
import UploadModel from '../../../ModelsAlerts/UploadModel';
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage';
import ImagePreviewerModel from '../../../Components/UI/ImagePreviewer';
import Wapper from '../../../Components/UI/Wapper';
import { CustomAlerts_Continue } from '../../../Utils/CustomReuseAlerts';
import CustomToaster from '../../../Utils/CustomToaster';

const Chat = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const reconnectDelay = useRef(2500);
    const isReconnecting = useRef(false);
    const flatListRef = useRef();
    const [refreshing, setRefreshing] = useState(false);
    const webSocketUrl = `${BASE_URL}/jonnas-chat`;



    const [alertVisible, setAlertVisible] = useState(false);

    const showAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    // For previous code start 
    const [spinnerBool, setSpinnerbool] = useState(false)
    let tokenn = useSelector((state) => state.login.token)
    const [previousChatData, setPreviousChatData] = useState([])
    const [chatPage, setChatPage] = useState(1)
    const dispatch = useDispatch()

    const [UserData, setUserData] = useState()
    const [PreViewerModel, setPreViewerModel] = useState(false);
    const [ImagePreviewerData, setImagePreviewerData] = useState()


    const showAlertPreViewerModel = (e) => {
        setPreViewerModel(true);
        // onClose()
        setImagePreviewerData(e)
    };
    const closeAlertPreViewerModel = () => {
        setPreViewerModel(false);
    };

    const onSubmitPreViewerModel = () => {
        setPreViewerModel(false);
        //   onClose()
    };



    useEffect(() => {
        getUserDeatils()
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // getPreviousChat()
        getUserDeatils()


        setTimeout(() => {
            setRefreshing(false);
        }, 2000)

    }, []);









    const getUserDeatils = async () => {
        // setSpinnerbool(true)
        try {
            const res = await GET_CHAT_USER_API(tokenn)
            console.log("dsw", res.data)
            if (res.data) {
                setUserData(res.data)
                setTimeout(() => {
                    getPreviousChat(res.data,false)
                }, 500);
            }
      
 

        } catch (error) {
            console.log("Error ..", error)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401.", error.response.data)
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("error.response.status login", error.response)

                    // ServerTokenError_Logout(undefined, undefined, dispatch)
                }
                else if (error.response.status >= 500) {
                    console.log("Error >>>", error.response.status,)
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


    const getPreviousChat = async (UserData,chatPage,errorin404) => {
        setSpinnerbool(true)
        console.log("UserData.userId, UserData.employeeId, page = 1, tokenn", UserData.userId, UserData.employeeId, page = chatPage, tokenn)
        try {
            const res = await PREVIOUS_CHAT_API(UserData.userId, UserData.employeeId, chatPage?chatPage:1, tokenn)
            if (res.data) {
                setTimeout(() => {
                    setMessages((prevMessages) => [...res.data]);
                }, 1000);
            }
        } catch (error) {
            console.log("Error ..", error)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                    if(errorin404){
                        
                    Alert.alert(error.response.data.message)
                    }
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401.", error.response.data)
                    // ServerTokenError_Logout(undefined, undefined, dispatch)
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

            setTimeout(() => {
                setRefreshing(false);
            }, 1000)


        }
    }



    // // For previous code end


    // useEffect(() => {
    //     // scrollToEnd();

    //     if (messages.length > 0) {
    //         scrollToEnd();
    //     }
    // }, [messages])


    // useEffect(() => {
    //     if (listRef.current) {
    //       listRef.current.measureAllRows(() => {
    //         console.log('All items have been rendered');
    //       });
    //     }
    //   }, [data]);



    const MakeACallRequest = async () => {
        CustomAlerts_Continue("Rise a call request", `Do you want to send a call request to ${UserData.employeeName}`, () => { sendCallRequest(); console.log("sjh") })

    }


    const sendCallRequest = async () => {
        console.log("UserData.employeeId >", UserData.employeeId)
        try {
            const res = await Send_Call_Request_API(`${UserData.employeeId}`, tokenn)
            if (res.data) {
                console.log("res", res)
                CustomToaster(res.data)
            }
// 
        } catch (error) {
            console.log("Error ..", error)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401.", error.response.data)
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("error.response.status login", error.response)

                    // ServerTokenError_Logout(undefined, undefined, dispatch)
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

    const sendFile = async (newMessageData, weight) => {
        console.log("cs", newMessageData)

        if (stompClient && stompClient.connected) {
            const messageBody = await {
                userName: `${UserData.userName}`,
                exicutiveOrSalesName: `${UserData.employeeName}`,
                userId: `${UserData.userId}`,
                exicutiveOrSalesId: `${UserData.employeeId}`,
                message: await newMessageData,
                sendartype: 'user',
                messageType: 'file',
                weight: weight,
                employeeEmail: `${UserData.employeeEmail}`,
                userEmail: `${UserData.userEmail}`,
                // fileimg:

            };

            stompClient.publish({
                destination: '/app/greetings',
                body: JSON.stringify(messageBody),
            });

            setNewMessage(''); // Clear the input after sending
            scrollToEnd();
        } else {
            console.error('Message cannot be sent. Either STOMP is disconnected or the message is empty.');
        }
    }

    useEffect(() => {
        if (UserData) {
            console.log()
            connect();

        }
        // connect();
        return () => {
            disconnect();
        };
    }, [UserData]);

    const connect = () => {
        if (stompClient && stompClient.connected) return;

        console.log('Connecting to STOMP...');
        const client = new Client({
            brokerURL: webSocketUrl,
            connectHeaders: {},
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            onConnect: () => {
                console.log('Connected to WebSocket');
                setIsConnected(true);
                isReconnecting.current = false;

                client.subscribe(`/user/${UserData.userId}/greetings`, (msg) => {
                    const body = JSON.parse(msg.body);
                    setMessages((prevMessages) => [...prevMessages, body]);
                });

                client.subscribe(`/user/sendto/${UserData.userId}/greetings`, (msg) => {
                    const body = JSON.parse(msg.body);
                    setMessages((prevMessages) => [...prevMessages, body]);
                });




            },
            onDisconnect: () => {
                console.log('STOMP connection closed');
                setIsConnected(false);
                handleReconnect();
            },
            onStompError: (frame) => {
                console.error('Broker error:', frame.headers['message']);
                console.error('Error details:', frame.body);
            },
            debug: (str) => {
                console.log('STOMP debug:', str);
            },
        });

        client.activate();
        setStompClient(client);
    };

    const disconnect = () => {
        if (stompClient && stompClient.connected) {
            stompClient.deactivate();
        }
    };

    const handleReconnect = () => {
        if (!isReconnecting.current) {
            isReconnecting.current = true;
            console.log(`Reconnecting in ${reconnectDelay.current / 1000} seconds...`);
            setTimeout(() => {
                reconnectDelay.current = Math.min(reconnectDelay.current * 2, 60000); // Exponential backoff
                connect();
            }, reconnectDelay.current);
        }
    };



    const sendMessage = () => {
        if (stompClient && stompClient.connected && newMessage.trim()) {
            const messageBody = {
                userName: `${UserData.userName}`,
                exicutiveOrSalesName: `${UserData.employeeName}`,
                userId: `${UserData.userId}`,
                exicutiveOrSalesId: `${UserData.employeeId}`,
                message: newMessage,
                sendartype: 'user',
                messageType: 'pic',
                employeeEmail: `${UserData.employeeEmail}`,
                userEmail: `${UserData.userEmail}`,
            };

            stompClient.publish({
                destination: '/app/greetings',
                body: JSON.stringify(messageBody),
            });

            setNewMessage(''); // Clear the input after sending
            scrollToEnd();
        } else {
            console.error('Message cannot be sent. Either STOMP is disconnected or the message is empty.');
        }
    };

    const scrollToEnd = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };


    const defaultMessager = (messageDe = "Hello heyyy", sendartype = "user",) => {


        let msgData = {
            userName: `${UserData.userName}`,
            exicutiveOrSalesName: `${UserData.employeeName}`,
            userId: `${UserData.userId}`,
            exicutiveOrSalesId: `${UserData.employeeId}`,
            message: messageDe,
            sendartype: 'user',
            employeeEmail: `${UserData.employeeEmail}`,
            userEmail: `${UserData.userEmail}`,
            // "date": "Tue Sep 17 19:38:56 IST 2024"
        }
        let converMes = JSON.stringify(msgData);

        setMessages((prevMessages) => [converMes, ...prevMessages]);
    }



    useEffect(() => {
        if (messages.length > 0) {
            scrollToEnd();
        }
    }, [messages]);

    const messageDisplayer = ({ item }) => {


        if (item.messageType == 'file') {
            const isUserMessage = item.sendartype === 'user';

            return (
                <View
                    style={[
                        styles.messageContainer,
                        isUserMessage ? styles.sender : styles.receiver,
                        { alignSelf: isUserMessage ? 'flex-end' : 'flex-start', marginHorizontal: 10 },
                    ]}
                >
                    {/* <Text style={styles.messageText}>{item.message}</Text> */}


                    {/* <Image source={require('../../../assets/Images/Food/Food1.png')} style={{width:200,height:200}}/> */}
                    {/* <Image source={{ uri: item.message }} style={{ width: 200, height: 200 }} /> */}
                    <TouchableOpacity onPress={() => {
                        showAlertPreViewerModel(`${item.message}`)
                    }}>
                        <LoadingImage
                            source={{ uri: `${item.message}` }}
                            style={{ width: 200, height: 200 }}
                            loaderColor="#ff0000"
                        // resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <View style={[{
                        flexDirection: 'column',
                        // alignItems: 'flex-end',
                    }, { alignItems: isUserMessage ? 'flex-end' : 'flex-start' }]}>

                        {item.weight ? <Text style={{ justifyContent: 'flex-start', width: '100%' }}>{item.weight}</Text> : ""}
                        <Text style={[styles.timestampText,]}>{moment(item.timestamp).format('DD MMM YYYY hh:mm A')}</Text>
                    </View>
                    {!isUserMessage && item.seen && <Text style={styles.seenText}>Seen</Text>}
                </View>
            );
        }


        const isUserMessage = item.sendartype === 'user';

        return (
            <View
                style={[
                    styles.messageContainer,
                    isUserMessage ? styles.sender : styles.receiver,
                    { alignSelf: isUserMessage ? 'flex-end' : 'flex-start' },
                ]}
            >
                <Text style={styles.messageText}>{item.message}</Text>
                <View style={[{
                    flexDirection: 'column',
                    // alignItems: 'flex-end',
                }, { alignItems: isUserMessage ? 'flex-end' : 'flex-start' }]}>

                    <Text style={[styles.timestampText,]}>{moment(item.timestamp).format('DD MMM YYYY hh:mm A')}</Text>
                </View>
                {!isUserMessage && item.seen && <Text style={styles.seenText}>Seen</Text>}
            </View>
        );
    };


    if (!UserData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading ....</Text>
            </View>
        )
    }

    console.log(UserData)


    if (!UserData.employeeEmail) {
        console.log(UserData.employeeEmail)
        return (
            <ImageBackground
                source={require('../../../assets/Images/Background1.png')}
                style={styles.container}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <LoadingImage
                        // source={item.recipieImage}
                        source={require('../../../assets/Images/ChatSupport2.png')}
                        style={{
                            width: '80%', // Take up the full width of the parent
                            height: '80%',
                            borderRadius: 15,

                            resizeMode: 'contain', // Maintain aspect ratio without stretching
                            //   resizeMode: 'cover', // Maintain aspect ratio without stretching
                        }}
                    />

                    <Text style={{ color: '#FE7B07', fontFamily: 'BalooTamma2-Bold', fontWeight: 700, fontSize: 18, marginTop: -70 }}>
                        No user as assiged to chat
                    </Text>

                    <TouchableOpacity onPress={() => { console.log("ds") }}>
                        <Text>Reload</Text>
                    </TouchableOpacity>




                </View>
            </ImageBackground>
        )
    }



    const getPreviousChatbyPage=async(UserData)=>{
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",chatPage)

        setChatPage((pre)=>pre+1)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",chatPage)
        // setMessages((prevMessages) => [converMes, ...prevMessages]);
        await getPreviousChat(UserData,chatPage,true)
    }


    return (
        <>
            <Wapper>
                <Loader1
                    visible={spinnerBool}
                />

                <UploadModel
                    visible={alertVisible}
                    title="Alert!"
                    message="Something went wrong!"
                    onClose={closeAlert}
                    onSubmit={(e, b) => {
                        sendFile(e, b)

                    }}
                />
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('../../../assets/Images/Background1.png')}
                        style={styles.container}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 0.08 }}>
                                <CustomToolKitHeader componentName="Chat"
                                    rightIcon={(
                                        <TouchableOpacity onPress={() => { MakeACallRequest() }} style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: "center" }}>
                                            <Feather name="phone-call" size={24} color="black" />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', opacity: 1 }} onPress={() => {
                                // getPreviousChat(UserData)
                                getPreviousChatbyPage(UserData)
                                console.log("get chat old");

                            }}>
                                <Text numberOfLines={1}
                                    style={{ backgroundColor: "#FF6500", paddingVertical: 5, paddingHorizontal: 7, borderRadius: 10, color: 'white', fontSize: 10 }}
                                >Get previous chat</Text>
                            </TouchableOpacity>
                            <ImagePreviewerModel
                                visible={PreViewerModel}
                                title="Image Previewer"
                                data={ImagePreviewerData}
                                onClose={closeAlertPreViewerModel}
                                onSubmit={onSubmitPreViewerModel}
                            />
                            <View style={{ flex: 0.91 }}>
                                <FlatList
                                    data={messages}
                                    ref={flatListRef}

                                    renderItem={messageDisplayer}
                                    keyExtractor={(item, index) => index.toString()}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                />
                                <View style={{ flexDirection: 'row', width: '100%', marginBottom: -20 }}>
                                    <View style={{ flex: 0.85 }}>
                                        <CustomTextInput
                                            boxWidth="100%"
                                            placeholder="Type a message"
                                            value={newMessage}
                                            onChangeText={setNewMessage}
                                            rightIcon={
                                                <>
                                                    {/* {UserData.registered ? */}
                                                    <TouchableOpacity
                                                        onPress={showAlert}>
                                                        {/* <FontAwesome name="camera" size={24} color="black" /> */}
                                                        <Entypo name="attachment" size={24} color="black" />
                                                    </TouchableOpacity>
                                                    {/* :""} */}
                                                </>
                                            }
                                        />
                                    </View>
                                    <View style={{ flex: 0.05, marginLeft: 10 }}>
                                        <TouchableOpacity
                                            style={styles.sendButton}
                                            onPress={sendMessage}
                                            disabled={!isConnected}
                                        >
                                            <Feather name="send" size={25} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </Wapper>
        </>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '75%',
        backgroundColor: '#EDF3FF',
    },
    sender: {
        backgroundColor: '#DCF8C6',
    },
    receiver: {
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
    },
    timestampText: {
        fontSize: 10,
        color: '#999',
        marginTop: 5,
    },
    seenText: {
        fontSize: 12,
        color: '#00F',
        marginTop: 5,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        width: 45,
        height: 45,
        borderRadius: 25,
    },
});
