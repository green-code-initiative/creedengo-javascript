import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { Button, View } from 'react-native';

export default class KeepAwakeExample extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={this._activate} title="Activate" />
        <Button onPress={this._deactivate} title="Deactivate" />
      </View>
    );
  }

  _activate = () => {
    // Non-compliant
    activateKeepAwake();
    alert('Activated!');
  };

  _deactivate = () => {
    deactivateKeepAwake();
    alert('Deactivated!');
  };
}