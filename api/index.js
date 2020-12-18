const express = require('express'),
      database = require('./database/database'),
      cors = require('cors'),
      wordsRoutes = require('./routes/Words');

const app = express(),
      server = require('http').createServer(app);

// Database middleware
app.use((request, response, next) => {
    database.initializeClient()
    .then(() => {
        next()
    })
    .catch(() => {
        response.status(500).send("Server error : can't connect to DB")
    })
})

app.use(cors())

app.use(wordsRoutes)

server.listen(process.env.PORT || 3001)