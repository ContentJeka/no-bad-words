const natural = require('natural');
let languages = [ "russian", "english", "french", "ukrainian", "german" ]

let languagesData = require("./data/data.js");
let vulgarityData = require("./data/dataVulgarity.js")

let data = {
    russian: languagesData.russian.map(e => {return transliterate(e.toLowerCase())}),
    english: languagesData.english.map(e => {return transliterate(e.toLowerCase())}),
    german: languagesData.german.map(e => {return transliterate(e.toLowerCase())}),
    french: languagesData.french.map(e => {return transliterate(e.toLowerCase())}),
    ukrainian: languagesData.ukrainian.map(e => {return transliterate(e.toLowerCase())}),
};

let vulgarity = {
    russian: vulgarityData.russian,
    english: vulgarityData.english,
    german: vulgarityData.german,
    french: vulgarityData.french,
    ukrainian: vulgarityData.ukrainian
};

function transliterate(text) {
    const map = {
      "о": "а",
      'нн': 'н',
      'a': 'а',
      'b': 'б',
      'c': 'с',
      'd': 'д',
      'e': 'е',
      'f': 'ф',
      'g': 'г',
      'h': 'х',
      'i': 'и',
      "*": "а",
      "@": "а",
      "&": "б",
      'j': 'ж',
      'k': 'к',
      'l': 'л',
      'm': 'м',
      'n': 'н',
      'o': 'о',
      'p': 'п',
      'q': 'к',
      'r': 'р',
      's': 'с',
      't': 'т',
      'u': 'у',
      'v': 'в',
      'w': 'в',
      'x': 'х',
      'y': 'ы',
      'z': 'е',
      '1': 'л',
      '2': 'г',
      '3': 'е',
      '4': 'а',
      '5': 'п',
      '6': 'б',
      '7': 'я',
      '8': 'б',
      '9': 'я',
      '0': 'а',
      'ё': "е",
      'й': "и",
      'ß': "в",
      'é': "е",
      'ї': "и",
      "є": "е",
    };
  
    return text.split('').map(char => map[char.toLowerCase()] || char.toLowerCase()).join('');
  }

/**
 * @constructor
 * @param {string} text - Text with bad words
 * @param {Array<('russian'|'english'|'french'|'ukrainian'|'german')>} languages - Languages with detectable bad words (Available: languages)
 * @param {number} accuracy - Accuracy of bad word search (Ideal: 2)
 * @param {boolean} censored - Consider censored words as bad words. If yes, f##k is a bad word. If no, f##k is not a bad word.
 */
class NoBadWords {

    constructor(text, languages = [ "russian" ], accuracy = 2, censored = true) {
        /**
         * @returns {string} Normalized text
         */
        this.text = text;

        /**
         * @returns {Array<('russian'|'english'|'french'|'ukrainian'|'german')>} languages - Languages with detectable bad words (Available: languages)
         */
        this.langs = languages;

        /**
         * @returns {number} Accuracy of bad word search
         */
        this.accuracy = accuracy

        /**
         * @returns {Array<string>} Each word from the text in an array
         */
        this.words = this.text.split(/\s+/);

        /**
         * @returns {boolean} Consider censored words as bad words. If yes, f##k is a bad word. If no, f##k is not a bad word.
         */
        this.censored = censored;
    }
  
