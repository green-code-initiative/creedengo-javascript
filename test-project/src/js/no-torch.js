// React Native
import Torch from "react-native-torch"; // Non-compliant: torch should not be enabled

Torch.switchState(true);

// Web API (MediaTrackConstraints)
export async function example() {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  const [track] = mediaStream.getVideoTracks();

  await track.applyConstraints({ advanced: [{ torch: true }] }); // Non-compliant: programmatically enables torch via advanced constraints

  await track.applyConstraints({ advanced: [{ torch: false }] }); // Compliant: programmatically disables torch via advanced constraints

  await track.applyConstraints({ advanced: [{ facingMode: "environment" }] }); // Compliant: no torch constraint
}
