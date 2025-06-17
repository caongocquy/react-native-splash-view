// NativeSplashView.ts
import { NativeModules, TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

// Define the TypeScript interface matching the native spec
export interface Spec extends TurboModule {
  hide(): void;
  isUsingLottie(): boolean;
  jsHasSubscribed?(): void;
}

// Check if TurboModules are enabled (JS runtime)
const isTurboModuleEnabled =
  (global as any).__turboModuleProxy != null &&
  typeof TurboModuleRegistry.getEnforcing === 'function';

// Platform-specific fallback (optional safety)
const fallback = NativeModules.ReactNativeSplashView as Spec;

// Export the native module
const NativeSplashView: Spec = isTurboModuleEnabled
  ? TurboModuleRegistry.getEnforcing<Spec>('ReactNativeSplashView')
  : fallback;

export default NativeSplashView;
