import NativeSplashView from './NativeSplashView';
import {
  InteractionManager,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
export { default as useSplash } from './useSplash';
const splashEvents = new NativeEventEmitter(NativeModules.SplashListener);

type SplashParameters = {
  allowFinishAnimation?: boolean;
};

let isAnimationFinished = false;
let waitingToHide = false;
let allowAutoHide = false;
let isInitialized = false;
let animationSub: any = null;

/**
 * Initializes the splash screen module.
 * @param {SplashParameters} options - Optional parameters for initialization.
 * @property {boolean} [options.allowFinishAnimation=true] - Whether to allow the splash animation to finish before hiding.
 */

export function init(options?: SplashParameters) {
  if (isInitialized) return;

  allowAutoHide = options?.allowFinishAnimation ?? true;

  const usingLottie = NativeSplashView.isUsingLottie?.();

  if (usingLottie) {
    animationSub = splashEvents.addListener('onLottieAnimationFinished', () => {
      isAnimationFinished = true;
      if (allowAutoHide || waitingToHide) {
        hide();
      }
    });
  } else {
    isAnimationFinished = true;
    if (waitingToHide) {
      hide();
    }
  }

  isInitialized = true;
}

export function hide() {
  if (isAnimationFinished) {
    InteractionManager.runAfterInteractions(() => {
      NativeSplashView.hide();
      cleanup();
    });
  } else {
    waitingToHide = true;
  }
}

function cleanup() {
  animationSub?.remove?.();
  isInitialized = false;
  isAnimationFinished = false;
  waitingToHide = false;
}
