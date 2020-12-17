const express = require('express'),
      database = require('./database/database');

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

server.listen(3000)