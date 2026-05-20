// Non compliant: setInterval without visibilitychange listener
setInterval(() => {
  fetch("/api/data").then((res) => res.json()).then(console.log);
}, 3000);

// Non compliant: second setInterval without visibilitychange listener
setInterval(() => {
  console.log("Ping server...");
}, 5000);

// Non compliant: recursive setTimeout without visibilitychange listener
function poll() {
  fetch("/api/status")
    .then((res) => res.json())
    .then((data) => console.log(data));
  setTimeout(poll, 4000);
}

poll();
