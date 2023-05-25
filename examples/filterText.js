let NoBadWords = require("../index.js");

let text = "ты не пидор"; // Text with bad words
let filteredText = new NoBadWords(text, [ "russian" ], 1, false).find()

console.log(filteredText) // => **** you ************!