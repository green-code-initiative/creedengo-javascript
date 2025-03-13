# Avoid screen keep awake (`@creedengo/avoid-keep-awake`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

To avoid draining the battery, an Android device that is left idle quickly falls asleep.
Hence, keeping the screen on should be avoided, unless it is absolutely necessary.

> **Note**: This rule currently only supports detecting `expo-keep-awake` package usage. Support for other keep-awake packages may be added in future versions.

```js
import { useKeepAwake } from "expo-keep-awake";

export default function KeepAwakeExample() {
  useKeepAwake(); // Non compliant
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This screen will never sleep!</Text>
    </View>
  );
}
```

```js
import { activateKeepAwake } from "expo-keep-awake";

_activate = () => {
  activateKeepAwake(); // Non-compliant
  alert("Activated!");
};
```

## Resources

### Documentation

- [Expo Docs](https://docs.expo.dev/versions/latest/sdk/keep-awake/) - Expo KeepAwake
