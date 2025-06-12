// NativeSplashView.ts
import { NativeModules, TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

// Define the TypeScript interface matching native spec
export interface Spec extends TurboModule {
  hide(): void;
  isUsingLottie(): boolean;
}

// Check if TurboModules are enabled
const isTurboModuleEnabled = (global as any).__turboModuleProxy != null;

// Export the native module (Turbo or fallback)
const NativeSplashView: Spec = isTurboModuleEnabled
  ? TurboModuleRegistry.getEnforcing<Spec>('ReactNativeSplashView')
  : NativeModules.ReactNativeSplashView;

export default NativeSplashView;
