import * as Location from 'expo-location';

// Web
function success(pos) {
  console.log(pos.coords);
}

function error(err) {
  console.warn(err);
}

// Non-compliant: enableHighAccuracy set to true
const invalidOptions = { enableHighAccuracy: true, timeout: 5000 };
navigator.geolocation.getCurrentPosition(success, error, invalidOptions);

// Compliant: enableHighAccuracy is false by default, so its valid
navigator.geolocation.getCurrentPosition(success);

// Compliant: explicit enableHighAccuracy set to false
const validOptions = { enableHighAccuracy: false, maximumAge: 0 };
navigator.geolocation.getCurrentPosition(success, error, validOptions);

// React Native
Location.enableNetworkProviderAsync(); // Non-compliant

Location.requestPermissionsAsync(); // Compliant
