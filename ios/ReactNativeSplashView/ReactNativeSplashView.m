// ✅ Legacy (RCT_EXTERN) - ReactNativeSplashView.m
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ReactNativeSplashView, NSObject)

RCT_EXTERN_METHOD(show)
RCT_EXTERN_METHOD(hide)
RCT_EXTERN_METHOD(isUsingLottie: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
