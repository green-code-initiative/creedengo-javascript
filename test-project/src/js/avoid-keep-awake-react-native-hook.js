import { useKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { Text, View } from 'react-native';

export default function KeepAwakeExample() {
  // Non-compliant
  useKeepAwake();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This screen will never sleep!</Text>
    </View>
  );
}