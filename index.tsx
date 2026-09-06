import { registerRootComponent } from 'expo';
import { loadAsync } from 'expo-font';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToMeReactNativeApp } from './src/react-native/ToMeReactNativeApp';
import materialSymbolsFont from './assets/fonts/MaterialSymbolsOutlined.ttf';

function Root() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    loadAsync({
      'Material Symbols Outlined': materialSymbolsFont,
    })
      .then(() => setFontsReady(true))
      .catch(() => setFontsReady(true));
  }, []);

  if (!fontsReady) return null;

  return (
    <SafeAreaProvider>
      <ToMeReactNativeApp />
    </SafeAreaProvider>
  );
}

registerRootComponent(Root);