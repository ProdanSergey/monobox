const entries = [];

while (Infinity) {
  let input = prompt('Enter any data here. Click "CANCEL" to finish.');

  if (input === null) {
    if (entries.length > 0) {
      break;
    }

    alert("Enter data at least once");
    continue;
  }

  input = input.trim();

  if (input.length < 1) {
    alert("No Empty Input");
    continue;
  }

  entries.push(input);
}

const sumOfAllNumbers = entries
  .map(Number)
  .filter(Boolean)
  .reduce((sum, arg) => (sum += arg), 0);

const stringsSortedByLength = entries
  .filter((entry) => isNaN(Number(entry)))
  .sort((a, b) => b.length - a.length)
  .map((entry) => `[${entry.length}]: ${entry}`)
  .join("\n");

console.log("Sum of all number inputs:", sumOfAllNumbers);
console.log("All non-digit strings sorted by length:\n\n" + stringsSortedByLength);
