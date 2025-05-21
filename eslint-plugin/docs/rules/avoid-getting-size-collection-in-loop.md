# Avoid getting the size/length of the collection in loops and callbacks. Assign it to a variable before the loop/callback (`@creedengo/avoid-getting-size-collection-in-loop`)

⚠️ This rule _warns_ in the following configs: ✅ `flat/recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->
 
## Why is this an issue ?
 
Accessing the size or length of a collection (such as arrays, maps, or sets) inside a loop can lead to unnecessary performance overhead, especially if the collection size is recalculated on each iteration. This rule warns when the size of a collection is accessed within a loop condition or body, encouraging developers to cache the size before the loop.
 
### Examples of **incorrect** code
 
```javascript
for (let i = 0; i < array.length; i++) {
  doSomething(array[i]);
}
```
 
### Examples of **correct** code
 
```javascript
const len = array.length;
for (let i = 0; i < len; i++) {
  doSomething(array[i]);
}
```
