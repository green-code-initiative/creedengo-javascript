# Enforce providing a print stylesheet (`@creedengo/provide-print-css`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

CSS offers a set of styles specifically designed for printing.
By using CSS print styles, you can control how the content of a web page is presented when users decide to print it.
This includes adjusting font sizes, hiding unnecessary elements, and optimizing the layout to fit well on printed pages.

Limiting the number of printed pages helps in reducing paper and ink consumption.
By optimizing the print layout, you can ensure that only essential content is printed, saving resources and contributing
to environmental sustainability.

```html
<head>
  <title>Web Page</title>
  <link rel="stylesheet" type="text/css" href="styles.css" /> <!-- Non-compliant -->
</head>
```

In your HTML file, you can include a link to the print stylesheet inside the <head> section.
Use the media attribute with a value of "print" to indicate that this stylesheet is specifically for print.

```html
<head>
  <title>Web Page</title>
  <link rel="stylesheet" media="print" type="text/css" href="print.css" /> <!-- Compliant -->
</head>
```

You can also use the @media print rule to define styles that should be applied when the page is printed.
Adjust font sizes, hide unnecessary elements, or make any other modifications suitable for print.

```html
<head>
  <title>Web Page</title>
  <style>
  @media print {
    /* Compliant: print-specific styles */
  }
  </style>
</head>
```

## Resources

### Documentation

- [CNUMR best practices](https://github.com/cnumr/best-practices/blob/main/chapters/BP_027_en.md) - Provide a print CSS

### Articles & blog posts

- [How to Create Printer-friendly Pages with CSS](https://www.sitepoint.com/css-printer-friendly-pages/)
