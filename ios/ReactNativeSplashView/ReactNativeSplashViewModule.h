#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

#if __has_include(<ReactCommon/RCTTurboModule.h>)
#import <ReactCommon/RCTTurboModule.h>
#endif

@interface ReactNativeSplashViewModule : NSObject <RCTBridgeModule>
@end
