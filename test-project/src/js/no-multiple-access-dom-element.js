// Non-compliant: same dom element accessed multiple times
function invalidShowCard() {
  document.querySelector("#card").style.backgroundColor = "red";
  document.querySelector("#card").innerHTML = "Hello world!";
}

// Compliant: dom element is stored in a variable
function validShowCard() {
  const card = document.querySelector("#card");
  card.style.backgroundColor = "red";
  card.innerHTML = "Hello world!";
}

invalidShowCard();
validShowCard();
