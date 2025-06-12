require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "ReactNativeSplashView"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0" }
  s.swift_version = "5.0"
  s.module_name  = "ReactNativeSplashView"

  s.source       = { :git => "https://github.com/caongocquy/react-native-splash-view.git", :tag => "#{s.version}" }

  s.source_files = "ios/ReactNativeSplashView/**/*.{h,m,mm,swift}"
  s.private_header_files = "ios/ReactNativeSplashView/**/*.h"
  s.requires_arc = true

  s.dependency "React-Core"
  s.dependency "ReactCommon"
  s.dependency "lottie-ios", "~> 4.3"
end
