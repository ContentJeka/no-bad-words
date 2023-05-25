let NoBadWords = require("../index.js");

let text = "Fuck you motherfucker!"; // Text with bad words
let filteredText = new NoBadWords(text, [ "english" ], 1, false).filter()

console.log(filteredText) // => **** you ************!