    /**
     * @description Search for bad words in the text
     * @returns {Array<Array<string>>} An array of arrays containing bad word corrections
     */
    find() {
        let fullbadwords = data.russian.concat(data.english, data.french, data.german, data.ukrainian)
        let fullntbwords = languagesData.russian.concat(languagesData.english, languagesData.french, languagesData.german, data.ukrainian)

        const badWordsByLetter = {};
        this.langs.forEach(lang => {
            if(!languages.includes(lang.toLowerCase())) {
                throw new Error("There is no such language among the options provided.");
            }
            data[lang].forEach(word => {
                const firstLetter = word.replace(/(.)\1+/g, "$1").toLowerCase()[0];
                if(!badWordsByLetter[firstLetter]) {
                    badWordsByLetter[firstLetter] = [];
                }
                badWordsByLetter[firstLetter].push(word.replace(/(.)\1+/g, "$1").toLowerCase());
            });
        });

        const res = [];
        this.words.forEach(word => {
            const firstLetter = transliterate(word.replace(/(.)\1+/g, "$1"))[0].toLowerCase();
            const badWords = badWordsByLetter[firstLetter] || [];
            const spellcheck = new natural.Spellcheck(badWords);     

            let corrections = spellcheck.getCorrections(transliterate(word).toLowerCase().replace(/[^\p{L}\d]+/gu, "").replace(/(.)\1+/g, "$1"), this.accuracy);
            if(/[^\p{L}\d,!?.]+/gu.test(word.replace(/(.)\1+/g, "$1")) && this.censored) {
                let regex = new RegExp(`${word.replace(/(.)\1+/g, "$1").replace(/[^\p{L}\d]+/gu, "(.*)")}`, "gi");
                if(regex.test(word.replace(/(.)\1+/g, "$1"))) {
                    res.push([`${word} (censored)`])
                } else res.push([]);
                return;
            }
            res.push(corrections.map(e => fullntbwords[fullbadwords.indexOf(e)]));
        });
        return res;
    }

    /**
     * @description Outputs whether there are bad words in the text or not
     * @returns {boolean} Outputs a boolean indicating whether there are bad words in the text.
     */
    hasBadWords() {
        const badwords = this.find();
        return badwords.some(word => word.length > 0);
    }

    /**
     * @returns {string} Normalized text
     */
    normalize() {
        return this.text
    }

    /**
     * @description Filtering bad words in text
     * @param {Array<string>|string} symbols - Filtering symbols
     * @param {'characterwise' | 'wordwise' | 'delword'} type - Filtering type
     * @param {number=} count - Number of characters for wordwise type
     * @returns {string} Outputs filtered text without bad words
     */
    filter(symbols = "*", type = "characterwise", count = 2) {
        if(!Array.isArray(symbols)) {symbols = [ symbols ]};

        let badwords = this.find();
        let res = [];

        if(type == "characterwise") {
            for(let i = 0; i < this.words.length; i++) {
                if(badwords[i].length > 0) {
                    res.push(this.words[i].split("").map(char => /[a-zA-ZА-Яа-я0-9\W]/.test(char) ? symbols[Math.floor(Math.random() * symbols.length)] : char).join(""))
                } else {
                    res.push(this.words[i])
                }
            }
            return res.join(' ')
        } else if (type == "wordwise") {
            for(let i = 0; i < this.words.length; i++) {
                if(badwords[i].length > 0) {
                    res.push(symbols.join(''))
                } else {
                    res.push(this.words[i])
                }
            }
            return res.join(' ')
        } else if (type == "delword") {
            for(let i = 0; i < this.words.length; i++) {
                let word = this.words[i].toLowerCase();
                let len = word.length;
                const mid = Math.floor(len / 2);

                if(badwords[i].length > 0) {
                    res.push()
                } else {
                    res.push(this.words[i])
                }
            }
            return res.join(' ')
        }
    }

    /**
     * @returns {Array<number>} An array of numbers indicating the level of vulgarity of each word in the text
     */
    getVulgarity() {
        let badwords = this.find();

        let fullvulgarity = vulgarity.russian.concat(vulgarity.english, vulgarity.french, vulgarity.german, vulgarity.ukrainian);
        let fullbadwords = data.russian.concat(data.english, data.french, data.german, data.ukrainian)

        return badwords.map(e => {
            if(e.length > 0) {
                let index = fullbadwords.indexOf(e[0]);
                if(index && index !== null) {
                    return fullvulgarity[index]
                } else {
                    return 0;
                }
            } else return -1
        })
    }
}

module.exports = NoBadWords