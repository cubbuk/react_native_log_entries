# React Native Log Entries Library for Android

An Android bridge for React Native to use [Log Entries](https://logentries.com/)

## Installation

````
npm install --save react_native_log_entries
````

## Configuration

Open up `android/app/src/main/java/[...]/MainApplication.java`

1. Add import com.cubbuk.reactnativelogentries.ReactNativeLogEntriesPackage; to the imports at the top of the file

````
import com.cubbuk.reactnativelogentries.ReactNativeLogEntriesPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
````

2. Add new ReactNativeLogEntriesPackage() to the list returned by the getPackages() method. Add a comma to the previous item if there's already something there.

````
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ReactNativeLogEntriesPackage()
  );
}
````

3. Append the following lines to android/settings.gradle:

````
include ':react_native_log_entries'
project(':react_native_log_entries').projectDir = new File(rootProject.projectDir,   '../node_modules/react_native_log_entries/android')
````

4. Insert the following lines inside the dependencies block in android/app/build.gradle:
  
````
compile project(':react_native_log_entries')
````

5. Declare the permissions in your Android Manifest

````
<uses-permission android:name="android.permission.INTERNET" />
````

6. Lastly add this maven repo `maven { url 'https://jitpack.io' }` to application level build.gradle file like following. this repo is already included to library project but it is still required to run the project without any problem, if anyone knows how to avoid it please raise a PR

````
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        maven { url 'https://jitpack.io' } //Add this line
    }
}
````

## Usage

All you need is to `require` the `react_native_log_entries` module and initialize your logger with your token. You can see the example usage also under `Example` folder


````
import {AppRegistry, StyleSheet, Text, View, NativeModules} from "react-native";
import reactNativeLogEntriesLogger from "react_native_log_entries";

export default class Example extends Component {

  constructor(props, context, ...args) {
    super(props, context, ...args);
    const LOG_ENTRIES_SAMPLE_TOKEN = "aa76c166-4dc3-40f1-8de5-60473c31adfe"; // Please change this token with your log entries token
    reactNativeLogEntriesLogger.initializeLogger(LOG_ENTRIES_SAMPLE_TOKEN);// you need to first initalize your logger
    reactNativeLogEntriesLogger.log("sample log message");
  }
  ...
````

1. Initialize logger with your token
````
const LOG_ENTRIES_SAMPLE_TOKEN = "aa76c166-4dc3-40f1-8de5-60473c31adfe"; // Please change this token with your log entries token, it might be unavailable by now
reactNativeLogEntriesLogger.initializeLogger(LOG_ENTRIES_SAMPLE_TOKEN);
````

2. String messages can be logged
````
reactNativeLogEntriesLogger.log("sample log message 2");
````

3. For logging objects use `logJSON`
````
reactNativeLogEntriesLogger.logJSON({field1: "field1", field2: "field2"});
````

4. For adding context info such as logged in user into each message, `putToContext` method can be used.
````    
reactNativeLogEntriesLogger.putToContext("user", {name: "sampleUser", email: "sampleUser@email.com"});
reactNativeLogEntriesLogger.log("sample log message with context by setting second parameter to true", true);
//when context is used message will be part of `message` field on the logs
````
  
5. use `removeFromContext` method for removing info from context map
````
reactNativeLogEntriesLogger.removeFromContext("user");
reactNativeLogEntriesLogger.log("user will not be used as it is removed from context", true);
````

##Credits

This library just tries to wrap [Android library of Logentries](https://docs.logentries.com/docs/android) to enable it to be used from a React Native Project and created solely for learning and experimentation, it can be used or shared by anyone without getting any consent of the author:
Project folder structure and documentation is inspired from the famous [react-native-camera](https://github.com/lwansbrough/react-native-camera) repository
  
  