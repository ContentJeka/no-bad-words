let NoBadWords = require("../index.js");

let text = "word 'p###y' is bad"; // Text with bad words
let censoredText = "word 'p***y' is bad" // Text with censored words

let filter1 = new NoBadWords(text, [ "russian" ], 1, true).filter()
let filter2 = new NoBadWords(text, [ "russian" ], 1, false).filter()

console.log(filter1) // word ***** is bad
console.log(filter2) // word 'p###y' is bad