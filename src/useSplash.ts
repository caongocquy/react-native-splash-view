import { useCallback } from 'react';
import * as SplashView from './index';

export default function useSplash(defaultOptions?: {
  allowFinishAnimation?: boolean;
}) {
  const init = useCallback(
    (options?: { allowFinishAnimation?: boolean }) => {
      SplashView.init({
        allowFinishAnimation:
          options?.allowFinishAnimation ??
          defaultOptions?.allowFinishAnimation ??
          true,
      });
    },
    [defaultOptions]
  );

  const hide = useCallback(() => {
    SplashView.hide();
  }, []);

  return { init, hide };
}
