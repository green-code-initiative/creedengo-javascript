import React from "react";

function ProvidePrintCSSComponent() {
  return (
    <>
      {/* Non-compliant: head does not contain a link with type print */}
      <head>
        <title>Web Page</title>
        <link rel="stylesheet" href="styles.css" />
      </head>

      {/* Non-compliant: head does not contain styles dedicated to print media */}
      <head>
        <title>Web Page</title>
        <style lang="style/css">{`@media screen { background-color: grey; }`}</style>
      </head>

      {/* Compliant: head contain a seperate styles file dedicated to print media */}
      <head>
        <title>Web Page</title>
        <link rel="stylesheet" media="print" href="print.css" />
      </head>

      {/* Compliant: head contain a dedicated print style */}
      <head>
        <title>Web Page</title>
        <style lang="style/css">{`@media print { background-color: grey; }`}</style>
      </head>
    </>
  );
}

export default ProvidePrintCSSComponent;
