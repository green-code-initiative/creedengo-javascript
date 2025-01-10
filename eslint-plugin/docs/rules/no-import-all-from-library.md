# Should not import all from library (`@creedengo/no-import-all-from-library`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

Including only the required modules decreases the overall size of the program.
This, in turn, reduces the amount of memory and storage space needed to run and store the application.
This is especially critical in environments with limited resources, such as on mobile devices or in web applications
where bandwidth and download times matter.

Smaller programs generally have better runtime performance.
Reducing the number of unnecessary modules minimizes the amount of code that needs to be interpreted or compiled,
leading to faster execution and improved overall performance.

## Options

You can externally add your own libraries to be checked.
To add your own libraries you need to modify your .eslintrc.js by adding the following rule configuration:

```js
module.exports = {
  ...yourConf,
  rules: {
    "no-import-all-from-library": [
      "warn",
      {
        notAllowedLibraries: ["some-lib"], // will check for -> import someLib from "some-lib"
        importByNamespaceNotAllowedLibraries: ["some-other-lib"], // will check for -> import * as someOtherLib from "some-other-lib"
      },
    ],
  },
};
```

## Examples

**Example with the well-known [lodash](https://lodash.com/) library, if you only need
`isEmpty` method.**

```js
// Example with lodash
import lodash from "lodash";
import { isEmpty } from "lodash";
import * as lodash from "lodash";

// Example with underscore
import _ from "underscore";
```

**Size of your bundle, if you use the whole lodash library:**

* **index.js - 531.46 KB**
    * node_modules/lodash - 531.35 KB
        * lodash.js - 531.35 KB
    * index.js - 112 B

---

Examples of **compliant** code for this rule:

```js
// Example with lodash (uses submodules)
import isEmpty from "lodash/isEmpty";
import intersect from "lodash/intersect";

// Example with underscore (uses esm modules)
import map from "underscore/modules/map.js";
```

Size of your bundle, if you use only the "isEmpty" method:

* **index.js - 24.42 KB**
    * node_modules/lodash - 24.31 KB
        * isEmpty - 1.95 KB
        * _nodeUtil.js - 995 B
        * isArrayLike.js - 830 B
        * ...
    * index.js - 110 B

## Resources

### Documentation

- [Mozilla Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) -
  import

### Articles & blog posts

- [Importing modules in JavaScript, are we doing it right?](https://dev.to/dianjuar/importing-modules-in-javascript-are-we-doing-it-right-nc)
