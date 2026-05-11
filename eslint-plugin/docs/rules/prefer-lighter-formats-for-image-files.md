# @creedengo/prefer-lighter-formats-for-image-files

📝 Prefer lighter formats for image files.

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

Using appropriate image formats and optimizing image sizes is essential for improving website performance, user experience, and overall environmental impact.
Larger image file sizes consume more bandwidth, increasing the data transfer required to load a web page.
Some image formats are generally considered better for eco-friendly web design and should be used in most cases.

We recommend using the following formats:

- **WebP**, developed by Google, is a modern image format that provides high compression efficiency without significant loss of quality.
- **AVIF** (AV1 Image File Format) is a relatively new and highly efficient image format that is based on the AV1 video codec.
- **SVG** (Scalable Vector Graphics) is a vector image format that is based on XML.
  Files are lightweight and can be scaled without loss of quality.

```html
<img src="./assets/images/cat.jpg" alt="Unoptimized image of a cat" /> //
Non-compliant

<img src="./assets/images/cat.webp" alt="Optimized image of a cat" /> //
Compliant
```

Remember that the best image format may vary depending on the specific use case, content, and requirements of your website.
Always test and evaluate the performance of different formats to find the optimal balance between image quality and file size.

### Picture

Images often represent most of the downloaded bytes, right after videos and just before CSS and JavaScript libraries.
Optimizing images is important to reduce used bandwidth. The first step is to choose the ideal format for your
display needs.

Raster images should be reserved for photos and interface elements that cannot be displayed with icons or CSS styles.

The appropriate format depends on the image properties : black & white or color, color palette, need for transparency...
Among these properties, the possibility to irremediably alter images quality (lossy compression) tends to favor formats such as JPEG, JPEG XL,
AVIF, or WebP, while needing transparency and/or the impossibility to alter the image quality (lossless compression) will tend to favor
PNG or WebP lossless formats (which supports transparency).

Format importantly impacts images size: on average, .webp images will be 30% lighter than .jpeg
images or .png images. .avif images can be up to 20% lighter than .webp image and 50% lighter than .jepg images.

Don't forget to pay attention to browser support. .webp images will not be recognized by
old browsers and will not be displayed. It is possible to provide several formats for the same image
to overcome this issue. Some server-side modules (such as Google's modPageSpeed, also available for Apache
and Nginx) even allow you to provide the appropriate image for the browser that is calling the server.

Many tools will help you minimize images size:

- SQUOOSH
- CLOUDINARY
- ImageMagick
- PngCrush
- JpegTran

### Example

In this example, the DOM <picture> element informs the browser that there are two images: a .webp image and a
.jpg image, which is used by default. The browser will decide which image will be downloaded. If the .webp format
is supported, the image.webp image will be downloaded; otherwise, image.jpg image will be downloaded.

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." loading="lazy" />
</picture>
```

Also remember to consider browser compatibility.
Older browsers may not recognize .webp/.avif images and fail to display them.
To address this issue, you can supply multiple formats for the same image.

## Resources

### Documentation

- [CNUMR best practices](https://github.com/cnumr/best-practices/blob/main/chapters/BP_080_en.md) - Optimize images
- [WSG UX15-2](https://w3c.github.io/sustyweb/star.html#UX15-2) - Optimizing All Image Assets for a Variety of Different Resolutions
- [RGESN 5.1](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/critere/5.1/) - Référentiel général d'écoconception de services numériques 🇫🇷

### Articles & blog posts

- [greenspector.com - Which image format choose to reduce energy consumption and environmental impact?](https://greenspector.com/en/which-image-format-to-choose-to-reduce-its-energy-consumption-and-its-environmental-impact/)
- [dodonut.com - The Most Efficient Web Image Formats. Use Cases For Different Types Of Images.](https://dodonut.com/blog/use-cases-of-web-image-formats/)
