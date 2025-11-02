# Firebase Firestore + New Architecture Workaround

## Current Status (As of Nov 2025)

This project is using a **temporary workaround** to enable EAS builds with Firebase Firestore.

### The Problem

React Native Firebase Firestore is not fully compatible with:
- Expo SDK 54
- React Native 0.81.5
- New Architecture
- Static Frameworks

This causes build failures on EAS with errors like:
- `include of non-modular header inside framework module`
- `type specifier missing, defaults to 'int'`
- `declaration of 'RCTBridgeModule' must be imported`

### The Workaround (Current Setup)

To make builds work, we've **temporarily removed** packages that require New Architecture:

#### Removed Packages:
1. **`react-native-reanimated`** (v4.1.1)
   - Required New Architecture
   - Was used by: Expo Router (optional animations)
   - Impact: No animated transitions, but app works fine

2. **`react-native-worklets`** (v0.5.1)
   - Required New Architecture
   - Dependency of Reanimated
   - Impact: None (not directly used)

#### Configuration Changes:
- `app.json` → `newArchEnabled: false`
- `app/_layout.tsx` → Commented out `import "react-native-reanimated"`
- Kept `./plugins/withPodfile` → Adds `CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES = 'YES'`

#### What Still Works:
✅ Firebase Auth (phone authentication)  
✅ Firebase Firestore (habits, quotes data)  
✅ Expo Router navigation  
✅ All app features  
✅ EAS builds & TestFlight  

---

## How to Restore When Compatible

### When to Restore

Check for compatibility updates:
1. **React Native Firebase GitHub**: https://github.com/invertase/react-native-firebase/releases
   - Look for: "Full New Architecture support" or "Static frameworks compatibility"
   - Target version: v24.x or v25.x+

2. **Expo Blog**: https://blog.expo.dev
   - Look for: Firebase compatibility announcements

3. **Community Forums**:
   - Expo Discord: https://chat.expo.dev
   - React Native Firebase Issues: https://github.com/invertase/react-native-firebase/issues

### Steps to Restore

#### 1. Update Firebase Packages
```bash
npm install @react-native-firebase/app@latest
npm install @react-native-firebase/auth@latest
npm install @react-native-firebase/firestore@latest
```

#### 2. Restore Reanimated & Worklets
```bash
# Check compatible versions for your Expo SDK
npx expo install react-native-reanimated
# Worklets will be installed automatically as a dependency
```

#### 3. Enable New Architecture

**In `app.json`:**
```json
{
  "expo": {
    "newArchEnabled": true
  }
}
```

#### 4. Restore Reanimated Import

**In `app/_layout.tsx`:**
```typescript
import "react-native-reanimated"; // Uncomment this line
```

#### 5. Test Locally First
```bash
# Clean everything
rm -rf node_modules package-lock.json ios android
npm install

# Rebuild native
npx expo prebuild --clean

# Test iOS locally
npx expo run:ios

# Test Android locally
npx expo run:android
```

#### 6. Try EAS Build
```bash
eas build --platform ios --profile production
```

#### 7. If Build Succeeds, Remove Podfile Plugin

**In `app.json`:**
```json
{
  "expo": {
    "plugins": [
      "expo-router",
      // Remove this line:
      // "./plugins/withPodfile",
      ...
    ]
  }
}
```

Then rebuild:
```bash
npx expo prebuild --platform ios --clean
eas build --platform ios --profile production
```

---

## Rollback Plan (If Issues Occur)

If restoring causes problems, revert with:

```bash
# 1. Remove Reanimated & Worklets
npm uninstall react-native-reanimated react-native-worklets

# 2. Disable New Architecture in app.json
# Set: "newArchEnabled": false

# 3. Comment out Reanimated import in app/_layout.tsx
# Change: import "react-native-reanimated";
# To: // import "react-native-reanimated";

# 4. Keep withPodfile plugin in app.json plugins array

# 5. Clean rebuild
rm -rf node_modules package-lock.json ios
npm install
npx expo prebuild --platform ios --clean
```

---

## Files Modified for This Workaround

### `package.json`
- **Removed**: `react-native-reanimated: ~4.1.1`
- **Removed**: `react-native-worklets: 0.5.1`

### `app.json`
- **Changed**: `newArchEnabled: true` → `newArchEnabled: false`
- **Kept**: `./plugins/withPodfile` in plugins array

### `app/_layout.tsx`
- **Changed**: `import "react-native-reanimated"` → `// import "react-native-reanimated"`

### `plugins/withPodfile.js`
- **Kept**: Adds `CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES = 'YES'` to Podfile

---

## Additional Notes

### Why This Workaround Works

- **Old Architecture** (bridged mode) is stable and mature
- Firebase Firestore works fine with Old Architecture + static frameworks
- The Podfile fix handles the minor header compatibility issues
- Removing Reanimated removes the New Architecture requirement

### What You're Missing Without New Architecture

- Slightly slower bridge communication (negligible for most apps)
- Some experimental React Native features
- Reanimated v4 animations (can use Animated API instead)

### What You're NOT Missing

- All core React Native features work
- Firebase works perfectly
- Expo Router works perfectly
- Performance is still excellent

---

## Questions?

If you're unsure whether to restore:
1. Check if your app builds successfully with the workaround
2. Monitor React Native Firebase releases
3. Wait for official "New Architecture fully supported" announcement
4. Test in a separate branch first

**Last Updated**: November 2025  
**Expo SDK**: 54.0.17  
**React Native**: 0.81.5  
**React Native Firebase**: 23.5.0

