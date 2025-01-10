# Avoid usage of CSS animations (`@creedengo/avoid-css-animations`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

CSS animations, especially complex or continuous animations, can impact the performance of a web page.
They may consume significant browser resources, leading to slower page rendering and decreased user experience,
particularly on devices with limited processing power.

On mobile devices, constant animations can contribute to increased power consumption, affecting the device's battery
life.
Limiting the usage of CSS animations helps in creating a more energy-efficient and mobile-friendly user experience.

```jsx
<div style={{ border: "1px solid black", transition: "border 2s ease" }} /> // Non-compliant
```

```jsx
<div style={{ border: "1px solid black" }} /> // Compliant
```

It's important to note that while limiting animations is generally advisable for certain scenarios, there are cases
where animations contribute positively to the user experience and overall design.
In this case they should be limited to the CSS properties `opacity` and `transform` with it's associated
functions : `translate`, `rotate` and `scale`.
You can also inform the navigator of upcoming changes with the `will-change` instruction for more optimization.

## Resources

### Documentation

- [CNUMR best practices](https://github.com/cnumr/best-practices/blob/main/chapters/BP_039_en.md) - Avoid JavaScript /
  CSS animations

### Articles & blog posts

- [web.dev - Animations and performance](https://web.dev/articles/animations-and-performance)
- [web.dev - How to create high-performance CSS animations](https://web.dev/articles/animations-guide)
