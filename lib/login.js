import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { EvernoteManager } from './';

export default class EvernoteComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { loggedIn: false, account: {} };
    this.manager = new EvernoteManager(this.props.apiKey, this.props.secret, this.props.isInSandboxMode);
  }

  componentDidMount() {
    this.manager.status().
                 then(loggedIn => this.manager.accountDetails()).
                 then(details => this.setState({ loggedIn: true, account: details })).
                 catch(error => this.setState({ loggedIn: false, account: {} }));
  }

  onLogin() {
    this.manager.login().
                 then(loggedIn => this.manager.accountDetails()).
                 then(details => this.setState({ loggedIn: true, account: details })).
                 catch(error => this.setState({ loggedIn: false, account: {} }));
  }

  onLogout() {
    this.manager.logout().
                 then(loggedOut => this.setState({ loggedIn: false, account: {} }));
  }

  get header() {
    if (this.state.loggedIn) {
      return (<View><Text style={styles.header}> Welcome back, { this.state.account.name }! </Text></View>);
    }
    return (<View><Text style={styles.header}> Login to your Evernote account </Text></View>);
  }

  get button () {
    if (this.state.loggedIn) {
      return (<TouchableOpacity onPress={this.onLogout.bind(this)}>
                 <Text style={[styles.button, styles.logout]}> Logout </Text>
              </TouchableOpacity>);
    }

    return (<TouchableOpacity onPress={this.onLogin.bind(this)}>
               <Text style={styles.button}> Login </Text>
            </TouchableOpacity>);
  }

  render() {
    return (
      <View style={styles.container}>
        { this.header }
        { this.button }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#5ba525',
    padding: 10,
    marginBottom: 5,
  },
  logout: {
    color: '#333333',
    backgroundColor: '#AAAAAA'
  }
});
