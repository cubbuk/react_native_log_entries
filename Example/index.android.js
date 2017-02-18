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
    const LOG_ENTRIES_SAMPLE_TOKEN = "aa76c166-4dc3-40f1-8de5-60473c31adfe"; // Please change this token with your log entries token, it might be unavailable by now
    reactNativeLogEntriesLogger.initializeLogger(LOG_ENTRIES_SAMPLE_TOKEN);

    //string messages can be logged
    reactNativeLogEntriesLogger.log("sample log message 2");

    //JSON logging is available too
    reactNativeLogEntriesLogger.logJSON({field1: "field1", field2: "field2"});

    //for adding context info such as logged in user into each message, putToContext method can be used.
    reactNativeLogEntriesLogger.putToContext("user", {name: "sampleUser", email: "sampleUser@email.com"});
    reactNativeLogEntriesLogger.log("sample log message with context by setting second parameter to true", true);
    //when context is used message will be part of `message` field on the logs

    //then you can remove smtg from context
    reactNativeLogEntriesLogger.removeFromContext("user");
    reactNativeLogEntriesLogger.log("user will not be used as it is removed from context", true);
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
