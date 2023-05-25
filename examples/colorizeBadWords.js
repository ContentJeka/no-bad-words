let NoBadWords = require("../index.js");

//         "Fuck you, motherfucker!      ";
let text = "Иди нахуй, пидор!"; // Text with bad words
let vulgarity = new NoBadWords(text, [ "russian" ], 1).getVulgarity(); // Filtered text without bad words

let words = text.split(/\s+/)
let res = [];
for(let i = 0; i < vulgarity.length; i++) {
    if(vulgarity[i] == 2) {
        res.push(`\x1b[41m${words[i]}\x1b[0m`)
    } else if(vulgarity[i] == 1) {
        res.push(`\x1b[43m${words[i]}\x1b[0m`)
    } else if (vulgarity[i] == 0) {
        res.push(`\x1b[44m${words[i]}\x1b[0m`)
    } else {
        res.push(`${words[i]}`)
    }
}

//                            =>       | yellow | |   red  | | yellow  |
console.log(res.join(" ")) // => Пошёл |  нахуй | |выблядок| | ебанный |