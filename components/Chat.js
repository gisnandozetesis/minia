import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { spaceSearchResult } from '../actions';
import * as firebase from 'firebase';

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

        if (newMessage) {
            const { navigation } = this.props;
            const chatId = navigation.getParam('chatId', 'NO-ID');

            console.log('chatId', chatId);
    
            const messagesRef = firebase.database().ref(`messages/${chatId}`);

            messagesRef.set({
                content: newMessage,
                id: Date.now(),
                sender: 'usr01',
                timestamp: Date.now()
            });
        }
    }


    render() {
        const { messages } = this.state;

        return (
            <View>
                {messages.map(msg => (<Text key={msg.id}>{msg.content}</Text>))}

                <View>
                    <TextInput value={this.state.newMessage} />

                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Chat;