# Disallow multiple access of same DOM element (`@creedengo/no-multiple-access-dom-element`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

Accessing the Document Object Model (DOM) is a relatively expensive operation in terms of performance.
Each time you access the DOM, the browser needs to traverse the document tree to find the requested element.
By assigning the DOM object to a variable when accessed multiple times, you avoid redundant traversals, leading to
improved performance.

Assigning the DOM object to a variable not only improves performance but also enhances code readability.
It makes the code more concise and self-explanatory.
Developers reading the code can understand that the variable holds a reference to a specific DOM element, and its
subsequent use is likely for multiple operations.

Here's an example in JavaScript to illustrate this rule:

```js
const width = document.getElementById('block').clientWidth;
const height = document.getElementById('block').clientHeight; // Non-compliant
```

```js
const blockElement = document.getElementById('block'); // Compliant
const width = blockElement.clientWidth;
const height = blockElement.clientHeight;
```

In the first example, getElementById is called twice, potentially resulting in two separate traversals of the DOM tree.
In the second example, the DOM element reference is cached in the `blockElement` variable, and subsequent property
accesses use this cached reference.

## Resources

### Documentation

- [CNUMR best practices](https://github.com/cnumr/best-practices/blob/main/chapters/BP_054_en.md) - Reduce DOM access
  via JavaScript
- [Mozilla Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Learn/Performance/JavaScript#tips_for_writing_more_efficient_code) -
  Tips for writing more efficient code
