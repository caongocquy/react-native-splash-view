# Contributing to @leo-showdar/react-native-splash-view

🎉 Thanks for your interest in contributing! This library provides native splash screen support for React Native, and we welcome all help to improve it — whether it's bug fixes, features, documentation, or tests.

---

## 🧰 Prerequisites

- Node.js ≥ 16
- Yarn ≥ 1.22
- React Native ≥ 0.68
- Xcode (for iOS) / Android Studio (for Android)

---

## 📦 Development Setup

Since this package does not include an `example/` app, we recommend the following:

### Option 1: Local path in host app

In your real app:

```sh
yarn add file:/absolute/path/to/react-native-splash-view
```

> Make sure to rebuild native after linking:
>
> - iOS: `cd ios && pod install`
> - Android: Sync Gradle in Android Studio

### Option 2: Link using `yarn link`

From inside the package repo:

```bash
yarn link
```

Then, in your host app:

```bash
yarn link @leo-showdar/react-native-splash-view
```

> Use `yarn unlink` when you're done testing.

---

## 🧪 Testing

Since this library depends on native modules:

- Always test changes in a **real React Native app** (yours or a fresh one)
- Verify behavior on both iOS and Android
- If you're testing splash visuals, check both:
  - Without Lottie
  - With Lottie animation

---

## 📄 Commit Convention

Please use [Conventional Commits](https://www.conventionalcommits.org):

Examples:

- `feat: add support for dark mode`
- `fix(android): prevent crash when image not found`
- `docs: clarify iOS setup instructions`

---

## 🚀 Pull Request Guide

1. Fork and create a feature branch:

   ```bash
   git checkout -b feat/my-feature
   ```

2. Make your changes

3. Run `yarn lint` if available

4. Submit your PR with:
   - A clear description
   - A summary of what changed
   - Test results / platform used

---

## 🛠 Maintainer Notes

If you're a maintainer:

- Always test both platforms before merging
- Bump version with `yarn version`
- Publish using:

```bash
yarn build
npm publish
```

---

## 🙏 Thanks

Your help makes this package better for everyone. Whether it's fixing typos, improving logs, or building features — we appreciate your contribution!

MIT © [@showdar](https://github.com/caongocquy)
