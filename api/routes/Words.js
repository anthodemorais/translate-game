const express = require('express'),
      router = express.Router(),
      database = require('../database/database');

// save words to not reload words every time
let words = []
let previous = -1

router.get('/word', (req, res) => {
    if (words.length === 0) {
        // if no words saved, load all words and return a random one
        database.getWords()
        .then((data) => {
            words = data

            let random = previous
            while (random === previous) {
                random = Math.floor(Math.random() * data.length);
            }
            previous = random

            res.status(200).send({ word: words[random] })
        })
        .catch(() => {
            res.status(500).send({ error: "Can't get words" })
        })
    }
    else {
        // if words are saved, check if words were added and load them if yes (after sending a response)
        let random = previous
        while (random === previous) {
            random = Math.floor(Math.random() * words.length);
        }
        previous = random
        
        res.status(200).send({ word: words[random] })

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