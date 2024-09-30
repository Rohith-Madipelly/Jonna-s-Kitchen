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
import { GET_USER_DEATILS_API, PREVIOUS_CHAT_API } from '../../../Utils/ApiCalls';
import UploadModel from '../../../ModelsAlerts/UploadModel';
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage';
import ImagePreviewerModel from '../../../Components/UI/ImagePreviewer';
import Wapper from '../../../Components/UI/Wapper';

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



    const onRefresh = useCallback(() => {
        setRefreshing(true);


        setTimeout(() => {
            setRefreshing(false);
        }, 2000)

    }, []);


    const getUserDeatils = async () => {
        setSpinnerbool(true)
        try {
            const res = await GET_USER_DEATILS_API(tokenn)
            setUserData(res.data)
            // setTimeout(() => {
            //     return new Promise((resolve) => {
            //         // setMessages(newMessages);
            //         setMessages((prevMessages) => [...previousChatData, ...prevMessages]);
            //         resolve(); // Resolve once messages are set
            //         setSpinnerbool(false)
            //         scrollToEnd();

            //     });
            // }, 2000)


            // setTimeout(()=>{
            //     getPreviousChat()
            // },2000)

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


    const getPreviousChat = async () => {
        setSpinnerbool(true)
        try {
            const res = await PREVIOUS_CHAT_API(UserData.userId, UserData.employeeId, tokenn)
            setPreviousChatData(res.data)
            defaultMessager("Start your chatting now ")
            defaultMessager("Welcome Dear ")
            setTimeout(() => {
                return new Promise((resolve) => {
                    // setMessages(newMessages);
                    setMessages((prevMessages) => [...previousChatData, ...prevMessages]);
                    resolve(); // Resolve once messages are set
                    console.log("hgc")
                    setSpinnerbool(false)
                    scrollToEnd();

                });
            }, 2000)

        } catch (error) {
            console.log("Error ..", error)
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
            // setSpinnerbool(false)
        }

    }


    useEffect(() => {
        getUserDeatils()
    }, [])
    // // For previous code end


    useEffect(() => {
        // scrollToEnd();

        if (messages.length > 0) {
            scrollToEnd();
        }
    }, [messages])


    // useEffect(() => {
    //     if (listRef.current) {
    //       listRef.current.measureAllRows(() => {
    //         console.log('All items have been rendered');
    //       });
    //     }
    //   }, [data]);


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
                messageType: 'pic'
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


        console.log("sbjhbdc", messageDe)
        let msgData = {
            userName: `${UserData.userName}`,
            exicutiveOrSalesName: `${UserData.employeeName}`,
            userId: `${UserData.userId}`,
            exicutiveOrSalesId: `${UserData.employeeId}`,
            message: messageDe,
            sendartype: 'user',
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
                        <Text style={[styles.timestampText,]}>{moment(item.timestamp).format('hh:mm A')}</Text>
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

                    <Text style={[styles.timestampText,]}>{moment(item.timestamp).format('hh:mm A')}</Text>
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
                                        <TouchableOpacity onPress={()=>{console.log("mshjbdj")}} style={{width:30,height:30,borderRadius:15,justifyContent:'center',alignItems:"center"}}>
                                            <Feather name="phone-call" size={24} color="black" />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
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
                                                <TouchableOpacity
                                                    onPress={showAlert}
                                                // onPress={() => Alert.alert('Camera functionality', 'Under development')}
                                                >
                                                    {/* <FontAwesome name="camera" size={24} color="black" /> */}
                                                    <Entypo name="attachment" size={24} color="black" />
                                                </TouchableOpacity>
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
