# Encourage usage of shorthand CSS notations (`@creedengo/prefer-shorthand-css-notations`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

By employing a shorthand property, you can create stylesheets that are more succinct and frequently easier to read,
ultimately conserving time and energy.
By reducing the number of CSS properties, you help to reduce the weight of your application bundle, and therefore its
environmental footprint.

## Options

You can disable specific properties from being scanned if it does not match your needs.
To disable properties you need to modify your .eslintrc.js by adding the following rule configuration:

```js
module.exports = {
  ...yourConf,
  rules: {
    "prefer-shorthand-css-notations": [
      "warn",
      // disable analyze of "animation-*" properties
      { disableProperties: ["animation"] },
    ],
  },
};
```

## Examples

For example, the `font` shorthand consolidates various font-related properties, and the `margin` shorthand streamlines
the definition of margins around a box.

```jsx
<div style={{ marginTop: "1em", marginRight: 0, marginBottom: "2em", marginLeft: "0.5em" }}>
  {/* Noncompliant: these properties can be grouped together in the "margin" property */}
</div>;
```

```jsx
<div style={{ margin: "1em 0 2em 0.5em" }}>
  {/* Compliant usage of shorthand property */}
</div>
```

This optimization can't always be done, depending on the properties you're using.
For example, if you only want to set the left margin, you must continue to use `margin-left`.

```jsx
<div style={{ marginLeft: "1em" }}>
  {/* Compliant because we only want a left margin */}
</div>
```

This optimization works for a number of
properties [listed here](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#see_also).

## Resources

### Documentation

- [CNUMR best practices](https://github.com/cnumr/best-practices/blob/fc5a1f865bafb196e4775cce8835393751d40ed8/chapters/BP_026_en.md) -
  Use abbreviated CSS notations
- [Mozilla Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) -
  Shorthand properties

### Articles & blog posts

- [6 CSS Shorthand properties to improve your web application](https://dev.to/cscarpitta/6-css-shorthand-properties-to-improve-your-web-application-2dbj)
