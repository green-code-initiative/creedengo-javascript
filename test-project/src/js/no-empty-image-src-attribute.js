import React from "react";

function ImageComponent() {
  return (
    <div>
      {/* Compliant */}
      <img src="logo.svg" alt="This is a SVG image" />

      {/* Non-compliant */}
      <img alt="This is an empty image" />
    </div>
  );
}

export default ImageComponent;
