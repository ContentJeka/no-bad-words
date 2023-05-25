let NoBadWords = require("../index.js");

let text = "Fuck you motherfucker!"; // Text with bad words
let result = new NoBadWords(text, [ "english" ], 1).find(); // Filtered text without bad words

console.log(result) // => [ [ 'fuk', 'fuck', 'fcuk' ], [], [ 'motherfucker' ] ];

// Corrections:

// Fuck          =>    [ 'fuk', 'fuck', 'fcuk' ];
// you           =>    []
// motherfucker  =>    [ 'motherfucker' ];

//