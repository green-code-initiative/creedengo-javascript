# Avoid using resource hungry libraries(`@creedengo/avoid-using-resource-hungry-libs`)

⚠️ This rule _warns_ in the following configs: ✅ `flat/recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

## Why is this an issue?

Avoid imports of known resource-hungry or deprecated libraries and suggest lighter alternatives.

This rule flags any import, require or dynamic import of libraries listed in the project’s deprecation dictionary (`moment`, `iconsax`, etc.), because these libraries
1. Inflate your bundle size
2. Slow parsing & compilation
3. Often lack tree-shaking support
4. May be unmaintained

```js
import moment from "moment";
const age = moment().diff(birthday, "years");
```

```js
import differenceInYears from "date-fns/differenceInYears";

const age = differenceInYears(new Date(), birthday);
```

## Resources

### Documentation
