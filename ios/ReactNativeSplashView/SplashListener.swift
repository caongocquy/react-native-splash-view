import Foundation
import React

@objc(SplashListener)
class SplashListener: RCTEventEmitter {
  private var hasListeners = false

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func startObserving() {
    hasListeners = true
    NotificationCenter.default.addObserver(self,
                                           selector: #selector(handleLottieFinished),
                                           name: Notification.Name("LottieAnimationFinished"),
                                           object: nil)

    if Splash.isLottieAnimationFinished {
      sendEvent(withName: "onLottieAnimationFinished", body: nil)
    }
  }

  override func stopObserving() {
    hasListeners = false
    NotificationCenter.default.removeObserver(self, name: Notification.Name("LottieAnimationFinished"), object: nil)
  }

  override func supportedEvents() -> [String]! {
    return ["onLottieAnimationFinished"]
  }

  @objc func handleLottieFinished() {
    if hasListeners {
      sendEvent(withName: "onLottieAnimationFinished", body: nil)
    }
  }
}
