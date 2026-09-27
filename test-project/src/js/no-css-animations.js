import React from "react";

function AnimatedComponent() {
  return (
    <div>
      {/* Compliant */}
      <div style={{ border: "5px solid red" }}></div>
      <div class="my-awesome-element"></div>

      {/* Non-compliant */}
      <div style={{ animation: "background 0.3s ease" }}></div>
    </div>
  );
}

export default AnimatedComponent;
