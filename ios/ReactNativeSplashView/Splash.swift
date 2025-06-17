import UIKit
import Lottie

@objc(Splash)
public class Splash: NSObject {
  
  private static var splashView: UIView?
  @objc public static var hasLottie: Bool = false
  @objc public static var isLottieAnimationFinished: Bool = false

  @objc public static func showOnWindow(_ window: UIWindow?, imageName: String?, lottieName: String?) {
    guard splashView == nil, let window = window else { return }
    
    // ⚠️ Validate: Ensure at least one of imageName or lottieName is provided
    guard imageName != nil || lottieName != nil else {
      print("⚠️ SplashView Warning: imageName and lottieName are both nil — showing blank screen")
      return
    }

    let splashContainer = UIView(frame: window.bounds)

    // Background image
    if let imageName = imageName, let image = UIImage(named: imageName) {
      let imageView = UIImageView(frame: splashContainer.bounds)
      imageView.image = image
      imageView.contentMode = .scaleAspectFill
      splashContainer.addSubview(imageView)
    }

    // Optional Lottie
    if let lottieName = lottieName {
      hasLottie = true
      isLottieAnimationFinished = false

      let animationView = LottieAnimationView(name: lottieName)
      animationView.frame = splashContainer.bounds
      animationView.contentMode = .scaleAspectFit
      animationView.loopMode = .playOnce
      splashContainer.addSubview(animationView)

      animationView.play { _ in
        isLottieAnimationFinished = true
        NotificationCenter.default.post(name: Notification.Name("LottieAnimationFinished"), object: nil)
      }
    } else {
      hasLottie = false
      isLottieAnimationFinished = true
    }

    window.addSubview(splashContainer)
    window.bringSubviewToFront(splashContainer)
    splashView = splashContainer
  }

  @objc public static func hide() {
    splashView?.removeFromSuperview()
    splashView = nil
  }

  @objc public static func isUsingLottie() -> Bool {
    return hasLottie
  }
}
