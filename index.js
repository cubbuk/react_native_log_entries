import {NativeModules} from "react-native";
const {ReactNativeLogEntries} = NativeModules;

class Logger {

  initializeLogger(token) {
    ReactNativeLogEntries.initializeLogger(token);
  }

  putToContext(key, value) {
    ReactNativeLogEntries.putToContext(key, value);
  }

  log(message, enrichWithContext) {
    ReactNativeLogEntries.log(message, !!enrichWithContext);
  }

  logJSON(jsonObject, enrichWithContext) {
    ReactNativeLogEntries.log(jsonObject, !!enrichWithContext);
  }
}

export default new Logger();