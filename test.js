// Test file for Ollama Code Review Extension
function calculateSum(a, b) {
    return a + b;
}

function processData(data) {
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        result += data[i];
    }
    return result;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const sum = processData(numbers);
console.log("Sum:", sum);

// This function has some issues for testing
function badFunction() {
    var x = 10; // Using var instead of let/const
    if (x == 10) { // Using == instead of ===
        console.log("x is 10");
    }
} 