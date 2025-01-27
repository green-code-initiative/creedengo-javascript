# Should not programmatically enable torch mode (`@creedengo/no-torch`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->
## Why is this an issue?

As a developer, you should avoid programmatically enabling torch mode.

The flashlight can significantly drain the device's battery. If it is turned on without the user's knowledge, it could lead to unwanted battery consumption.

```js
import Torch from 'react-native-torch'; // Not-compliant
```

```js
import axios from 'axios'; // Compliant
```

## Resources

### Documentation

- [CNUMR best practices mobile](https://github.com/cnumr/best-practices-mobile) - Torch free