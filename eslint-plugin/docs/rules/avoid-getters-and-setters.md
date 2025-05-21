# Avoid rewriting native getter and setters (`@creedengo/avoid-getters-and-setters`)

⚠️ This rule _warns_ in the following configs: ✅ `flat/recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

## Why is this an issue?

Overloading default getters and setters lengthens the compilation and execution times, which are usually much better optimized by the language than by the developer.

```js
const circle = {
	_radius: 42,
	get radius() {
		return this._radius; // Non-compliant
	},
};
```

```js
const circle = {
	_radius: 42,
	get diameter() {
		return this._radius * 2 * Math.PI; // Compliant
	}
};
```
