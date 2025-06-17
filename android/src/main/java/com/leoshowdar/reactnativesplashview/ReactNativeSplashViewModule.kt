package com.leoshowdar.reactnativesplashview

import com.facebook.react.bridge.*

class ReactNativeSplashViewModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "ReactNativeSplashView"

  @ReactMethod
  fun hide() {
    currentActivity?.let {
      SplashView.hide(it)
    }
  }

  // JS to alert ready for listener event
  @ReactMethod
  fun jsHasSubscribed() {
    SplashEventBridge.markJsReady()
  }
}

