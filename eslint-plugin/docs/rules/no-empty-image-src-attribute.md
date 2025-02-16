# Disallow usage of image with empty source attribute (`@creedengo/no-empty-image-src-attribute`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

When the src attribute is missing, some browsers may still attempt to make a request to the current URL (the base URL of
the document) in an attempt to fetch the image.
This can lead to unnecessary server requests, impacting performance and potentially causing errors.

Proper use of the src attribute is essential for web accessibility.
Screen readers and other assistive technologies rely on valid image sources to provide meaningful information to users
with disabilities.
A missing src attribute can result in confusion and hinder accessibility.

```jsx
return (
  <>
    <img src="" /> // Non-compliant
    <img /> // Non-compliant
  </>
)
```

The HTML specification requires the src attribute for the <img> element, and not including it may lead to non-compliance
with standards.

```jsx
import myLogo from "./logo.svg"

return (
  <>
    <img src="./logo.svg" /> // Compliant
    <img src={myLogo} /> // Compliant
  </>
)
```

This rule is build for [React](https://react.dev/) and JSX.

## Resources

### Documentation

- [Mozilla Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML) -
  Images in HTML

### Articles & blog posts

- [Empty image src can destroy your site](https://humanwhocodes.com/blog/2009/11/30/empty-image-src-can-destroy-your-site/)

