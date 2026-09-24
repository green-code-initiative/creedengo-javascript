import React from "react";

function ImageFilesComponent() {
  return (
    <div>
      {/* Compliant: WEBP */}
      <img src="./assets/images/cat.webp" alt="A cat" />

      {/* Compliant: AVIF */}
      <img src="./assets/images/cat.avif" alt="A cat" />

      {/* Compliant: JPEG XL */}
      <img src="./assets/images/cat.jxl" alt="A cat" />

      {/* Compliant: JPG inside a picture */}
      <picture>
        <source srcSet="image.webp" type="image/webp" />
        <img src="image.jpg" alt="..." />
      </picture>

      {/* Compliant: not handled */}
      <img src="./assets/images/cat" alt="A cat" />

      {/* Non-compliant: JPG*/}
      <img src="./assets/images/cat.jpg" alt="A cat" />

      {/* Non-compliant: PNG*/}
      <img src="./assets/images/cat.png" alt="A cat" />
    </div>
  );
}

export default ImageFilesComponent;
