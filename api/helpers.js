const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

function translateText(text) {
    return new Promise((resolve, reject) => {
        translate.translate(text, "en")
        .then(([translations]) => {
            resolve(translations)
        })
        .catch(e => reject(e))
    })
}

function getRandom(max, differentFrom) {
    let random = differentFrom
    while (random === differentFrom) {
        random = Math.floor(Math.random() * max);
    }
    return random
}

module.exports = { translateText, getRandom }