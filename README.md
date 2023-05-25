# <div style="text-align:center"><img src="https://i.imgur.com/r13VbG3.png" /></div><br />
<br />

#### Here I replaced the middle of the word with '?', but imagine if there really was a bad word there

# Installation
```
npm i filter-bad-words
yarn add filter-bad-words
```

# Examples
#### Text Filtering
```js
const NoBadWords = require("filter-bad-words");

let text = "f??k you!"; // Text with bad words
let filteredText = new NoBadWords(text, [ "english" ], 1, false).filter()

console.log(filteredText) // => **** you!
```

#### Finding Bad Words
```js
const NoBadWords = require("filter-bad-words");

let text = "F??k you motherf????r!"; // Text with bad words
let result = new NoBadWords(text, [ "english" ], 1, false).find(); // Search for bad words in the text

console.log(result) // => [ [ 'f?k', 'f?ck', 'fc?k' ], [], [ 'motherf????r' ] ];

// Corrections:

// F??k          =>    [ 'f?k', 'f?ck', 'fc?k' ];
// you           =>    []
// motherf????r  =>    [ 'motherf????r' ];

//
```

#### Filtering text with bad words already censored
```js
const NoBadWords = require("filter-bad-words")

let text = "word 'p###y' is bad"; // Text with bad words

let filter1 = new NoBadWords(text, [ "russian" ], 1, true).filter()
let filter2 = new NoBadWords(text, [ "russian" ], 1, false).filter()

console.log(filter1) // word ***** is bad
console.log(filter2) // word 'p###y' is bad
```

## Quick start
```js
const NoBadWords = require("filter-bad-words");
new NoBadWords(text, languages?, accuracy?, censored?);
```

# Documentation

### Parameters
`languages: string[] (defaults - [ 'russian', 'english' ])` - Languages for detecting bad words
* `russian`
* `english`
* `french`
* `german`
* `ukrainian`

`accuracy: Number (defaults - 1)` - The accuracy of correcting bad words
* `1-2` *(recommended)*


`censored?: Boolean (defaults - false)` - Filter out blurred words?
* `true` - `"f##k"` will become `"****"`
* `false` - `"f##k"` will remain `"f##k"`

### List of Methods
* [find()](#find) - Search for bad words in the text
* [filter()](#filter) - Filtering bad words in text
* [hasBadWords()](#hasbadwords) - Outputs whether there are bad words in the text or not
* [getVulgarity()](#getvulgarity) - Returns an array of numbers indicating the level of vulgarity of each word in the text

### Methods
#### find
This method shows by which words from the database it found the word
##### example:
```js
let result = new NoBadWords("f??k you!", [ "english" ], 1, false).find();
console.log(result) // => [ [ 'f?k', 'f??k', 'fc?k' ], [] ];
```

#### filter
This method replaces bad words in the text with the characters you specify
##### examples:
```js
let text = new NoBadWords("f??k you!", [ "english" ], 1, false)

// Without specifying parameters
let result = text.filter();
console.log(result) // => **** you!

// With the symbols or symbol
let result = text.filter("#") // You can also use an array of characters [ "#", "@", "!", "%" ]
console.log(result) // => #### you! || @#!% you!
```

#### hasBadWords
This method returns a true of false if there are bad words in the text
##### example:
```js
let result = new NoBadWords("f??k you!", [ "english" ], 1, false).hasBadWords();
console.log(result) // => true
```

#### getVulgarity
This method returns an array of numbers from -1 to 2, where `-1` is not a bad word and `2` is a cruel insult
##### example:
```js
let result = new NoBadWords("f??k you!", [ "english" ], 1, false).getVulgarity();
console.log(result) // => [ 2, -1 ]
```

#### If you haven't had enough of these examples, [check it out here!](https://github.com/ContentJeka/no-bad-words/tree/main/examples)