/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Provider } from 'react-redux';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_STORAGE_BUCKET } from 'react-native-dotenv';
import store from './src/store';
import Post from './src/screens/Post';
import { isLoggedIn } from './src/auth';
import { LoggedOut, createRootNavigator } from './src/router';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      checkedLogin: false
    }
  }

  componentDidMount() {
    var config = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: "https://capstone-bb16d.firebaseio.com",
      projectId: "capstone-bb16d",
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: "947620558752"
    };
    firebase.initializeApp(config);
    isLoggedIn()
      .then(res => this.setState({ loggedIn: res, checkedLogin: true }))
      .catch(err => console.error(err))
  }

  render() {

    const { loggedIn, checkedLogin } = this.state
    if (!checkedLogin) {
      return null
    }

    const Layout = createRootNavigator(loggedIn)

    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

