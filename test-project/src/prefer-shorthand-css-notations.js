import React from "react";

function PreferShorthandCSSNotations() {
  return (
    <>
      {/* Non-compliant: use "background" instead */}
      <div
        style={{
          backgroundColor: "#000",
          backgroundImage: "url(images/bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
        }}
      ></div>

      {/* Non-compliant: use "border" instead */}
      <div
        style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#000000" }}
      ></div>

      {/* Non-compliant: use "column" instead */}
      <div style={{ columnWidth: "100px", columnCount: 3 }}></div>

      {/* Non-compliant: use "columnRule" instead */}
      <div
        style={{
          columnRuleWidth: "4px",
          columnRuleStyle: "double",
          columnRuleColor: "#ff00ff",
        }}
      ></div>

      {/* Non-compliant: use "flex" instead */}
      <div style={{ flexGrow: 1, flexShrink: 0, flexBasis: "auto" }}></div>

      {/* Non-compliant: use "font" instead */}
      <div
        style={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: 18,
          lineHeight: "150%",
          fontFamily: "Arial,sans-serif",
        }}
      ></div>

      {/* Non-compliant: use "grid" instead */}
      <div
        style={{
          gridTemplateColumns: "1fr",
          gridAutoFlow: "row",
          gridAutoRows: "minmax(100px, auto)",
          gridAutoColumns: "200px",
        }}
      ></div>

      {/* Non-compliant: use "gridTemplate" instead */}
      <div
        style={{ gridTemplateColumns: "1fr", gridTemplateRows: "2fr" }}
      ></div>

      {/* Non-compliant: use "listStyle" instead */}
      <div
        style={{
          listStyleType: "disc",
          listStylePosition: "inside",
          listStyleImage: "url(disc.png)",
        }}
      ></div>

      {/* Non-compliant: use "margin" instead */}
      <div
        style={{
          marginTop: 10,
          marginBottom: 8,
          marginRight: 3,
          marginLeft: 5,
        }}
      ></div>

      {/* Non-compliant: use "offset" instead */}
      <div
        style={{
          offsetPath: "path(M 50 80 C 150 -20 250 180 350 80)",
          offsetPosition: "50%",
        }}
      ></div>

      {/* Non-compliant: use "outline" instead */}
      <div
        style={{
          outlineWidth: 1,
          outlineStyle: "solid",
          outlineColor: "#000000",
        }}
      ></div>

      {/* Non-compliant: use "overflow" instead */}
      <div style={{ overflowX: "visible", overflowY: "hidden" }}></div>

      {/* Non-compliant: use "padding" instead */}
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 8,
          paddingRight: 3,
          paddingLeft: 5,
        }}
      ></div>

      {/* Non-compliant: use "placeContent" instead */}
      <div style={{ alignContent: "end", justifyContent: "stretch" }}></div>

      {/* Non-compliant: use "placeItems" instead */}
      <div style={{ alignItems: "end", justifyItems: "stretch" }}></div>

      {/* Non-compliant: use "placeSelf" instead */}
      <div style={{ alignSelf: "end", justifySelf: "stretch" }}></div>

      {/* Non-compliant: use "textDecoration" instead */}
      <div
        style={{
          textDecorationStyle: "solid",
          textDecorationColor: "#f00",
          textDecorationLine: "underline",
        }}
      ></div>

      {/* Compliant: shorthand annotation "background" used */}
      <div style={{ background: "border-box red" }}></div>

      {/* Compliant: shorthand annotation "border" used */}
      <div style={{ border: "2px dotted" }}></div>

      {/* Compliant: shorthand annotation "column" used */}
      <div style={{ column: "3 100px" }}></div>

      {/* Compliant: shorthand annotation "columnRule" used */}
      <div style={{ columnRule: "4px double #ff00ff" }}></div>

      {/* Compliant: shorthand annotation "flex" used */}
      <div style={{ flex: "1 0 auto" }}></div>

      {/* Compliant: shorthand annotation "font" used */}
      <div style={{ font: "italic bold 18px/150% Arial, sans-serif" }}></div>

      {/* Compliant: shorthand annotation "grid" used */}
      <div style={{ grid: "1fr 2fr / row minmax(100px, auto) 200px" }}></div>

      {/* Compliant: shorthand annotation "gridTemplate" used */}
      <div style={{ gridTemplate: "1fr 2fr" }}></div>

      {/* Compliant: shorthand annotation "justifyItems" used */}
      <div style={{ justifyItems: "stretch" }}></div>

      {/* Compliant: shorthand annotation "listStyle" used */}
      <div style={{ listStyle: "georgian inside" }}></div>

      {/* Compliant: shorthand annotation "margin" used */}
      <div style={{ margin: "10px 3px 8px 5px" }}></div>

      {/* Compliant: shorthand annotation "offset" used */}
      <div
        style={{ offset: "path(M 50 80 C 150 -20 250 180 350 80) 150px" }}
      ></div>

      {/* Compliant: shorthand annotation "outline" used */}
      <div style={{ outline: "inset thick" }}></div>

      {/* Compliant: shorthand annotation "overflow" used */}
      <div style={{ overflow: "visible hidden" }}></div>

      {/* Compliant: shorthand annotation "padding" used */}
      <div style={{ padding: "10px 3px 8px 5px" }}></div>

      {/* Compliant: shorthand annotation "placeContent" used */}
      <div style={{ placeContent: "end stretch" }}></div>

      {/* Compliant: shorthand annotation "placeItems" used */}
      <div style={{ placeItems: "end stretch" }}></div>

      {/* Compliant: shorthand annotation "placeSelf" used */}
      <div style={{ placeSelf: "end stretch" }}></div>

      {/* Compliant: shorthand annotation "textDecoration" used */}
      <div style={{ textDecoration: "underline solid #f00" }}></div>
    </>
  );
}

export default PreferShorthandCSSNotations;
