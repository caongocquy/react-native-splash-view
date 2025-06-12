import UIKit

@objc(ReactNativeSplashView)
class ReactNativeSplashView: NSObject {
  
  @objc func show() {
    Splash.showOnWindow(UIApplication.shared.windows.first, imageName: "splash_bg", lottieName: "splash_lottie")
  }

  @objc func hide() {
    Splash.hide()
  }

  @objc func isUsingLottie() -> Bool {
    return Splash.isUsingLottie()
  }
}
