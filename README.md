# @leo-showdar/react-native-splash-view

[![npm version](https://img.shields.io/npm/v/@leo-showdar/react-native-splash-view)](https://www.npmjs.com/package/@leo-showdar/react-native-splash-view)
[![license](https://img.shields.io/npm/l/@leo-showdar/react-native-splash-view)](./LICENSE)
[![downloads](https://img.shields.io/npm/dm/@leo-showdar/react-native-splash-view)](https://www.npmjs.com/package/@leo-showdar/react-native-splash-view)

A lightweight native splash screen view for React Native apps, with optional [Lottie](https://airbnb.io/lottie/#/) animation support and full control via JS.

**Supported Platforms:**

- ✅ iOS (native Swift)
- ✅ Android (native Kotlin)
- ✅ Optional background image and/or Lottie
- ✅ Full JS control: `init()`, `hide()`
- ✅ Auto-hide after animation ends

---

## 🚀 Installation

> 🛠 Requires **CocoaPods** (iOS) and `react-native >= 0.68+` (Autolinking)

```bash
yarn add @leo-showdar/react-native-splash-view
```

---

## 🍏 iOS Setup

```bash
cd ios && pod install
```

> Requires minimum iOS version **11.0+**

### 🔹 Show splash from native (AppDelegate)

#### Objective-C

```objc
#import <ReactNativeSplashView/ReactNativeSplashView-Swift.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [Splash showOnWindow:self.window imageName:@"splash_bg" lottieName:@"splash_lottie"];
  return YES;
}
```

#### Swift

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

## 🤖 Android Setup

> No manual linking required (supports autolink)

### 🔹 Show splash from native (MainActivity.kt)

```kotlin
import com.reactnativesplashview.SplashView

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Show splash screen from native
    SplashView.show(this, "splash_bg", "splash_lottie")
  }
}
```

### 🔹 Add assets

- `splash_bg.png`:  
  → Place in `android/app/src/main/res/drawable/`

- `splash_lottie.json`:  
  → Place in `android/app/src/main/assets/`

If `assets/` folder doesn't exist:

```gradle
// android/app/build.gradle
android {
  ...
  sourceSets {
    main {
      assets.srcDirs = ['src/main/assets']
    }
  }
}
```

---

## ✨ Usage in JavaScript

```tsx
import { useSplash } from '@leo-showdar/react-native-splash-view';

export default function App() {
  const { init, hide } = useSplash();

  useEffect(() => {
    init({ allowFinishAnimation: true });

    // App startup logic...
    setTimeout(() => {
      hide();
    }, 3000);
  }, []);

  return <MainApp />;
}
```

---

## 🧹 API

### `Splash.showOnWindow(window, imageName, lottieName)` (iOS)

- `imageName`: `string` – required, image from `.xcassets`
- `lottieName`: `string` – optional, Lottie animation name

### `SplashView.show(activity, imageName, lottieName)` (Android)

- `imageName`: `String?` – optional
- `lottieName`: `String?` – optional  
  _(at least one must be provided)_

### `useSplash({ allowFinishAnimation })`

| Option                 | Default | Description                                       |
| ---------------------- | ------- | ------------------------------------------------- |
| `allowFinishAnimation` | `true`  | Wait for Lottie animation to finish before hiding |

---

## 📦 Asset Setup

### iOS

- Add `splash_bg.png` to `Images.xcassets`
- Add `splash_lottie.json` to project bundle (✅ tick target)

### Android

- Add `splash_bg.png` to `res/drawable`
- Add `splash_lottie.json` to `src/main/assets`

---

## 📄 License

MIT © [@showdar](https://github.com/caongocquy)
