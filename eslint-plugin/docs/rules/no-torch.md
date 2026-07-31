# @creedengo/no-torch

📝 Should not programmatically enable torch mode.

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

As a developer, you should avoid programmatically enabling torch mode.

The flashlight can significantly drain the device's battery. If it is turned on without the user's knowledge, it could lead to unwanted battery consumption.

### React Native

```js
import Torch from "react-native-torch"; // Not-compliant

import axios from "axios"; // Compliant
```

### HTML5 Web API (MediaTrackConstraints)

```js
// Not-compliant
await track.applyConstraints({ advanced: [{ torch: true }] });

// Compliant
await track.applyConstraints({ advanced: [{ facingMode: "environment" }] });
```

## Resources

### Documentation

- [CNUMR best practices mobile](https://github.com/cnumr/best-practices-mobile) - Torch free
- [MediaTrackConstraints: torch property (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#torch)
