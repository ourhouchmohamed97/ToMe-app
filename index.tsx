import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToMeReactNativeApp } from './src/react-native/ToMeReactNativeApp';

function Root() {
  return (
    <SafeAreaProvider>
      <ToMeReactNativeApp />
    </SafeAreaProvider>
  );
}

registerRootComponent(Root);