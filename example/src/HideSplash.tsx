import { Text, View, StyleSheet } from 'react-native';
import { useSplash } from '@showdar/react-native-splash-view';
import { useEffect } from 'react';
export default function HideSplash() {
  const { hide } = useSplash();

  useEffect(() => {
    setTimeout(() => {
      hide(); // waits for Lottie to finish if needed
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>HELLO SHOWDAR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
