# Disallow multiple style changes at once (`@creedengo/no-multiple-style-changes`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

Browsers optimize rendering performance by batching and combining similar operations.
However, when making multiple CSS changes at once, it can disrupt the browser's optimization mechanisms.
Applying changes individually allows the browser to better optimize the rendering process.

Making multiple CSS changes in a single batch can trigger multiple reflows and repaints in the browser.
Reflows and repaints are resource-intensive operations that can lead to performance issues.
Applying changes individually minimizes the number of reflows and repaints, improving overall page performance.

Here's an example in JavaScript and CSS to illustrate this rule:

```html
<script>
element.style.height = "800px";
element.style.width = "600px"; // Non-compliant
element.style.color = "red"; // Non-compliant
</script>
```

```html
<style>
.in-error {
  color: red;
  height: 800px;
  width: 800px;
}
</style>

<script>
element.addClass("in-error"); // Compliant
</script>
```

In the first example, multiple CSS properties are set in a single batch, while in the second example, changes are
applied through a CSS class.

## Resources

### Documentation

- [CNUMR best practices](https://github.com/cnumr/best-practices/blob/main/chapters/BP_045_en.md) - Modify several CSS
  properties at once
