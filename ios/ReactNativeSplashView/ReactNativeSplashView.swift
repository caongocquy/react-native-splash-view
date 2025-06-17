import UIKit

@objc(ReactNativeSplashView)
class ReactNativeSplashView: NSObject {

  @objc func hide() {
    Splash.hide()
  }

  @objc func isUsingLottie() -> Bool {
    return Splash.isUsingLottie()
  }
}
