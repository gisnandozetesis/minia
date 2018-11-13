import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { spaceSearchResult } from '../actions';
import * as firebase from 'firebase';
import { purple, white } from '../utils/colors';

class Chat extends React.Component {

    state = {
        messages: {},
        newMessage: ''
    }

    componentWillMount() {

        const { navigation } = this.props;
        const chatId = navigation.getParam('chatId', 'NO-ID');

        const messagesRef = firebase.database().ref(`messages/${chatId}`);

        // messagesRef.once('value', (snapshot) => {

        //     const messages = snapshot.val();

        //     if (messages) {

        //         const messagesObject = {};

        //         for (var key in messages) {
        //             const message = messages[key];
        //             message.id = key;

        //             messagesObject[key] = message;
        //         }

        //         this.setState(state => {
        //             return {
        //                 ...state,
        //                 messages: {
        //                     ...state.messages,
        //                     ...messagesObject
        //                 }
        //             };
        //         });
        //     }
        // });

        messagesRef.on('child_added', (data) => {

            const message = data.val();

            message.id = data.key;

            this.setState(state => {

                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        [message.id]: message
                    }
                }
            })

        });

    }

    sendMessage = () => {
        const { newMessage } = this.state;

        console.log('newMessage', newMessage);

        if (newMessage) {
            const { navigation } = this.props;
            const chatId = navigation.getParam('chatId', 'NO-ID');

            const messagesRef = firebase.database().ref(`messages/${chatId}`);

            messagesRef.push({
                content: newMessage,
                sender: 'usr01',
                timestamp: Date.now()
            });

            this.setState({
                newMessage: ''
            });
        }
    }


    render() {
        const messages = Object.values(this.state.messages);//.sort((a, b) => a.timestamp - b.timestamp);

        return (
            <View style={ styles.container }>
                <View style={{ flexGrow: 1, marginBottom: 5, backgroundColor: '#eee'}}>
                    {messages.map(msg => (<Text key={msg.id}>{msg.content}</Text>))}
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={{ flexGrow: 1 }} value={this.state.newMessage} onChangeText={(text) => this.setState({ newMessage: text })} />

                    <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn} onPress={this.sendMessage}>
                        <Text style={styles.submitBtnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: 5,
      backgroundColor: white
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      marginRight: 0,
      height: 35,
      borderRadius: 2
    },
    submitBtnText: {
      color: white,
      fontSize: 16,
      textAlign: 'center',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
  })
  
export default Chat;