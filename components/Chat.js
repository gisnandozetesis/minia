import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { spaceSearchResult } from '../actions';
import * as firebase from 'firebase';
import uuid from 'react-native-uuid';
import { purple, white } from '../utils/colors';

class Chat extends React.Component {

    state = {
        messages: [],
        newMessage: ''
    }

    componentWillMount() {

        const { navigation } = this.props;
        const chatId = navigation.getParam('chatId', 'NO-ID');

        const messagesRef = firebase.database().ref(`messages/${chatId}`);

        // messagesRef.once('value', (snapshot) => {

        //     const messages = snapshot.val();

        //     if (messages) {
        //         const messageArray = Object.values(messages);

        //         this.setState({
        //             messages: messageArray
        //         });
        //     }
        // });

        messagesRef.on('child_added', (data) => {

            const message = data.val();

            this.setState(state => {

                console.log('oldState', state);

                state.messages.push(message);

                console.log('newState', state);

                return state;
            })

        });
    }

    sendMessage = () => {
        const { newMessage } = this.state;

        console.log('newMessage', newMessage);

        if (newMessage) {
            const { navigation } = this.props;
            const chatId = navigation.getParam('chatId', 'NO-ID');

            const messageId = uuid.v4();

            console.log('messageId', messageId);

            const messagesRef = firebase.database().ref(`messages/${chatId}/${messageId}`);

            messagesRef.set({
                content: newMessage,
                id: messageId,
                sender: 'usr01',
                timestamp: Date.now()
            });

            this.setState({
                newMessage: ''
            });
        }
    }


    render() {
        const { messages } = this.state;

        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                {messages.map(msg => (<Text key={msg.id}>{msg.content}</Text>))}

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'stretch', backgroundColor: '#ff0000' }}>
                    <TextInput style={{ alignSelf: 'stretch' }} value={this.state.newMessage} onChangeText={(text) => this.setState({ newMessage: text })} />

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
      padding: 20,
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
      marginRight: 10,
      height: 35,
      borderRadius: 2,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
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