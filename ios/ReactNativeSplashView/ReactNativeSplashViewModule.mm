#if __has_include(<ReactCommon/RCTTurboModule.h>)
  #import "ReactNativeSplashViewModule.h"
  #import "ReactNativeSplashViewSpec.h"

  #import <React/RCTBridge+Private.h>
  #import <React/RCTUtils.h>
  #import <ReactCommon/RCTTurboModule.h>

  #import <react-native-splash-view/react-native-splash-view-Swift.h>

  using namespace facebook;

  @interface ReactNativeSplashViewModule () <NativeReactNativeSplashViewSpec>
  @end

  @implementation ReactNativeSplashViewModule

  RCT_EXPORT_MODULE()

  - (void)show {
    [Splash showOnWindow:RCTKeyWindow()];
  }

  - (void)hide {
    [Splash hide];
  }

  - (BOOL)isUsingLottie {
    return [Splash isUsingLottie];
  }

  @end

  Class RCTRegisterModule(void) {
    return NSClassFromString(@"ReactNativeSplashViewModule");
  }
#endif

