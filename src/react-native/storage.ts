import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isWeb = Platform.OS === 'web';

export async function readStorage<T>(key: string, fallback: T): Promise<T> {
  try {
    if (isWeb) {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    }
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function writeStorage(key: string, value: unknown): Promise<void> {
  try {
    const raw = JSON.stringify(value);
    if (isWeb) {
      localStorage.setItem(key, raw);
    } else {
      await AsyncStorage.setItem(key, raw);
    }
  } catch {}
}

export async function clearStorage(key: string): Promise<void> {
  try {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch {}
}