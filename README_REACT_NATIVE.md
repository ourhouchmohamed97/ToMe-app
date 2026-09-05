# ToMe - React Native (iOS & Android)

This repository contains the full cross-platform **React Native** implementation of ToMe, ready to run on both **Apple iOS** and **Google Android** using standard React Native primitives and Expo.

---

## 📱 Quick Start on iOS & Android (with Expo)

### 1. Prerequisites
- Node.js (v18 or newer)
- **Expo Go app** installed on your real iPhone (App Store) or Android device (Google Play Store).

### 2. Run on your physical device or simulator
In your terminal, execute:

```bash
# Start Expo development server
npx expo start
```

- **iOS**:
  - Scan the QR code shown in the terminal with your iPhone camera, which opens Expo Go.
  - Or press `i` in the terminal to launch the Xcode iOS Simulator.
- **Android**:
  - Scan the QR code using the Expo Go app.
  - Or press `a` in the terminal to launch the Android Studio Emulator.

---

## 📦 Building Standalone Binaries (IPA for iOS & APK/AAB for Android)

The repository includes `app.json` pre-configured with:
- **iOS Bundle Identifier**: `com.tome.privatejournal`
- **Android Package Name**: `com.tome.privatejournal`
- Permissions: Camera, Photo Library, and Microphone for voice notes and memory captures.

### Build via EAS Build:
```bash
# Install EAS CLI
npm install -g eas-cli

# Build Android APK / App Bundle
eas build -p android --profile preview

# Build iOS IPA / TestFlight
eas build -p ios --profile preview
```

---

## 🗂️ Project Structure

```
├── app.json                                 # Expo & React Native app config (iOS / Android permissions, icons, splash)
├── src/
│   ├── react-native/                        # Pure React Native Implementation
│   │   ├── components/
│   │   │   ├── ToMeHeader.tsx               # Native Header with brand, logo, and sub-views
│   │   │   ├── ToMeBottomBar.tsx            # Floating curved tab bar
│   │   │   ├── ToMeIcon.tsx                 # Cross-platform icon system
│   │   │   ├── MobileDeviceFrame.tsx        # Device frame preview (iOS / Android / Fluid)
│   │   │   └── ExpoInstructionsModal.tsx   # In-app setup instructions
│   │   ├── screens/
│   │   │   ├── TodayScreen.tsx              # Today conversational thread, photo capsule, suggestion chips, voice pulse
│   │   │   ├── EveningCheckinScreen.tsx     # Evening review, moment tags, textarea, 1-year seal
│   │   │   ├── MemoriesScreen.tsx           # Search, filters, photo cards, waveform voice note player
│   │   │   ├── MemoryDetailScreen.tsx       # Resurfaced time capsule, quote, rainy window, ToMe reflection inquiry
│   │   │   └── MeScreen.tsx                 # Elena Rostova profile, stats grid, switches, time & frequency modals
│   │   ├── styles/
│   │   │   └── theme.ts                     # Colors (#fcf9f3, #97472e), Spacing, Border Radii
│   │   └── ToMeReactNativeApp.tsx           # Root React Native coordination component
│   ├── data/
│   │   └── mockData.ts                      # Initial conversation messages, memories & hotlinked assets
│   └── types.ts                             # Shared TypeScript models
```
