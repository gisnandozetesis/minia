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
        members: null,
        lastSender: null,
        newMessage: ''
    }

    componentWillMount() {
        const { navigation } = this.props;
        const chatId = navigation.getParam('chatId', 'NO-ID');

        const messagesRef = firebase.database().ref(`messages/${chatId}`);

        messagesRef.on('child_added', (data) => {

            const message = data.val();

            message.id = data.key;

            this.setState(state => {

                message.previousSender = state.lastSender;

                return {
                    ...state,
                    lastSender: message.sender,
                    messages: {
                        ...state.messages,
                        [message.id]: message
                    }
                }
            })
        });

        const membersRef = firebase.database().ref(`members/${chatId}`);
        membersRef.on('value', (data) => {

            const members = data.val();

            this.setState({
                members
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.members !== null;
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


    _renderItem = ({item}) => {
        const sender = this.state.members[item.sender];

        const showSender = !item.previousSender || item.previousSender !== item.sender;

        this._currentSenderId = item.sender;

        return (
            <View style={{ marginRight: 30, marginLeft: 3, marginTop: 3, padding: 3, backgroundColor: '#FFF5EB', borderRadius: 5 }}>
                {showSender && (<Text style={{ fontWeight: 'bold' }}>{sender.name}</Text>)}
                <Text>{item.content}</Text>
            </View>
        );
    } 

    render() {
        const messages = Object.values(this.state.messages);

        return (
            <View style={ styles.container }>
                <FlatList style={{ flexGrow: 1, marginBottom: 5, backgroundColor: '#E8E2D1' }} data={messages} renderItem={this._renderItem} keyExtractor={(item) => item.id} />

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