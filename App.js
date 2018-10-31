import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Home from './components/Home';
import Inbox from './components/Inbox';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { purple, white } from './utils/colors';
import miniaReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

function MiniaStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Inbox: {
    screen: Inbox,
    navigationOptions: {
      tabBarLabel: 'Inbox',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  Home2: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home 2',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})


export default class App extends React.Component {
  render() {

    const firebaseConfig = {
      apiKey: "AIzaSyAnhm2WNK8mDTwGK1Cp8iIjeKoMHhnnwTU",
      authDomain: "minia-dev.firebaseapp.com",
      databaseURL: "https://minia-dev.firebaseio.com",
      storageBucket: "minia-dev.appspot.com"
    };
    
    firebase.initializeApp(firebaseConfig);



    return (
      <Provider store={createStore(miniaReducer)}>
        <View style={{flex: 1}}>
          <MiniaStatusBar backgroundColor={purple} barStyle="light-content" />
          <Tabs />
        </View>
      </Provider>
    );
  }
}
