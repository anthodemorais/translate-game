const database = require('./database')

database.initializeClient()
.then(() => {
    database.insertWordsFromFile('./verbe.txt')
    .then(() => {
        console.log('done')
    })
    .catch(() => {
        console.log("Server error : can't populate DB")
    })
})
.catch(() => {
    console.log("Server error : can't connect to DB")
})