import {
  InteractionManager,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import NativeSplashView from './NativeSplashView';

export { default as useSplash } from './useSplash';

type SplashParameters = {
  allowFinishAnimation?: boolean;
};

const splashEvents = new NativeEventEmitter(NativeModules.SplashListener);

// Internal state
let isInitialized = false;
let isAnimationFinished = false;
let waitingToHide = false;
let allowAutoHide = false;
let animationSub: ReturnType<NativeEventEmitter['addListener']> | null = null;

/**
 * Initializes the splash screen system.
 * Should be called once during app launch.
 *
 * @param options - Optional config:
 * @property allowFinishAnimation - If true (default), splash will wait for Lottie animation to complete before hiding.
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

    // Notify native that JS is ready to receive events
    NativeSplashView.jsHasSubscribed?.();
  } else {
    // If not using Lottie, consider animation already finished
    isAnimationFinished = true;
    if (waitingToHide) {
      hide();
    }
  }

  isInitialized = true;
}

/**
 * Hides the splash screen.
 * If the animation has not finished yet, it will defer until it's done.
 */
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

/**
 * Cleans up internal listeners and resets splash state.
 * Called after splash is fully hidden.
 */
function cleanup() {
  animationSub?.remove?.();
  animationSub = null;

  isInitialized = false;
  isAnimationFinished = false;
  waitingToHide = false;
}
