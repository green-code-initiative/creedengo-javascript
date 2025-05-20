// Non-compliant: the collection size is accessed (twice) in the loop
for (let i = 0; i < array.length; i++) {
	process("test"); // Noncompliant
}

// Compliant: no collection size access in loop
const arrayLength = array.length; // Fetch the length once
for (let i = 0; i < arrayLength; i++) {
	console.log("yay"); // Compliant
}
