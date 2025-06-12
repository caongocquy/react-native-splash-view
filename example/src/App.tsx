import { useSplash } from '@leo-showdar/react-native-splash-view';
import { useEffect } from 'react';
import HideSplash from './HideSplash';
export default function App() {
  const { init } = useSplash();

  useEffect(() => {
    init({ allowFinishAnimation: true });
  }, []);
  return <HideSplash />;
}
