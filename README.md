# Examples

Here I replaced the middle of the word with '?', but imagine if there really was a bad word there

### Text Filtering
```js
const NoBadWords = require("no-bad-words");

let text = "f??k you!"; // Text with bad words ('banword')
let filteredText = new NoBadWords(text, [ "english" ], 1, false).filter()

console.log(filteredText) // => **** you!
```

### Finding Bad Words
```js
const NoBadWords = require("no-bad-words");

let text = "F??k you motherf????r!"; // Text with bad words
let result = new NoBadWords(text, [ "english" ], 1, false).find(); // Search for bad words in the text

console.log(result) // => [ [ 'f?k', 'f?ck', 'fc?k' ], [], [ 'motherf????r' ] ];

// Corrections:

// F??k          =>    [ 'f?k', 'f?ck', 'fc?k' ];
// you           =>    []
// motherf????r  =>    [ 'motherf????r' ];

//
```

### Filtering text with bad words already censored
```js
let text = "word 'p###y' is bad"; // Text with bad words

let filter1 = new NoBadWords(text, [ "russian" ], 1, true).filter()
let filter2 = new NoBadWords(text, [ "russian" ], 1, false).filter()

console.log(filter1) // word ***** is bad
console.log(filter2) // word 'p###y' is bad
```
