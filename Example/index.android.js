/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, NativeModules} from "react-native";
import reactNativeLogEntriesLogger from "react_native_log_entries";

export default class Example extends Component {

  constructor(props, context, ...args) {
    super(props, context, ...args);
    const LOG_ENTRIES_SAMPLE_TOKEN = "aa76c166-4dc3-40f1-8de5-60473c31adfe"; // Please change this token with your log entries token
    reactNativeLogEntriesLogger.initializeLogger(LOG_ENTRIES_SAMPLE_TOKEN);
    reactNativeLogEntriesLogger.log("sample log message");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
