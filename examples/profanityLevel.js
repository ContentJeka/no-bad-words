const words = require("../data/data.js");

function getProfanityLevel(word) {
  // for russian bad words;
  // const regex1 = /(рас|сос|анн|ище|ота|док|ный|ист|ина|юк|оеб|сив|\sвы|ава)/gi;
  // const regex2 = /(ху(\W?)|бл(я?)|пи(д?|з?)|еб|трах|ра(з?|с?)|шл|муд)/gi;

  // for english bad words;
  // const regex1 = /((c|k)unt|fuc?k|cock|dick|puss?y)/gi;
  // const regex2 = /(arsehole|ball?s|bitch|boll?oc|bull?shit|fec?k|piss?ed|shit|son\s?o?f?\s?a?\s?bitch)/gi;

  // for french bad words;
  // const regex1 = /(merde|putain|encule|connard|salope|bordel|foutre|péterlescouilles|fermersagueule|fermetaagueule|putaindemerde|rienàenculer|tracesdepneu|rienàfoutre|trousdeballe|cassecouilles|troudeballe|nulàchier|trouducune|trousducul|envoyerchier|trouducul|dégueulasses?|empapaoutage|cassecul|emmerdeuses?|partouzeurs?|sallopperie|conneries?|couillasse|emmerdeurs?|enchier|moule-bite|partouzeur|plancul|saloperies?|emmerdant|emmerdent|emmerdeur|merdeuses?|merdiques?|nulach|partouzer|saloperie|tappinner|anculés?|ankulés?|caguette|chiasses?|coneries?|couilles?|dégueux?|emmerd(er|é)|merdasse|merdeuse|merdiers?|merdique|mollards?|partouse|partouze|queutard|tapinner|tappiner|trouducs?)/gi;
  // const regex2 = /(baises?|baisé(e)?|burnes?|caguer|chibre|chiure|chiée|choune|clille|connes?|glaoui|merd(er|es)?|merdik|pisser|pissé|burne|chier|conne|fions?|juter|pisse|yeule|cons?|culs?|fion|kul)/gi;

  // for german bad words
  // const regex1 = /(verdammt|scheiße|fick|arschloch|hurensohn|leckWmichWaimWaärsche|hurensoöhne|schlappschwänze|gehtsterben|schwanzlutscher|muschileckerin|pferdescheiße|schlappschwanz|drecksbälger|mutterfick+|sackgesichter|schwanzköpfe|wichsvorlagen|angeschissen|dreckstücke|fickteuch|gottverdammt|kackbratzen?|muschilecker|wichsvorlage|dreckskerle|dreckstück|hackfressen|ihraffen|sackgesicht|saftärsche|scheißkerl|schwanzkopf|verfickt|drecksbalg|dreckskerl|drecksäue|geschissen|hackfresse|kackfresse|schlampen?|drecksack|huren|saftarsch|schnepfen|arsch|drecksau|fickdich|sauhunde|saukerle|schnepfe|brunzen|fettsau|sauhund|saukerl|seichen|wichser)/gi;
  // const regex2 = /(poppen|schiss|husos|pisse|pisst|huso|nutte)/gi;

  // for ukrainian bad words
  // const regex1 = /(бля|хуй|піеда|їбати|єбать|єбу|єб|мудак|мудло|дебіл|дурень|гівно|срака|сука|пиеда|підар|педик|гандон|шлюха|блядь|блять|хуйло|хуйня|хуїв|хуї|хуліган|хуліганка|хуліганство|хуліганити|хуліганитися|хуліганствувати|хуліганствуватися)/gi;
  // const regex2 = /(хуліганство|хуліганством|хуліганствував|хуліганствувала|хуліганствували|хуліганствувалися|хуліганствувався|хуліганствувалася|хуліганствувалися|хуліганствуватиме|хуліганствуватимуть|хуліганствуватиметься|хуліганствуватимуться)/gi;

  if (regex1.test(word)) {
    return 2;
  } else if (regex2.test(word)) {
    return 1;
  } else {
    return 0;
  }
}

const profanityLevels = words.ukrainian.map(getProfanityLevel);
console.log(JSON.stringify(profanityLevels)); // => [ 1, 1, 1, 1, 1, 1, 1, 0, ... ];

// 0 - mild insult (Лёгкое оскорбление)
// 1 - moderate insult (Нормальное оскорбление)
// 2 - strong insult (Сильное оскорбление)