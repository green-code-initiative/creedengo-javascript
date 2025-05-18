const element = document.getElementById("#element");

function invalidStyleChanges() {
  element.style.height = "800px"; // Non-compliant: multiple properties assignments
  element.style.width = "600px";
  element.style.color = "red";
}

function validStyleChanges() {
  element.style.width = "500px"; // Compliant: only one property assignment
  element.classList.add("red-color"); // Compliant: use a class to apply multiple styles
}

invalidStyleChanges();
validStyleChanges();
