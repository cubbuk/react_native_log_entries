package com.cubbuk.reactnativelogentries;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.logentries.logger.AndroidLogger;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ReactNativeLogEntriesModule extends ReactContextBaseJavaModule {
    private AndroidLogger logger = null;
    private HashMap<String, Object> context = new HashMap<String, Object>();

    public ReactNativeLogEntriesModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ReactNativeLogEntries";
    }

    @ReactMethod
    public void putToContext(String key, ReadableMap value) {
        this.context.put(key, value);
    }

    @ReactMethod
    public void removeFromContext(String key) {
        this.context.remove(key);
    }

    @ReactMethod
    public void initializeLogger(String token) {
        try {
            if(logger == null) {
                logger = AndroidLogger.createInstance(getReactApplicationContext(), false, true, false, null, 0, token, true);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String enrichLogMessage(String message) {
        this.context.put("message", message);
        return this.context.toString();
    }

    @ReactMethod
    public void log(String message, Boolean enrichWithContext) throws Exception {
        if (logger != null) {
            if (enrichWithContext) {
                logger.log(this.enrichLogMessage(message));
            } else {
                logger.log(message);
            }
        } else {
            throw new Exception("Please initialize log entries logger by calling initializeLogger method with your token");
        }
    }

    @ReactMethod
    public void logJSON(ReadableMap jsonMap, Boolean enrichWithContext) throws Exception {
        if (logger != null) {
            if (enrichWithContext) {
                logger.log(this.enrichLogMessage(jsonMap.toString()));
            } else {
                logger.log(jsonMap.toString());
            }
        } else {
            throw new Exception("Please initialize log entries logger by calling initializeLogger method with your token");
        }
    }
}
