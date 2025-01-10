# Should avoid to override brightness (`@creedengo/avoid-brightness-override`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

To avoid draining the battery, IOS and Android devices adapt the brightness of the screen depending on the environment light.

For some reasons, developers may disable this feature programmatically.

This feature was introduced to improve battery life, be careful when deactivating it.

Hence, keeping forcing the screen brightness on should be avoided, unless it is absolutely necessary. 


## Example of non compliant code

```js
// Example with expo-brightness (Expo framework library)
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Brightness from 'expo-brightness';

export default function App() {
    useEffect(() => {
        (async () => { Brightness.setSystemBrightnessAsync(1); })(); // Brightness is forced here
    }, []);
    return (
        <View>
            <Text>Brightness Module Example</Text>
        </View>
    );
}
```
