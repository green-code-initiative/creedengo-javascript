# Disallow autoplay and enforce preload='none' for video and audio elements (`@creedengo/avoid-autoplay`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

Automatic videos and audio files activation (autoplay) during web pages loading uses resources on each tier (device,
network, data center). In many cases, automatic playback is not necessary. Moreover, it can draw users' attention and
distract them from the initially requested service. Therefore, whenever possible, these playbacks should be initiated by
the users and by not using the autoplay attributes in the `<audio>` and `<video>` elements.

Nevertheless, some parts of the video or audio files may be downloaded even if autoplay is not activated. Moreover, data
will be unnecessarily downloaded even if users do not start the video playback. It is therefore necessary to force
browsers not to preload anything by setting the `preload` attribute to `none`.

```jsx
return (
    <>
        <video src="video.mp4" autoplay/> // Non-compliant
        <video src="video.mp4" preload="auto"/> // Non-compliant
        <video src="video.mp4" autoplay preload="auto"/> // Non-compliant
        <video src="video.mp4" preload="none"/> // Compliant
    </>
)
```

This rule is build for [React](https://react.dev/) and JSX.

## Resources

### Documentation

- [Mozilla Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay) -
  Autoplay in HTML
- [Mozilla Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) - Video and
  audio content
- [Mozilla Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload) -
  Preload in HTML
- [W3C](https://w3c.github.io/sustyweb/star.html#UX16-1) - Autoplay attribute


