const { MongoClient } = require("mongodb");
const fs = require('fs')

require('dotenv').config()

const uri = process.env.DB_URL
const client = new MongoClient(uri, {useUnifiedTopology: true});

module.exports = {
    initializeClient: () => {
        return new Promise((resolve, reject) => {
            client.connect()
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject()
            })
        })
    },

    getWords: () => {
        return new Promise((resolve, reject) => {
            const cursor = client.db('Words').collection('French').find({})
            cursor.toArray()
            .then((words) => {
                resolve(words)
            })
            .catch((e) => {
                console.log(e)
                reject(e)
            })
        })
    },

    countWords: () => {
        return new Promise((resolve, reject) => {
            client.db('Words').collection('French').countDocuments()
            .then((n) => {
                resolve(n)
            })
            .catch(reject)
        })
    },

    insertWordsFromFile: (path) => {
        return new Promise((resolve, reject) => {
            let words = fs.readFileSync(path, 'utf-8')
            words = words.split('\n')

            // insert all words in the db without \r
            client.db('Words').collection('French').insertMany(
                words.map((word) => { return { word: word.replace('\r', '') }})
            )
            .then(resolve)
            .catch((e) => {
                reject(e)
            })
        })
    }
}