import React from "react";

function AudioComponent() {
    return (
        <div>
            {/* Compliant */}
            <audio preload="none"><track kind="captions"/></audio>
            {/* Non-compliant */}
            <video autoPlay><track kind="captions"/></video>
            {/* Non-compliant */}
            <video preload="auto"><track kind="captions"/></video>
        </div>
    );
}

export default AudioComponent;
