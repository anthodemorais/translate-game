const { getRandom, translateText } = require('../helpers');

const express = require('express'),
      router = express.Router(),
      database = require('../database/database');

require('dotenv').config()

// save words to not reload words every time
let words = []
let previous = -1

router.get('/word', (req, res) => {
    if (words.length === 0) {
        // if no words saved, load all words and return a random one
        database.getWords()
        .then((data) => {
            words = data
            
            let random = getRandom(data.length, previous)
            previous = random
            const word = words[random].word

            translateText(word)
            .then((text) => {
                res.status(200).send({ word, translated: text })
            })
            .catch((e) => {
                console.log(e)
                res.status(500).send({ error: "Can't get word" })
            })
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send({ error: "Can't get words" })
        })
    }
    else {
        // if words are saved, check if words were added and load them if yes (after sending a response)
        let random = getRandom(words.length, previous)
        previous = random
        const word = words[random].word

        translateText(word)
        .then((text) => {
            res.status(200).send({ word, translated: text })
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send({ error: "Can't get word" })
        })
        
        database.countWords()
        .then((count) => {
            if (words.length !== count) {
                database.getWords()
                .then((data) => {
                    words = data
                })
            }
        })
    }
})

module.exports = router