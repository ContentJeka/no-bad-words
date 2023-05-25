let NoBadWords = require("../index.js");

let text = "word 'p###y' is bad"; // Text with bad words
let censoredText = "word 'p***y' is bad" // Text with censored words

let filteredText = new NoBadWords(text, [ "russian" ], 1, true).filter()
let filteredCensoredText = new NoBadWords(text, [ "russian" ], 1, false).filter()

console.log(filteredText) // word ***** is bad
console.log(filteredCensoredText) // word 'p###y' is bad