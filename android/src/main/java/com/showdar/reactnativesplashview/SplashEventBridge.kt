package com.showdar.reactnativesplashview

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

object SplashEventBridge {
  private var reactContext: ReactContext? = null
  private var jsReady = false
  private var eventPending = false

  fun setContext(context: ReactContext) {
    reactContext = context
  }

  fun sendEvent(eventName: String, params: WritableMap?) {
    if (jsReady) {
      reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        ?.emit(eventName, params)
    } else {
      eventPending = true
    }
  }

  fun markJsReady() {
    jsReady = true
    if (eventPending) {
      sendEvent("onLottieAnimationFinished", null)
      eventPending = false
    }
  }
}
