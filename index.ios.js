import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import { EvernoteLogin } from './lib';

class Evernote extends Component {

  render() {
    return (
      <View style={styles.container}>
        <EvernoteLogin apiKey={"idancalinescu"} secret={"090e300ee8bd41e4"} isInSandboxMode={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('Evernote', () => Evernote);
