# @leo-showdar/react-native-splash-view

[![npm version](https://img.shields.io/npm/v/@leo-showdar/react-native-splash-view)](https://www.npmjs.com/package/@leo-showdar/react-native-splash-view)
[![license](https://img.shields.io/npm/l/@leo-showdar/react-native-splash-view)](./LICENSE)
[![downloads](https://img.shields.io/npm/dm/@leo-showdar/react-native-splash-view)](https://www.npmjs.com/package/@leo-showdar/react-native-splash-view)

A lightweight native splash screen view for React Native apps, with optional [Lottie](https://airbnb.io/lottie/#/) animation support and full control via JS.

Supports:

- ✅ Native iOS splash via Swift
- ✅ Background image + optional Lottie
- ✅ JS control via hook: `useSplash()`
- ✅ Auto delay hide if animation is running

---

## 🚀 Installation

> 🛠 Requires CocoaPods for iOS

### 1. Add to your project

```sh
yarn add @leo-showdar/react-native-splash-view
```

### 2. iOS setup

```sh
cd ios && pod install
```

> Ensure minimum iOS version is 11.0+

---

## ✨ Usage

### ✅ Show splash from native (AppDelegate)

In `AppDelegate.m` (ObjC):

```objc
#import <ReactNativeSplashView/ReactNativeSplashView-Swift.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  ...
  [Splash showOnWindow:self.window imageName:@"splash_bg" lottieName:@"splash_lottie"];
  return YES;
}
```

Or in `AppDelegate.swift` (Swift):

```swift
import ReactNativeSplashView

func application(
  _ application: UIApplication,
  didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
) -> Bool {
  Splash.showOnWindow(
    UIApplication.shared.connectedScenes
      .compactMap { $0 as? UIWindowScene }
      .flatMap { $0.windows }
      .first { $0.isKeyWindow },
    imageName: "splash_bg",
    lottieName: "splash_lottie"
  )
  return true
}
```

---

### ✅ Use from JS

```tsx
import { useSplash } from '@leo-showdar/react-native-splash-view';

export default function App() {
  const { init, hide } = useSplash();

  useEffect(() => {
    init({ allowFinishAnimation: true });

    setTimeout(() => {
      hide(); // waits for Lottie to finish if needed
    }, 3000);
  }, []);

  return <MainApp />;
}
```

---

## 🧩 API

### `Splash.showOnWindow(window, imageName, lottieName)`

- `imageName`: string – required, image in `Assets.xcassets`
- `lottieName`: string | nil – optional, Lottie JSON in bundle

### `useSplash({ allowFinishAnimation })`

- `allowFinishAnimation` (default: `true`)
  - If `true`, waits for Lottie to finish before hiding
  - If `false`, allows hide immediately

---

## 📦 Asset Setup

### Image

- Add `splash_bg.png` to `Images.xcassets`
- Name it: `splash_bg`

### Lottie

- Add `splash_lottie.json` to Xcode project (tick target)

---

## 🧪 Example

This repo contains an [`example/`](./example/) app using the module locally:

```sh
cd example
yarn install
cd ios && pod install && cd ..
yarn ios
```

---

## 💡 TODO

- [ ] Android support
- [ ] Dark mode adaptive splash
- [ ] Auto-hide after animation
- [ ] Fully typed native JS bridge

---

## 📄 License

MIT © [@showdar](https://github.com/caongocquy)
